/**
 * ToolCard — reusable card for the 4 "enterprise tool" results, which are
 * all plain key/value objects (see tools/emergency_contacts.py,
 * hospital_tool.py, weather_tool.py, location_tool.py — every one of them
 * returns a flat dict). One component, reused 4 times with different
 * `title`/`icon`/`data` props, instead of 4 near-identical components.
 */
function ToolCard({ title, icon, data }) {
  const entries = Object.entries(data || {});

  return (
    <div className="card card--tool">
      <h3>
        <span aria-hidden="true">{icon}</span> {title}
      </h3>
      <dl className="tool-list">
        {entries.map(([key, value]) => (
          <div className="tool-row" key={key}>
            <dt>{key}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export default ToolCard;
