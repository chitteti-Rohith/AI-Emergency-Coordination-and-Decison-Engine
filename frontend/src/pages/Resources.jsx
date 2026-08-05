import { useLocation, useNavigate } from "react-router-dom";

import ToolCard from "../components/ToolCard";
import "../styles/Resources.css";

function Resources() {

    const { state } = useLocation();

    const navigate = useNavigate();

    if (!state){

        return(

            <div>

                <h2>No Resources Available</h2>

            </div>

        );

    }

    const { result } = state;

    return(

        <div className="resources-page">

            <div className="resources-header">

                <div>

                    <h1>Emergency Resources</h1>

                    <p>

                        Nearby emergency services and live environmental information.

                    </p>

                </div>

            </div>

            <div className="resource-grid">

                <ToolCard

                    title="Emergency Contacts"

                    icon="📞"

                    data={result.contacts}

                />

                <ToolCard

                    title="Nearby Hospital"

                    icon="🏥"

                    data={result.hospital}

                />

                <ToolCard

                    title="Weather"

                    icon="🌤"

                    data={result.weather}

                />

                <ToolCard

                    title="Current Location"

                    icon="📍"

                    data={result.location}

                />

            </div>

            <div className="analysis-actions">

                <button

                    className="back-btn"

                    onClick={() => navigate("/analysis", {

                        state,

                    })}

                >

                    ← Analysis

                </button>

                <button

                    className="next-btn"

                    onClick={() => navigate("/alerts", {

                        state,

                    })}

                >

                    Next → Alerts

                </button>

            </div>

        </div>

    );

}

export default Resources;