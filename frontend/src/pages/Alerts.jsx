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
    return <div>No Alert Data Found</div>;
  }

  const { incident, result } = state;

  // Extract Incident Type
  const getCategory = () => {
    const match = result.classification.match(
      /Incident Type:\s*(.*)/
    );

    return match ? match[1].trim() : "Unknown";
  };

  // Extract Risk Level
  const getRisk = () => {
    const match = result.risk.match(
      /Risk Level:\s*(.*)/
    );

    return match ? match[1].trim() : "Unknown";
  };

  // Extract Immediate Actions
  const getActions = () => {
    const match = result.decision.match(
      /Immediate Actions:([\s\S]*?)Safety Measures:/
    );

    if (!match) {
      return result.decision;
    }

    return match[1]
      .split("\n")
      .filter((line) => line.trim().startsWith("-"))
      .map((line) => "• " + line.replace("-", "").trim())
      .join("\n");
  };

  // Get Emergency Title
  const getEmergencyTitle = () => {
    const category = getCategory().toLowerCase();

    if (category.includes("accident")) {
      return "🚗 ROAD ACCIDENT ALERT";
    }

    if (category.includes("fire")) {
      return "🔥 FIRE EMERGENCY ALERT";
    }

    if (category.includes("flood")) {
      return "🌊 FLOOD EMERGENCY ALERT";
    }

    if (category.includes("medical")) {
      return "🏥 MEDICAL EMERGENCY ALERT";
    }

    if (category.includes("security")) {
      return "🚨 SECURITY ALERT";
    }

    if (category.includes("gas")) {
      return "⚠️ GAS LEAK ALERT";
    }

    if (category.includes("equipment")) {
      return "⚙️ EQUIPMENT FAILURE ALERT";
    }

    return "🚨 EMERGENCY ALERT";
  };

  // Get image according to emergency type
  const getEmergencyImage = () => {
    const category = getCategory().toLowerCase();

    if (category.includes("accident")) {
      return "/images/road-accident.jpg";
    }

    if (category.includes("fire")) {
      return "/images/fire.jpg";
    }

    if (category.includes("flood")) {
      return "/images/flood.jpg";
    }

    if (category.includes("medical")) {
      return "/images/medical.jpg";
    }

    if (category.includes("security")) {
      return "/images/security.jpg";
    }

    if (category.includes("gas")) {
      return "/images/gas-leak.jpg";
    }

    return "/images/emergency.jpg";
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
          .map(([key, value]) => `${key}: ${value}`)
          .join("\n"),

      decision: getActions(),

      time: new Date().toLocaleString(),

      recipient: "chitteti.rohith15@gmail.com",

      emergency_type: getCategory(),

      emergency_title: getEmergencyTitle(),
    };

    try {
      await emailjs.send(
        "service_69vth1f",
        "template_p60mgzl",
        templateParams,
        "GewHMGoP1tVFdwoIl"
      );

      setStatus(
        "✅ Emergency Alert Email Sent Successfully"
      );
    } catch (err) {
      console.log(err);

      setStatus(
        "❌ Failed to Send Emergency Email"
      );
    }

    setSending(false);
  };

  return (
    <div className="alerts-page">

      {/* Header */}
      <div className="alerts-header">

        <div>
          <h1>{getEmergencyTitle()}</h1>

          <p>
            AI Emergency Coordination and Decision Engine
          </p>
        </div>

        <div className="alert-status-badge">
          🟢 Ready to Send
        </div>

      </div>


      {/* Main Alert Content */}
      <div className="alert-main-container">

        {/* LEFT SIDE */}
        <div className="alert-left">

          {/* Incident Summary */}
          <div className="alert-preview">

            <h2>📋 Incident Summary</h2>

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

                {result.hospital?.Hospital ||
                  result.hospital?.Name ||
                  "Government General Hospital"}

              </span>

            </div>

          </div>


          {/* Recipient */}
          <div className="recipient-card">

            <h2>📧 Emergency Recipient</h2>


            <div className="recipient-row">

              <span>To:</span>

              <strong>
                Central Emergency Coordination Center
              </strong>

            </div>


            <div className="recipient-row">

              <span>Emergency Type:</span>

              <strong>
                {getCategory()}
              </strong>

            </div>


            <div className="recipient-row">

              <span>Priority:</span>

              <strong>
                {getRisk()}
              </strong>

            </div>


            <div className="email-status">

              🟢 Connected

            </div>

          </div>

        </div>


        {/* RIGHT SIDE - IMAGE */}
        <div className="alert-image-card">

          <img
            src={getEmergencyImage()}
            alt={getCategory()}
          />

          <div className="image-overlay">

            <h2>
              {getEmergencyTitle()}
            </h2>

            <p>
              Priority: {getRisk()}
            </p>

          </div>

        </div>

      </div>


      {/* Send Button */}
      <button
        className="send-alert-btn"
        disabled={sending}
        onClick={sendAlert}
      >

        {sending
          ? "📤 Sending Emergency Email..."
          : "📧 Send Emergency Email"}

      </button>


      {/* Status */}
      {status && (
        <div className="alert-status">
          {status}
        </div>
      )}


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