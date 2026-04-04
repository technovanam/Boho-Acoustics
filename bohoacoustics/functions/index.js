const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { defineSecret, defineString } = require("firebase-functions/params");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const { createHash } = require("node:crypto");
const nodemailer = require("nodemailer");

initializeApp();

const RESEND_SMTP_USER = defineSecret("RESEND_SMTP_USER");
const RESEND_SMTP_PASS = defineSecret("RESEND_SMTP_PASS");
const MAIL_TO = defineString("MAIL_TO", { default: "hello@bohoacoustic.com" });
const MAIL_FROM = defineString("MAIL_FROM", { default: "Boho Acoustics <noreply@bohoacoustic.com>" });
const BRAND_LOGO_URL = "https://boho-acoustics.web.app/logo.png";
const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254;
const MAX_CONTACT_LENGTH = 30;
const MAX_FACILITY_TYPE_LENGTH = 80;
const MAX_NOTES_LENGTH = 2000;
const MAX_FILE_NAME_LENGTH = 180;
const MAX_FILE_BASE64_LENGTH = 14 * 1024 * 1024;
const ALLOWED_MIME_TYPES = ["application/pdf"];
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

function getFileExtension(contentType) {
  const map = {
    "application/pdf": "pdf",
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/webp": "webp",
    "application/msword": "doc",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "docx"
  };
  return map[contentType] || "bin";
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function sanitizeHeaderValue(value) {
  return String(value || "").replace(/[\r\n]+/g, " ").trim();
}

function parseDataUrl(dataUrl) {
  if (!dataUrl) return null;
  const match = /^data:([^;]+);base64,(.+)$/.exec(dataUrl);
  if (!match) return null;
  return {
    contentType: match[1],
    base64: match[2],
  };
}

function assertMaxLength(value, max, fieldName) {
  if (value.length > max) {
    throw new HttpsError("invalid-argument", `${fieldName} is too long.`);
  }
}

function buildAttachmentFromDataUrl(dataUrl, fileName) {
  const parsed = parseDataUrl(dataUrl);
  if (!parsed) {
    throw new HttpsError("invalid-argument", "Invalid file format.");
  }

  if (!ALLOWED_MIME_TYPES.includes(parsed.contentType)) {
    throw new HttpsError("invalid-argument", "Only PDF files are accepted.");
  }

  const buffer = Buffer.from(parsed.base64, "base64");

  return [{
    filename: sanitizeHeaderValue(fileName) || `attachment.${getFileExtension(parsed.contentType)}`,
    content: buffer,
    contentType: parsed.contentType,
  }];
}

function getClientIp(request) {
  const rawForwarded = request.rawRequest?.headers?.["x-forwarded-for"];
  if (typeof rawForwarded === "string" && rawForwarded.trim()) {
    return rawForwarded.split(",")[0].trim();
  }
  return request.rawRequest?.ip || "unknown";
}

function hashIp(ip) {
  return createHash("sha256").update(ip).digest("hex");
}

async function enforceRateLimit(db, ipHash) {
  const now = Date.now();
  const docRef = db.collection("consultationRateLimits").doc(ipHash);

  await db.runTransaction(async (txn) => {
    const snapshot = await txn.get(docRef);

    if (!snapshot.exists) {
      txn.set(docRef, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS, updatedAt: FieldValue.serverTimestamp() });
      return;
    }

    const data = snapshot.data() || {};
    const count = Number(data.count || 0);
    const resetAt = Number(data.resetAt || 0);

    if (now > resetAt) {
      txn.set(docRef, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS, updatedAt: FieldValue.serverTimestamp() }, { merge: true });
      return;
    }

    if (count >= RATE_LIMIT_MAX_REQUESTS) {
      throw new HttpsError("resource-exhausted", "Too many consultation attempts. Please try again later.");
    }

    txn.update(docRef, { count: count + 1, updatedAt: FieldValue.serverTimestamp() });
  });
}

