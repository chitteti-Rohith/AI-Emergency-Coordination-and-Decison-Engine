import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import "../styles/Alerts.css";

function Alerts() {

  const { state } = useLocation();
  const navigate = useNavigate();

  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);

  if (!state) {
    return <h2>No Alert Data Found</h2>;
  }

  const { incident, result } = state;

  // Extract Incident Type
  const getCategory = () => {
    const match = result.classification.match(/Incident Type:\s*(.*)/);
    return match ? match[1].trim() : "Unknown";
  };

  // Extract Risk Level
  const getRisk = () => {
    const match = result.risk.match(/Risk Level:\s*(.*)/);
    return match ? match[1].trim() : "Unknown";
  };

  // Extract Immediate Actions
  const getActions = () => {

    const match = result.decision.match(
      /Immediate Actions:([\s\S]*?)Safety Measures:/
    );

    if (!match) return result.decision;

    return match[1]
      .split("\n")
      .filter(line => line.trim().startsWith("-"))
      .map(line => "• " + line.replace("-", "").trim())
      .join("\n");

  };

  const sendAlert = async () => {

    setSending(true);
    setStatus("");

    const templateParams = {

      incident,

      category: getCategory(),

      risk: getRisk(),

      priority: getRisk(),

      location:
        result.location?.Location ||
        "Unknown",

      hospital:
        result.hospital?.Hospital ||
        result.hospital?.Name ||
        "Government General Hospital",

      contacts:
        Object.entries(result.contacts || {})
          .map(([k, v]) => `${k}: ${v}`)
          .join("\n"),

      decision: getActions(),

      time: new Date().toLocaleString(),

    };

    try {

      await emailjs.send(

        "service_69vth1f",

        "template_p60mgzl",

        templateParams,

        "GewHMGoP1tVFdwoIl"

      );

      setStatus("✅ Emergency Alert Email Sent Successfully");

    } catch (err) {

      console.log(err);

      setStatus("❌ Failed to Send Emergency Email");

    }

    setSending(false);

  };

  return (

    <div className="alerts-page">

      {/* Header */}

      <div className="alerts-header">

        <div>

          <h1>🚨 Emergency Alert</h1>

          <p>

            AI Emergency Coordination and Decision Engine

          </p>

        </div>

        <div className="alert-status-badge">

          🟢 Ready to Send

        </div>

      </div>

      {/* Summary + Recipient */}

      <div className="alert-summary">

        <div className="alert-preview">

          <h2>Incident Summary</h2>

          <div className="summary-row">

            <span className="summary-label">
              🚨 Incident
            </span>

            <span className="summary-value">
              {incident}
            </span>

          </div>

          <div className="summary-row">

            <span className="summary-label">
              🔥 Category
            </span>

            <span className="summary-value">
              {getCategory()}
            </span>

          </div>

          <div className="summary-row">

            <span className="summary-label">
              ⚠ Risk Level
            </span>

            <span className="summary-value">
              {getRisk()}
            </span>

          </div>

          <div className="summary-row">

            <span className="summary-label">
              📍 Location
            </span>

            <span className="summary-value">
              {result.location?.Location || "Unknown"}
            </span>

          </div>

          <div className="summary-row">

            <span className="summary-label">
              🏥 Hospital
            </span>

            <span className="summary-value">

              {

                result.hospital?.Hospital ||

                result.hospital?.Name ||

                "Government General Hospital"

              }

            </span>

          </div>

        </div>

        <div className="recipient-card">

          <h2>Recipient</h2>

          <input

            type="email"

            value="chitteti.rohith15@gmail.com"

            readOnly

          />

          <div className="email-status">

            🟢 Connected

          </div>

        </div>

      </div>

      {/* Send Button */}

      <button

        className="send-alert-btn"

        disabled={sending}

        onClick={sendAlert}

      >

        {

          sending

            ? "📤 Sending Emergency Email..."

            : "📧 Send Emergency Email"

        }

      </button>

      {/* Status */}

      {

        status &&

        <div className="alert-status">

          {status}

        </div>

      }

      {/* Navigation */}

      <div className="analysis-actions">

        <button

          className="back-btn"

          onClick={() =>
            navigate("/resources", {
              state,
            })
          }

        >

          ← Resources

        </button>

        <button

          className="next-btn"

          onClick={() =>
            navigate("/history")
          }

        >

          Next → History

        </button>

      </div>

    </div>

  );

}

export default Alerts;