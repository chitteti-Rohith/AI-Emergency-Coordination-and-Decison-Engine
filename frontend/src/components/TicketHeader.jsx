/**
 * Displays the incident reference number and analysis time.
 */

function TicketHeader({ sessionRef, timestamp }) {
  return (
    <div className="ticket-header">
      <div className="ticket-row">

        <span className="ticket-field">
          <span className="ticket-field-label">Ref</span>
          <span className="ticket-field-value">
            {sessionRef}
          </span>
        </span>

        <span className="ticket-field">
          <span className="ticket-field-label">
            Analyzed
          </span>

          <span className="ticket-field-value">
            {timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </span>

      </div>

      <div
        className="ticket-perforation"
        aria-hidden="true"
      />
    </div>
  );
}

export default TicketHeader;