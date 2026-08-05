/**
 * ToolCard
 * Displays enterprise tool results such as
 * Emergency Contacts, Hospital, Weather and Location.
 */

function ToolCard({ title, icon, data }) {

  const entries = Object.entries(data || {});

  return (

    <div className="card tool-card">

      <div className="tool-header">

        <h3>
          <span className="tool-icon">{icon}</span>
          {title}
        </h3>

      </div>

      <div className="tool-body">

        {entries.length === 0 ? (

          <p className="tool-empty">
            No information available.
          </p>

        ) : (

          <dl className="tool-list">

            {entries.map(([key, value]) => (

              <div className="tool-row" key={key}>

                <dt>{key}</dt>

                <dd>{value || "-"}</dd>

              </div>

            ))}

          </dl>

        )}

      </div>

    </div>

  );

}

export default ToolCard;