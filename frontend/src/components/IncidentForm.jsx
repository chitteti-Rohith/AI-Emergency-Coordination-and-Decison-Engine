/**
 * IncidentForm — a "controlled" input component.
 *
 * "Controlled" means React state (not the DOM) is the single source of
 * truth for the textarea's value. The parent (Dashboard) owns that state
 * and passes it down as `value`, plus a function to update it (`onChange`).
 * This is the standard React pattern for forms — it's what lets Dashboard
 * read the current incident text when the button is clicked.
 */
function IncidentForm({ value, onChange, onSubmit, disabled }) {
  return (
    <form
      className="incident-form"
      onSubmit={(e) => {
        e.preventDefault(); // stop the browser's default full-page reload on submit
        onSubmit();
      }}
    >
      <label htmlFor="incident">Describe the Emergency</label>
      <textarea
        id="incident"
        rows={4}
        placeholder="Example: Smoke is coming from the electrical room..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      />
      <button type="submit" disabled={disabled || value.trim() === ""}>
        {disabled ? "Analyzing..." : "Analyze Incident"}
      </button>
    </form>
  );
}

export default IncidentForm;
