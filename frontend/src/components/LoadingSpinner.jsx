import PipelineStrip from "./PipelineStrip";

/**
 * Displays the loading state while the AI agents process the incident.
 */

function LoadingSpinner() {
  return (
    <div className="loading" role="status" aria-live="polite">
      <PipelineStrip active />
      <p className="loading-text">
        Coordinating agents and tools...
      </p>
    </div>
  );
}

export default LoadingSpinner;