/**
 * Returns the severity level based on the AI response.
 */
export function getSeverityTone(text) {
  if (!text) return null;

  const lower = text.toLowerCase();

  if (lower.includes("critical")) return "critical";
  if (lower.includes("high")) return "high";
  if (lower.includes("medium")) return "medium";
  if (lower.includes("low")) return "low";

  return null;
}

export const SEVERITY_LABEL = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
};

/**
 * Generates a unique session reference.
 */
export function generateSessionRef() {
  const number = Math.floor(1000 + Math.random() * 9000);
  return `SES-${number}`;
}