exports.submitConsultation = onCall(
  {
    region: "us-central1",
    cors: true,
    secrets: [RESEND_SMTP_USER, RESEND_SMTP_PASS]
  },
  async (request) => {
    const payload = request.data || {};

    const name = String(payload.name || "").trim();
    const email = String(payload.email || "").trim().toLowerCase();
    const contact = String(payload.contact || "").trim();
    const facilityType = String(payload.facilityType || "").trim();
    const notes = String(payload.notes || "").trim();
    const fileName = String(payload.fileName || "").trim();
    const fileBase64 = String(payload.fileBase64 || "").trim();
    const consultationId = String(payload.consultationId || "").trim();

    assertMaxLength(name, MAX_NAME_LENGTH, "Name");
    assertMaxLength(email, MAX_EMAIL_LENGTH, "Email");
    assertMaxLength(contact, MAX_CONTACT_LENGTH, "Contact number");
    assertMaxLength(facilityType, MAX_FACILITY_TYPE_LENGTH, "Facility type");
    assertMaxLength(notes, MAX_NOTES_LENGTH, "Notes");
    assertMaxLength(fileName, MAX_FILE_NAME_LENGTH, "File name");
    assertMaxLength(fileBase64, MAX_FILE_BASE64_LENGTH, "File data");

    if (!/^[A-Za-z0-9]{20}$/.test(consultationId)) {
      throw new HttpsError("invalid-argument", "Invalid consultation ID.");
    }

    if (!name || !contact) {
      throw new HttpsError("invalid-argument", "Name and contact are required.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      throw new HttpsError("invalid-argument", "Please provide a valid email.");
    }

    const attachment = fileBase64 ? buildAttachmentFromDataUrl(fileBase64, fileName) : [];

    const db = getFirestore();
    await enforceRateLimit(db, hashIp(getClientIp(request)));

    const docRef = db.collection("consultations").doc(consultationId);
    await docRef.set({
      name,
      email,
      contact,
      facilityType,
      notes,
      fileName,
      timestamp: FieldValue.serverTimestamp(),
      createdAt: FieldValue.serverTimestamp(),
      status: "new"
    });

    const transporter = nodemailer.createTransport({
      host: "smtp.resend.com",
      port: 465,
      secure: true,
      auth: {
        user: RESEND_SMTP_USER.value(),
        pass: RESEND_SMTP_PASS.value()
      }
    });

    const escapedName = escapeHtml(name);
    const escapedEmail = escapeHtml(email || "Not provided");
    const escapedContact = escapeHtml(contact);
    const escapedFacilityType = escapeHtml(facilityType || "Not provided");
    const escapedNotes = escapeHtml(notes);

    const internalHtml = `
      <div style="margin:0;padding:0;background:#f3eee5;font-family:Arial,Helvetica,sans-serif;color:#1a1a1a;">
        <div style="max-width:680px;margin:0 auto;padding:30px 16px;">
          <div style="background:#ffffff;border:1px solid #e8ddcb;border-radius:18px;overflow:hidden;box-shadow:0 18px 45px rgba(12,10,8,0.08);">
            <div style="padding:26px 26px 22px;background:linear-gradient(135deg,#0f0f0f 0%,#1c1611 100%);">
              <img src="${BRAND_LOGO_URL}" alt="Boho Acoustics" style="display:block;width:124px;max-width:100%;height:auto;margin:0 0 14px;" />
              <p style="margin:0 0 8px;font-size:10px;letter-spacing:0.26em;text-transform:uppercase;color:#d9b06a;font-weight:700;">Boho Acoustics</p>
              <h2 style="margin:0;font-size:26px;line-height:1.2;color:#ffffff;">New Consultation Lead</h2>
              <p style="margin:10px 0 0;font-size:14px;line-height:1.65;color:#ddd5c8;">A new consultation enquiry has been submitted through the website.</p>
            </div>

            <div style="padding:24px 24px 10px;background:#ffffff;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
                <tr>
                  <td style="padding:12px 14px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#7a5d38;font-weight:700;background:#faf6ef;border:1px solid #eadecb;width:34%;">Name</td>
                  <td style="padding:12px 14px;font-size:14px;color:#1a1a1a;background:#ffffff;border:1px solid #eadecb;">${escapedName}</td>
                </tr>
                <tr>
                  <td style="padding:12px 14px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#7a5d38;font-weight:700;background:#faf6ef;border:1px solid #eadecb;">Email</td>
                  <td style="padding:12px 14px;font-size:14px;color:#1a1a1a;background:#ffffff;border:1px solid #eadecb;">${escapedEmail}</td>
                </tr>
                <tr>
                  <td style="padding:12px 14px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#7a5d38;font-weight:700;background:#faf6ef;border:1px solid #eadecb;">Phone Number</td>
                  <td style="padding:12px 14px;font-size:14px;color:#1a1a1a;background:#ffffff;border:1px solid #eadecb;">${escapedContact}</td>
                </tr>
                <tr>
                  <td style="padding:12px 14px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#7a5d38;font-weight:700;background:#faf6ef;border:1px solid #eadecb;">Facility Type</td>
                  <td style="padding:12px 14px;font-size:14px;color:#1a1a1a;background:#ffffff;border:1px solid #eadecb;">${escapedFacilityType}</td>
                </tr>
              </table>

              ${notes ? `
              <div style="margin-top:16px;padding:16px;border:1px solid #eadecb;border-radius:12px;background:#fbf8f3;">
                <p style="margin:0 0 8px;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#7a5d38;font-weight:700;">Diagnostic Notes</p>
                <p style="margin:0;font-size:14px;line-height:1.7;color:#2b2b2b;white-space:pre-wrap;">${escapedNotes}</p>
              </div>
              ` : ""}

              <p style="margin:16px 0 0;font-size:12px;line-height:1.6;color:#7b7b7b;">If a floor plan or CAD file was attached, it is included as an attachment in this email.</p>
            </div>

            <div style="padding:14px 24px 20px;border-top:1px solid #eee4d5;background:#ffffff;">
              <p style="margin:0;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#9a8a74;">Lead Source: Website Consultation Form</p>
            </div>
          </div>
        </div>
      </div>
    `;

    const confirmationHtml = `
      <div style="margin:0;padding:0;background:#f3eee5;font-family:Arial,Helvetica,sans-serif;color:#1a1a1a;">
        <div style="max-width:680px;margin:0 auto;padding:30px 16px;">
          <div style="background:#ffffff;border:1px solid #e8ddcb;border-radius:18px;overflow:hidden;box-shadow:0 18px 45px rgba(12,10,8,0.08);">
            <div style="padding:28px 26px 22px;background:linear-gradient(135deg,#0f0f0f 0%,#1c1611 100%);">
              <img src="${BRAND_LOGO_URL}" alt="Boho Acoustics" style="display:block;width:124px;max-width:100%;height:auto;margin:0 0 14px;" />
              <p style="margin:0 0 8px;font-size:10px;letter-spacing:0.26em;text-transform:uppercase;color:#d9b06a;font-weight:700;">Boho Acoustics</p>
              <h1 style="margin:0;font-size:28px;line-height:1.2;color:#ffffff;">Your Request Has Been Received</h1>
              <p style="margin:10px 0 0;font-size:14px;line-height:1.7;color:#ddd5c8;">Hi ${escapedName}, thank you for reaching out. Our team has received your consultation request.</p>
            </div>

            <div style="padding:24px;background:#ffffff;">
              <div style="padding:16px;border:1px solid #eadecb;border-radius:12px;background:#fbf8f3;">
                <p style="margin:0;font-size:14px;line-height:1.75;color:#2a2a2a;">We are reviewing your details and will contact you with the next step shortly. If you shared a floor plan or CAD file, it has been included for technical review.</p>
              </div>

              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin-top:16px;">
                <tr>
                  <td style="padding:12px 14px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#7a5d38;font-weight:700;background:#faf6ef;border:1px solid #eadecb;width:34%;">Submitted Name</td>
                  <td style="padding:12px 14px;font-size:14px;color:#1a1a1a;background:#ffffff;border:1px solid #eadecb;">${escapedName}</td>
                </tr>
                <tr>
                  <td style="padding:12px 14px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:#7a5d38;font-weight:700;background:#faf6ef;border:1px solid #eadecb;">Facility Type</td>
                  <td style="padding:12px 14px;font-size:14px;color:#1a1a1a;background:#ffffff;border:1px solid #eadecb;">${escapedFacilityType}</td>
                </tr>
              </table>

              <div style="margin-top:16px;padding:14px 16px;border:1px solid #eadecb;border-radius:12px;background:#ffffff;">
                <p style="margin:0;font-size:13px;line-height:1.7;color:#333333;">Need to add or update details? Simply reply to this email and our team will include it in your request.</p>
              </div>

              <p style="margin:18px 0 0;font-size:14px;line-height:1.8;color:#2a2a2a;">Regards,<br />Boho Acoustics Team</p>
            </div>
          </div>
        </div>
      </div>
    `;

    const internalMailOptions = {
      from: MAIL_FROM.value(),
      to: MAIL_TO.value(),
      subject: `New consultation request from ${sanitizeHeaderValue(name)}`,
      html: internalHtml,
      attachments: attachment
    };

    if (email) {
      internalMailOptions.replyTo = email;
    }

    await transporter.sendMail(internalMailOptions);

    if (email) {
      try {
        await transporter.sendMail({
          from: MAIL_FROM.value(),
          to: email,
          subject: "Boho Acoustics has received your consultation request",
          html: confirmationHtml,
        });
      } catch (confirmationError) {
        console.error("Customer confirmation email failed:", confirmationError);
      }
    }

    return {
      success: true,
      id: docRef.id
    };
  }
);
