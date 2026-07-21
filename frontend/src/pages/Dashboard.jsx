import { useState } from "react";
import IncidentForm from "../components/IncidentForm";
import TextResultCard from "../components/TextResultCard";
import ToolCard from "../components/ToolCard";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import PipelineStrip from "../components/PipelineStrip";
import TicketHeader from "../components/TicketHeader";
import Footer from "../components/Footer";
import apiClient from "../api/client";
import { getSeverityTone, generateSessionRef } from "../utils/severity";
import "../App.css";

function Dashboard() {
  // All state lives here in Dashboard, not in the child components.
  // This is called "lifting state up" — Dashboard is the single source
  // of truth, and every card below just receives data via props and
  // renders it. Cards don't fetch anything or hold their own state.
  const [incident, setIncident] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [meta, setMeta] = useState(null); // { ref, timestamp } for the ticket header

  // async because we're using await — this function pauses at the
  // `await apiClient.post(...)` line until Flask responds, without
  // freezing the rest of the page (React keeps rendering LoadingSpinner
  // while we wait).
  const handleAnalyze = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await apiClient.post("/analyze", { incident });
      // Axios puts the parsed JSON body on response.data — this is
      // exactly the dict coordinate_incident() returned in coordinator.py.
      setResult(response.data);
      setMeta({ ref: generateSessionRef(), timestamp: new Date() });
    } catch (err) {
      if (err.response) {
        // The request reached Flask, but Flask returned a non-2xx status
        // (400 empty incident, 500 agent failure) — see app.py's
        // jsonify({"error": ...}) responses. err.response.data.error
        // is the message we wrote there.
        setError(err.response.data.error || "Something went wrong on the server.");
      } else if (err.request) {
        // The request was sent but no response ever came back — almost
        // always means the Flask server isn't running, or CORS blocked it.
        setError("Could not reach the backend. Is the Flask server running on port 5000?");
      } else {
        // Something went wrong just building the request itself
        setError(`Request error: ${err.message}`);
      }
    } finally {
      // finally always runs, whether we succeeded or hit an error —
      // this guarantees the loading state always clears.
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <header className="page-header">
        <span className="eyebrow">Multi-Emegency-Agent Coordination Console</span>
        <h1>AI Emergency Coordination & Decision Engine</h1>
        <p>Describe an incident. Five specialized agents classify it, assess risk, decide a response, and pull in emergency resources — together.</p>
      </header>

      <main className="page-main">
        <IncidentForm
          value={incident}
          onChange={setIncident}
          onSubmit={handleAnalyze}
          disabled={loading}
        />

        <ErrorMessage message={error} />

        {loading && <LoadingSpinner />}

        {result && !loading && (
          <div className="results">
            <TicketHeader sessionRef={meta.ref} timestamp={meta.timestamp} />
            <PipelineStrip active={false} />

            <section className="card-grid">
              <TextResultCard
                title="Classification"
                icon="📋"
                content={result.classification}
                tone={getSeverityTone(result.classification)}
              />
              <TextResultCard
                title="Risk Assessment"
                icon="⚠️"
                content={result.risk}
                tone={getSeverityTone(result.risk)}
              />
              <TextResultCard
                title="Decision Support"
                icon="✅"
                content={result.decision}
                tone={getSeverityTone(result.decision)}
              />
            </section>

            <h2 className="section-heading">Enterprise Tool Results</h2>
            <section className="card-grid">
              <ToolCard title="Emergency Contacts" icon="📞" data={result.contacts} />
              <ToolCard title="Nearby Hospital" icon="🏥" data={result.hospital} />
              <ToolCard title="Weather" icon="🌤" data={result.weather} />
              <ToolCard title="Location" icon="📍" data={result.location} />
            </section>
          </div>
        )}
      </main>

     
    </div>
  );
}

export default Dashboard;
