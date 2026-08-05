/**
 * TextResultCard
 * Displays AI Agent outputs in a clean report format.
 */

function TextResultCard({ title, icon, content, tone }) {

  const lines = content
    ? content.split("\n").filter(line => line.trim() !== "")
    : [];

  return (

    <div className={`card result-card ${tone ? `card--${tone}` : ""}`}>

      <div className="result-header">

        <div className="result-title">

          <span className="result-icon">
            {icon}
          </span>

          <h3>{title}</h3>

        </div>

        {tone && (
          <span className={`severity severity-${tone}`}>
            {tone.toUpperCase()}
          </span>
        )}

      </div>

      <div className="result-body">

        {lines.map((line, index) => {

          // Section Heading
          if (
            line.endsWith(":") &&
            !line.startsWith("-")
          ) {
            return (
              <h4
                key={index}
                className="result-section"
              >
                {line.replace(":", "")}
              </h4>
            );
          }

          // Bullet
          if (line.startsWith("-")) {

            return (

              <div
                key={index}
                className="result-item"
              >

                <span className="bullet">
                  •
                </span>

                <span>
                  {line.substring(1).trim()}
                </span>

              </div>

            );

          }

          // Normal line
          return (

            <p
              key={index}
              className="result-text"
            >
              {line}
            </p>

          );

        })}

      </div>

    </div>

  );

}

export default TextResultCard;