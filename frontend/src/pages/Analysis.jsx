import { useLocation, useNavigate } from "react-router-dom";
import TextResultCard from "../components/TextResultCard";
import { getSeverityTone } from "../utils/severity";
import "../styles/Analysis.css";

function Analysis() {

    const { state } = useLocation();
    const navigate = useNavigate();

    if (!state) {

        return (

            <div className="analysis-container">

                <h2>No Incident Found</h2>

                <p>Please analyze an incident first.</p>

                <button
                    className="back-btn"
                    onClick={() => navigate("/")}
                >
                    ← Back to Dashboard
                </button>

            </div>

        );

    }

    const { incident, result, analyzedAt } = state;

    return (

        <div className="analysis-container">

            <div className="analysis-header">

                <div>

                    <h1>Incident Analysis</h1>

                    <p>
                        AI generated emergency assessment and response.
                    </p>

                </div>

            </div>

            {/* Incident Summary */}

            <div className="summary-card">

                <h2 className="summary-title">
                    🚨 Incident Summary
                </h2>

                <div className="summary-grid">

                    <div>

                        <span>Incident</span>

                        <p>{incident}</p>

                    </div>

                    <div>

                        <span>Analysis Time</span>

                        <p>{analyzedAt.toLocaleTimeString()}</p>

                    </div>

                    <div>

                        <span>Status</span>

                        <p className="status-success">
                            Analysis Completed
                        </p>

                    </div>

                </div>

            </div>

            {/* AI Analysis */}

            <div className="analysis-grid">

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

            </div>

            {/* Navigation Buttons */}

            <div className="analysis-actions">

                <button
                    className="back-btn"
                    onClick={() => navigate("/")}
                >
                    ← Dashboard
                </button>

                <button
                    className="next-btn"
                    onClick={() =>
                        navigate("/resources", {
                            state,
                        })
                    }
                >
                    Next → Resources →
                </button>

            </div>

        </div>

    );

}

export default Analysis;