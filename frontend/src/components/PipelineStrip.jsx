const STAGES = [
  { key: "classify", label: "Classify" },
  { key: "risk", label: "Assess Risk" },
  { key: "decide", label: "Decide" },
  { key: "tools", label: "Gather Resources" },
  { key: "summary", label: "Summarize" },
];

/**
 * PipelineStrip — visualizes the actual agent workflow from coordinator.py
 * (Classification -> Risk -> Decision -> Tools -> Response).
 *
 * Honesty note: Flask's /analyze endpoint is a single blocking call — it
 * doesn't stream progress per stage, so we don't fake a live "stage 2 of 5
 * in progress" indicator (that would misrepresent what's actually
 * happening on the backend). Instead this renders as "all complete" the
 * moment a result arrives, which is an accurate representation, and
 * during loading every stage pulses together to mean "working," not
 * "stage 3 is currently running."
 */
function PipelineStrip({ active }) {
  return (
    <ol className={`pipeline ${active ? "pipeline--active" : ""}`}>
      {STAGES.map((stage, i) => (
        <li className="pipeline-stage" key={stage.key}>
          <span className="pipeline-dot" aria-hidden="true" />
          <span className="pipeline-label">{stage.label}</span>
          {i < STAGES.length - 1 && <span className="pipeline-connector" aria-hidden="true" />}
        </li>
      ))}
    </ol>
  );
}

export default PipelineStrip;
