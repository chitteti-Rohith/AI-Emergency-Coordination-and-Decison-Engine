/**
 * Form for entering an emergency incident.
 */

function IncidentForm({ value, onChange, onSubmit, disabled }) {
  return (
    <form
      className="incident-form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <label htmlFor="incident">
        Describe the Emergency
      </label>

      <textarea
        id="incident"
        rows={4}
        placeholder="Example: Smoke is coming from the electrical room..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />

      <button
        type="submit"
        disabled={disabled || value.trim() === ""}
      >
        {disabled ? "Analyzing..." : "Analyze Incident"}
      </button>
    </form>
  );
}

export default IncidentForm;