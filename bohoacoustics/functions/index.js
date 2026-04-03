const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { defineSecret, defineString } = require("firebase-functions/params");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore, FieldValue } = require("firebase-admin/firestore");
const nodemailer = require("nodemailer");

initializeApp();

const RESEND_SMTP_USER = defineSecret("RESEND_SMTP_USER");
const RESEND_SMTP_PASS = defineSecret("RESEND_SMTP_PASS");
const MAIL_TO = defineString("MAIL_TO", { default: "hello@bohoacoustic.com" });
const MAIL_FROM = defineString("MAIL_FROM", { default: "Boho Acoustics <noreply@bohoacoustic.com>" });
const BRAND_LOGO_URL = "https://boho-acoustics.web.app/logo.png";

function parseDataUrl(dataUrl) {
  const match = /^data:([^;]+);base64,(.+)$/.exec(dataUrl || "");
  if (!match) return null;
  const contentType = match[1];
  const base64 = match[2];
  return { contentType, base64 };
}

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
    const city = String(payload.city || "").trim();
    const state = String(payload.state || "").trim();
    const facilityType = String(payload.facilityType || "").trim();
    const area = String(payload.area || "").trim();
    const notes = String(payload.notes || "").trim();
    const fileName = String(payload.fileName || "").trim();
    const fileBase64 = String(payload.fileBase64 || "").trim();

    if (!name || !email || !city || !state || !facilityType) {
      throw new HttpsError("invalid-argument", "Missing required fields.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new HttpsError("invalid-argument", "Please provide a valid email.");
    }

    const attachmentMeta = fileBase64 ? parseDataUrl(fileBase64) : null;
    if (fileBase64 && !attachmentMeta) {
      throw new HttpsError("invalid-argument", "Invalid attachment format.");
    }

    const db = getFirestore();
    const docRef = await db.collection("consultations").add({
      name,
      email,
      contact,
      city,
      state,
      facilityType,
      area,
      notes,
      fileName,
      fileBase64,
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

    const attachment = attachmentMeta
      ? [{
          filename: fileName || `attachment.${getFileExtension(attachmentMeta.contentType)}`,
          content: attachmentMeta.base64,
          encoding: "base64",
          contentType: attachmentMeta.contentType
        }]
      : [];

    const internalHtml = `
      <div style="margin:0;padding:0;background:#efe7db;font-family:Arial,Helvetica,sans-serif;color:#111111;">
        <div style="max-width:680px;margin:0 auto;padding:32px 18px;">
          <div style="border-radius:22px;overflow:hidden;background:#0b0b0b;box-shadow:0 24px 60px rgba(0,0,0,0.18);border:1px solid rgba(200,164,106,0.18);">
            <div style="padding:30px 30px 24px;background:linear-gradient(135deg,#111111 0%,#1a140f 100%);border-bottom:1px solid rgba(255,255,255,0.08);">
              <img src="${BRAND_LOGO_URL}" alt="Boho Acoustics" style="display:block;width:132px;max-width:100%;height:auto;margin:0 0 18px;" />
              <p style="margin:0 0 10px;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#d8b06d;font-weight:700;">Boho Acoustics</p>
              <h2 style="margin:0;font-size:30px;line-height:1.12;color:#ffffff;">New consultation request</h2>
              <p style="margin:12px 0 0;font-size:14px;line-height:1.7;color:#d5d0c8;max-width:520px;">A project inquiry has been submitted from the website and is ready for review.</p>
            </div>
            <div style="padding:28px;background:#ffffff;">
              <div style="display:flex;flex-wrap:wrap;gap:12px;margin-bottom:22px;">
                <div style="padding:10px 14px;border-radius:999px;background:#f7f2ea;border:1px solid #eadfcd;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#7a5e34;">Consultation intake</div>
                <div style="padding:10px 14px;border-radius:999px;background:#f7f2ea;border:1px solid #eadfcd;font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#7a5e34;">New lead</div>
              </div>
              <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:separate;border-spacing:0 10px;font-size:14px;line-height:1.7;color:#111111;">
                <tr><td style="padding:14px 16px;background:#faf7f1;border:1px solid #ede2d0;border-right:0;border-radius:14px 0 0 14px;font-weight:700;width:170px;color:#6f5636;">Name</td><td style="padding:14px 16px;background:#ffffff;border:1px solid #ede2d0;border-radius:0 14px 14px 0;">${name}</td></tr>
                <tr><td style="padding:14px 16px;background:#faf7f1;border:1px solid #ede2d0;border-right:0;border-radius:14px 0 0 14px;font-weight:700;color:#6f5636;">Email</td><td style="padding:14px 16px;background:#ffffff;border:1px solid #ede2d0;border-radius:0 14px 14px 0;">${email}</td></tr>
                <tr><td style="padding:14px 16px;background:#faf7f1;border:1px solid #ede2d0;border-right:0;border-radius:14px 0 0 14px;font-weight:700;color:#6f5636;">Contact</td><td style="padding:14px 16px;background:#ffffff;border:1px solid #ede2d0;border-radius:0 14px 14px 0;">${contact || "N/A"}</td></tr>
                <tr><td style="padding:14px 16px;background:#faf7f1;border:1px solid #ede2d0;border-right:0;border-radius:14px 0 0 14px;font-weight:700;color:#6f5636;">City</td><td style="padding:14px 16px;background:#ffffff;border:1px solid #ede2d0;border-radius:0 14px 14px 0;">${city}</td></tr>
                <tr><td style="padding:14px 16px;background:#faf7f1;border:1px solid #ede2d0;border-right:0;border-radius:14px 0 0 14px;font-weight:700;color:#6f5636;">State</td><td style="padding:14px 16px;background:#ffffff;border:1px solid #ede2d0;border-radius:0 14px 14px 0;">${state}</td></tr>
                <tr><td style="padding:14px 16px;background:#faf7f1;border:1px solid #ede2d0;border-right:0;border-radius:14px 0 0 14px;font-weight:700;color:#6f5636;">Facility type</td><td style="padding:14px 16px;background:#ffffff;border:1px solid #ede2d0;border-radius:0 14px 14px 0;">${facilityType}</td></tr>
                <tr><td style="padding:14px 16px;background:#faf7f1;border:1px solid #ede2d0;border-right:0;border-radius:14px 0 0 14px;font-weight:700;color:#6f5636;">Area</td><td style="padding:14px 16px;background:#ffffff;border:1px solid #ede2d0;border-radius:0 14px 14px 0;">${area || "N/A"}</td></tr>
              </table>
              ${notes ? `
              <div style="margin-top:20px;padding:20px;border-radius:16px;background:#f7f2ea;border:1px solid #eadfcd;">
                <p style="margin:0 0 10px;font-size:11px;letter-spacing:0.22em;text-transform:uppercase;color:#8a6a3a;font-weight:700;">Project notes</p>
                <p style="margin:0;font-size:14px;line-height:1.8;color:#222222;white-space:pre-wrap;">${notes}</p>
              </div>
              ` : ""}
            </div>
          </div>
        </div>
      </div>
    `;

    const confirmationHtml = `
      <div style="margin:0;padding:0;background:#efe7db;font-family:Arial,Helvetica,sans-serif;color:#111111;">
        <div style="max-width:680px;margin:0 auto;padding:32px 18px;">
          <div style="border-radius:22px;overflow:hidden;background:#0b0b0b;box-shadow:0 24px 60px rgba(0,0,0,0.18);border:1px solid rgba(200,164,106,0.18);">
            <div style="padding:34px 30px;background:linear-gradient(135deg,#111111 0%,#1a140f 100%);border-bottom:1px solid rgba(255,255,255,0.08);">
              <img src="${BRAND_LOGO_URL}" alt="Boho Acoustics" style="display:block;width:132px;max-width:100%;height:auto;margin:0 0 18px;" />
              <p style="margin:0 0 10px;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#d8b06d;font-weight:700;">Boho Acoustics</p>
              <h1 style="margin:0;font-size:32px;line-height:1.12;color:#ffffff;">We’ve received your request</h1>
              <p style="margin:12px 0 0;font-size:14px;line-height:1.8;color:#d5d0c8;max-width:540px;">Hi ${name}, your consultation request is in our system and our team will review it shortly.</p>
            </div>
            <div style="padding:28px;background:#ffffff;">
              <div style="padding:20px;border-radius:16px;background:#f7f2ea;border:1px solid #eadfcd;margin-bottom:20px;">
                <p style="margin:0;font-size:14px;line-height:1.8;color:#3a3027;">We appreciate you reaching out. If you attached a floor plan, it has been included in our review copy and will be checked by the team.</p>
              </div>
              <div style="display:flex;flex-direction:column;gap:12px;">
                <div style="padding:14px 16px;border-radius:14px;background:#ffffff;border:1px solid #ede2d0;">
                  <p style="margin:0;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#7a5e34;font-weight:700;">What happens next</p>
                  <p style="margin:8px 0 0;font-size:14px;line-height:1.8;color:#222222;">Our team will review your details and contact you with the next step.</p>
                </div>
                <div style="padding:14px 16px;border-radius:14px;background:#ffffff;border:1px solid #ede2d0;">
                  <p style="margin:0;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#7a5e34;font-weight:700;">Need to add something?</p>
                  <p style="margin:8px 0 0;font-size:14px;line-height:1.8;color:#222222;">Just reply to this email and we’ll take it from there.</p>
                </div>
              </div>
              <p style="margin:22px 0 0;font-size:14px;line-height:1.8;color:#222222;">Regards,<br />Boho Acoustics Team</p>
            </div>
          </div>
        </div>
      </div>
    `;

    await Promise.all([
      transporter.sendMail({
        from: MAIL_FROM.value(),
        to: MAIL_TO.value(),
        subject: `New consultation request from ${name}`,
        html: internalHtml,
        attachments: attachment
      }),
      transporter.sendMail({
        from: MAIL_FROM.value(),
        to: email,
        subject: "Boho Acoustics has received your consultation request",
        html: confirmationHtml,
        attachments: attachment
      })
    ]);

    return {
      success: true,
      id: docRef.id
    };
  }
);
