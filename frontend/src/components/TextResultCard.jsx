import { SEVERITY_LABEL } from "../utils/severity";

/**
 * TextResultCard — reusable card for agent outputs that come back as plain
 * multi-line text (classification, risk, decision — see coordinator.py,
 * these are response.content strings straight from the LLM, not JSON).
 *
 * We deliberately do NOT try to parse/reformat this text into fields —
 * reformatting risks silently breaking if the LLM's wording varies. The
 * `tone` prop (computed in Dashboard.jsx via getSeverityTone) only adds a
 * color accent and badge; the text itself is shown exactly as the backend
 * sent it, with line breaks preserved.
 */
function TextResultCard({ title, icon, content, tone }) {
  return (
    <div className={`card ${tone ? `card--${tone}` : ""}`}>
      <div className="card-heading">
        <h3>
          <span aria-hidden="true">{icon}</span> {title}
        </h3>
        {tone && <span className={`severity-badge severity-badge--${tone}`}>{SEVERITY_LABEL[tone]}</span>}
      </div>
      <pre className="card-text">{content}</pre>
    </div>
  );
}

export default TextResultCard;
