import { useEffect, useState } from "react";
import apiClient from "../api/client";
import "../styles/History.css";

function History() {

  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {

    const loadHistory = async () => {

      try {

        const response = await apiClient.get("/history");

        const data = response.data.history.reverse();

        setHistory(data);

      } catch (err) {

        console.log(err);

      } finally {

        setLoading(false);

      }

    };

    loadHistory();

  }, []);

  const filteredHistory = history.filter((item) =>
    item.incident.toLowerCase().includes(search.toLowerCase())
  );

  const total = history.length;

  const critical = history.filter((item) =>
    item.result.risk.includes("Critical")
  ).length;

  const high = history.filter((item) =>
    item.result.risk.includes("High")
  ).length;

  const completed = history.length;

  const getRisk = (risk) => {

    if (risk.includes("Critical")) return "critical";

    if (risk.includes("High")) return "high";

    if (risk.includes("Medium")) return "medium";

    return "low";

  };

  const getRiskText = (risk) => {

    const match = risk.match(/Risk Level:\s*(.*)/);

    return match ? match[1] : "Unknown";

  };

  const getCategory = (classification) => {

    const match = classification.match(/Incident Type:\s*(.*)/);

    return match ? match[1] : "Unknown";

  };

  return (

    <div className="history-page">

      <div className="history-header">

        <div>

          <h1>📜 Incident History</h1>

          <p>

            AI Emergency Coordination and Decision Engine

          </p>

        </div>

        <div className="history-count">

          {total} Incidents

        </div>

      </div>

      <div className="history-stats">

        <div className="history-stat-card">

          <span>📋</span>

          <h3>{total}</h3>

          <p>Total Incidents</p>

        </div>

        <div className="history-stat-card">

          <span>🔴</span>

          <h3>{critical}</h3>

          <p>Critical Cases</p>

        </div>

        <div className="history-stat-card">

          <span>🟠</span>

          <h3>{high}</h3>

          <p>High Risk</p>

        </div>

        <div className="history-stat-card">

          <span>✅</span>

          <h3>{completed}</h3>

          <p>Completed</p>

        </div>

      </div>

      <input

        className="history-search"

        placeholder="🔍 Search Incident..."

        value={search}

        onChange={(e)=>setSearch(e.target.value)}

      />

      {

        loading ?

        <div className="history-loading">

          Loading History...

        </div>

        :

        filteredHistory.length===0 ?

        <div className="history-empty">

          No Incidents Found.

        </div>

        :

        <table className="history-table">

          <thead>

            <tr>

              <th>Ref</th>

              <th>Incident</th>

              <th>Category</th>

              <th>Risk</th>

              <th>Date</th>

              <th>Status</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {

              filteredHistory.map((item,index)=>(

                <tr key={index}>

                  <td>

                    SES-{1000+index}

                  </td>

                  <td>

                    {item.incident}

                  </td>

                  <td>

                    {getCategory(item.result.classification)}

                  </td>

                  <td>

                    <span className={`risk-${getRisk(item.result.risk)}`}>

                      {getRiskText(item.result.risk)}

                    </span>

                  </td>

                  <td>

                    {new Date().toLocaleDateString()}

                  </td>

                  <td>

                    <span className="status-complete">

                      Completed

                    </span>

                  </td>

                  <td>

                    <button

                      className="view-btn"

                      onClick={()=>setSelected(item)}

                    >

                      👁 View

                    </button>

                  </td>

                </tr>

              ))

            }

          </tbody>

        </table>

      }

          {selected && (

        <div className="modal-overlay">

          <div className="history-modal">

            <h2>🚨 Incident Details</h2>

            <div className="detail-section">

              <h3>📄 Incident</h3>

              <p>{selected.incident}</p>

            </div>

            <div className="detail-section">

              <h3>🔥 Category</h3>

              <p>
                {selected.result.classification.match(/Incident Type:\s*(.*)/)?.[1] || "Unknown"}
              </p>

            </div>

            <div className="detail-section">

              <h3>⚠ Severity</h3>

              <p>
                {selected.result.classification.match(/Severity:\s*(.*)/)?.[1] || "Unknown"}
              </p>

            </div>

            <div className="detail-section">

              <h3>🚨 Risk Level</h3>

              <p>
                {selected.result.risk.match(/Risk Level:\s*(.*)/)?.[1] || "Unknown"}
              </p>

            </div>

            <div className="detail-section">

              <h3>📍 Possible Impact</h3>

              <ul>

                {(selected.result.risk.match(/Possible Impact:([\s\S]*?)Reason:/)?.[1] || "")
                  .split("\n")
                  .filter(line => line.trim().startsWith("-"))
                  .map((line, index) => (

                    <li key={index}>

                      {line.replace("-", "").trim()}

                    </li>

                  ))}

              </ul>

            </div>

            <div className="detail-section">

              <h3>🤖 Immediate Actions</h3>

              <ul>

                {(selected.result.decision.match(/Immediate Actions:([\s\S]*?)Safety Measures:/)?.[1] || "")
                  .split("\n")
                  .filter(line => line.trim().startsWith("-"))
                  .map((line, index) => (

                    <li key={index}>

                      {line.replace("-", "").trim()}

                    </li>

                  ))}

              </ul>

            </div>

            <div className="detail-section">

              <h3>🦺 Safety Measures</h3>

              <ul>

                {(selected.result.decision.match(/Safety Measures:([\s\S]*?)Who Should Respond:/)?.[1] || "")
                  .split("\n")
                  .filter(line => line.trim().startsWith("-"))
                  .map((line, index) => (

                    <li key={index}>

                      {line.replace("-", "").trim()}

                    </li>

                  ))}

              </ul>

            </div>

            <div className="detail-section">

              <h3>👨‍🚒 Responding Teams</h3>

              <ul>

                {(selected.result.decision.match(/Who Should Respond:([\s\S]*?)Emergency Contacts/)?.[1] || "")
                  .split("\n")
                  .filter(line => line.trim().startsWith("-"))
                  .map((line, index) => (

                    <li key={index}>

                      {line.replace("-", "").trim()}

                    </li>

                  ))}

              </ul>

            </div>

            <button
              className="next-btn"
              onClick={() => setSelected(null)}
            >
              Close
            </button>

          </div>

        </div>

      )}

    </div>

  );

}

export default History;