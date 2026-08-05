import { describe, it, expect } from "vitest";
import { getSeverityTone, generateSessionRef } from "../severity";

describe("getSeverityTone", () => {
  it("detects critical", () => {
    expect(getSeverityTone("Risk Level: Critical")).toBe("critical");
  });
  it("detects high", () => {
    expect(getSeverityTone("Severity: High")).toBe("high");
  });
  it("detects medium", () => {
    expect(getSeverityTone("Priority: Medium")).toBe("medium");
  });
  it("detects low", () => {
    expect(getSeverityTone("Priority: Low")).toBe("low");
  });
  it("is case-insensitive", () => {
    expect(getSeverityTone("severity: HIGH")).toBe("high");
  });
  it("returns null for text with no severity word", () => {
    expect(getSeverityTone("Category: Fire")).toBe(null);
  });
  it("returns null for empty/undefined input", () => {
    expect(getSeverityTone("")).toBe(null);
    expect(getSeverityTone(undefined)).toBe(null);
  });
  it("prioritizes the most severe word when multiple appear", () => {
    expect(getSeverityTone("Priority: Critical. Note: low humidity today.")).toBe("critical");
  });
});

describe("generateSessionRef", () => {
  it("produces a SES-#### formatted string", () => {
    expect(generateSessionRef()).toMatch(/^SES-\d{4}$/);
  });
  it("produces different refs across calls (not hardcoded)", () => {
    const refs = new Set(Array.from({ length: 20 }, () => generateSessionRef()));
    expect(refs.size).toBeGreaterThan(1);
  });
});
