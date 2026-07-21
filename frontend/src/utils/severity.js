/**
 * getSeverityTone — looks for the severity/priority/risk word your prompts
 * already ask the LLM to include (see prompts/classify_prompt.py,
 * risk_prompt.py, decision_prompt.py — all three explicitly request
 * Low/Medium/High/Critical). We only ever look for these four exact
 * words — we're not attempting to parse or restructure the LLM's text,
 * just picking a color to accent the card with.
 *
 * Checked in this order (most severe first) because a block of text might
 * mention multiple levels in passing — we want the worst one to win.
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
 * generateSessionRef — a short, human-readable reference for this
 * analysis, shown on the "ticket" header. This is generated entirely in
 * the browser for display purposes only — the backend doesn't track or
 * store ticket numbers (only the optional in-memory /history list), so
 * this is a session-local label, not an official record ID.
 */
export function generateSessionRef() {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `SES-${n}`;
}
