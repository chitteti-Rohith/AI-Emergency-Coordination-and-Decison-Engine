import PipelineStrip from "./PipelineStrip";

/**
 * LoadingSpinner — reuses the pipeline motif instead of a generic spinner,
 * so the loading state and the completed state share the same visual
 * language (see PipelineStrip.jsx for why this doesn't fake per-stage
 * progress).
 */
function LoadingSpinner() {
  return (
    <div className="loading" role="status" aria-live="polite">
      <PipelineStrip active />
      <p className="loading-text">Coordinating agents and tools...</p>
    </div>
  );
}

export default LoadingSpinner;
