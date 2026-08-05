const STAGES = [
  { key: "classify", label: "Classify" },
  { key: "risk", label: "Assess Risk" },
  { key: "decide", label: "Decide" },
  { key: "tools", label: "Gather Resources" },
  { key: "summary", label: "Summarize" },
];

/**
 * Displays the AI agent workflow.
 */

function PipelineStrip({ active }) {
  return (
    <ol className={`pipeline ${active ? "pipeline--active" : ""}`}>
      {STAGES.map((stage, index) => (
        <li className="pipeline-stage" key={stage.key}>
          <span className="pipeline-dot" aria-hidden="true" />
          <span className="pipeline-label">{stage.label}</span>

          {index < STAGES.length - 1 && (
            <span
              className="pipeline-connector"
              aria-hidden="true"
            />
          )}
        </li>
      ))}
    </ol>
  );
}

export default PipelineStrip;