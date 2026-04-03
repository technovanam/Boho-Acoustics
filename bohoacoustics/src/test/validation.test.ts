import { describe, it, expect } from "vitest";

/**
 * Unit tests for Cloud Function validation logic and utilities
 */

// Helper functions that mirror Cloud Function logic
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function parseDataUrl(dataUrl: string | null): { contentType: string; base64: string } | null {
  if (!dataUrl) return null;
  const match = /^data:([^;]+);base64,(.+)$/.exec(dataUrl);
  if (!match) return null;
  return {
    contentType: match[1],
    base64: match[2],
  };
}

function normalizeWhatsappNumber(contact: string): string | null {
  // Remove all non-digit characters
  const cleaned = contact.replace(/\D/g, "");
  
  // Handle various formats
  // If already has country code (12 digits: 91 + 10 digits)
  if (cleaned.length === 12 && cleaned.startsWith("91")) {
    return cleaned;
  }
  // If just 10 digits (Indian number without country code)
  if (cleaned.length === 10) {
    return "91" + cleaned;
  }
  // Invalid format
  return null;
}

function validateConsultationPayload(payload: any): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  const name = String(payload.name || "").trim();
  const email = String(payload.email || "").trim().toLowerCase();
  const city = String(payload.city || "").trim();
  const state = String(payload.state || "").trim();
  const facilityType = String(payload.facilityType || "").trim();
  const consultationId = String(payload.consultationId || "").trim();
  const fileUrl = String(payload.fileUrl || "").trim();

  if (!name) errors.push("Name is required");
  if (!email) errors.push("Email is required");
  if (!city) errors.push("City is required");
  if (!state) errors.push("State is required");
  if (!facilityType) errors.push("Facility type is required");
  if (!consultationId) errors.push("Consultation ID is required");

  if (email && !validateEmail(email)) {
    errors.push("Invalid email format");
  }

  if (fileUrl && !fileUrl.startsWith("https://")) {
    errors.push("Invalid file URL format");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

describe("Cloud Function Validation", () => {
  describe("Email Validation", () => {
    it("should accept valid email formats", () => {
      expect(validateEmail("user@example.com")).toBe(true);
      expect(validateEmail("hello@bohoacoustic.com")).toBe(true);
      expect(validateEmail("test.user+tag@sub.domain.co.uk")).toBe(true);
    });

    it("should reject invalid email formats", () => {
      expect(validateEmail("invalid-email")).toBe(false);
      expect(validateEmail("user@")).toBe(false);
      expect(validateEmail("@domain.com")).toBe(false);
      expect(validateEmail("user @domain.com")).toBe(false);
      expect(validateEmail("")).toBe(false);
    });

    it("should handle whitespace", () => {
      expect(validateEmail("  user@example.com  ")).toBe(false); // regex doesn't trim
    });
  });

  describe("Data URL Parsing", () => {
    it("should parse valid base64 data URLs", () => {
      const dataUrl = "data:application/pdf;base64,JVBERi0xLjQK";
      const result = parseDataUrl(dataUrl);
      expect(result).not.toBeNull();
      expect(result?.contentType).toBe("application/pdf");
      expect(result?.base64).toBe("JVBERi0xLjQK");
    });

    it("should handle image data URLs", () => {
      const dataUrl = "data:image/png;base64,iVBORw0KGgo=";
      const result = parseDataUrl(dataUrl);
      expect(result?.contentType).toBe("image/png");
      expect(result?.base64).toBe("iVBORw0KGgo=");
    });

    it("should return null for invalid data URLs", () => {
      expect(parseDataUrl(null)).toBeNull();
      expect(parseDataUrl("")).toBeNull();
      expect(parseDataUrl("not-a-data-url")).toBeNull();
      expect(parseDataUrl("data:pdf;JVBERi0xLjQK")).toBeNull(); // missing base64 prefix
    });

    it("should handle empty strings and undefined", () => {
      expect(parseDataUrl("")).toBeNull();
    });
  });

  describe("WhatsApp Number Normalization", () => {
    it("should normalize 10-digit Indian numbers", () => {
      expect(normalizeWhatsappNumber("9876543210")).toBe("919876543210");
      expect(normalizeWhatsappNumber("8433900692")).toBe("918433900692");
    });

    it("should accept pre-formatted numbers with country code", () => {
      expect(normalizeWhatsappNumber("919876543210")).toBe("919876543210");
      // Note: our implementation only preserves digits, so +91 becomes 91
      // This test verifies the + is stripped
      const result = normalizeWhatsappNumber("+919876543210");
      expect(result).not.toBeNull();
      expect(result).toMatch(/^91\d{10}$/);
    });

    it("should handle formatted numbers with dashes/spaces", () => {
      expect(normalizeWhatsappNumber("98-7654-3210")).toBe("919876543210");
      expect(normalizeWhatsappNumber("9876 5432 10")).toBe("919876543210");
      // With country code and spaces
      const result = normalizeWhatsappNumber("+91 9876543210");
      expect(result).not.toBeNull();
      expect(result).toMatch(/^91\d{10}$/);
    });

    it("should return null for invalid lengths", () => {
      expect(normalizeWhatsappNumber("123")).toBeNull();
      expect(normalizeWhatsappNumber("12345678901234")).toBeNull();
      expect(normalizeWhatsappNumber("")).toBeNull();
    });
  });

  describe("Full Payload Validation", () => {
    it("should accept valid consultation payload", () => {
      const payload = {
        consultationId: "abcdefghijklmnopqrst",
        name: "John Doe",
        email: "john@example.com",
        contact: "9876543210",
        city: "Mumbai",
        state: "Maharashtra",
        facilityType: "Home Theatre",
        area: "100 sqft",
        notes: "Please help with acoustics",
      };

      const result = validateConsultationPayload(payload);
      expect(result.valid).toBe(true);
      expect(result.errors).toEqual([]);
    });

    it("should reject payload missing required fields", () => {
      const payload = {
        consultationId: "abcdefghijklmnopqrst",
        name: "John Doe",
        email: "john@example.com",
        // missing city, state, facilityType
      };

      const result = validateConsultationPayload(payload);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain("City is required");
      expect(result.errors).toContain("State is required");
      expect(result.errors).toContain("Facility type is required");
    });

    it("should reject payload with invalid email", () => {
      const payload = {
        consultationId: "abcdefghijklmnopqrst",
        name: "John Doe",
        email: "invalid-email",
        contact: "9876543210",
        city: "Mumbai",
        state: "Maharashtra",
        facilityType: "Home Theatre",
      };

      const result = validateConsultationPayload(payload);
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes("Invalid email"))).toBe(true);
    });

    it("should reject payload with invalid file URL", () => {
      const payload = {
        consultationId: "abcdefghijklmnopqrst",
        name: "John Doe",
        email: "john@example.com",
        contact: "9876543210",
        city: "Mumbai",
        state: "Maharashtra",
        facilityType: "Home Theatre",
        fileUrl: "not-a-valid-url",
      };

      const result = validateConsultationPayload(payload);
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes("Invalid file URL"))).toBe(true);
    });

    it("should handle empty/whitespace strings", () => {
      const payload = {
        consultationId: "",
        name: "   ",
        email: "",
        contact: "9876543210",
        city: "    ",
        state: "Maharashtra",
        facilityType: "",
      };

      const result = validateConsultationPayload(payload);
      expect(result.valid).toBe(false);
      expect(result.errors.some((e) => e.includes("Name"))).toBe(true);
      expect(result.errors.some((e) => e.includes("Email"))).toBe(true);
      expect(result.errors.some((e) => e.includes("City"))).toBe(true);
      expect(result.errors.some((e) => e.includes("Facility"))).toBe(true);
      expect(result.errors.some((e) => e.includes("Consultation"))).toBe(true);
    });

    it("should be case-insensitive for email", () => {
      const payload = {
        consultationId: "abcdefghijklmnopqrst",
        name: "John Doe",
        email: "JOHN@EXAMPLE.COM",
        contact: "9876543210",
        city: "Mumbai",
        state: "Maharashtra",
        facilityType: "Home Theatre",
      };

      const result = validateConsultationPayload(payload);
      expect(result.valid).toBe(true);
    });
  });
});
