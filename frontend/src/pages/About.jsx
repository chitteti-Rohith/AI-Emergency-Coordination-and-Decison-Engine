import "../styles/About.css";

function About() {

  return (

    <div className="about-page">

      <div className="about-header">

        <h1>🤖 About Project</h1>

        <p>
          AI Emergency Coordination & Decision Engine
        </p>

      </div>

      <div className="about-card">

        <h2>📌 Project Overview</h2>

        <p>
          The AI Emergency Coordination & Decision Engine is a
          Multi-Agent AI Emergency Response Platform that analyzes
          emergency incidents and provides intelligent decision
          support. The system coordinates multiple AI agents to
          classify incidents, assess risks, locate emergency
          resources, recommend response actions, and generate
          emergency alerts.
        </p>

      </div>

      <div className="about-grid">

        <div className="about-card">

          <h2>🎯 Objectives</h2>

          <ul>

            <li>Detect emergency incidents</li>

            <li>Classify incident category</li>

            <li>Assess risk severity</li>

            <li>Locate nearby hospitals</li>

            <li>Provide emergency contacts</li>

            <li>Generate AI recommendations</li>

            <li>Send emergency alerts</li>

            <li>Maintain incident history</li>

          </ul>

        </div>

        <div className="about-card">

          <h2>🤖 AI Agents</h2>

          <ul>

            <li><strong>Coordinator Agent</strong> – Controls workflow</li>

            <li><strong>Classification Agent</strong> – Identifies incident type</li>

            <li><strong>Risk Agent</strong> – Assesses severity</li>

            <li><strong>Retrieval Agent</strong> – Finds hospitals & contacts</li>

            <li><strong>Decision Agent</strong> – Suggests emergency actions</li>

          </ul>

        </div>

      </div>

      <div className="about-grid">

        <div className="about-card">

          <h2>🛠 Technology Stack</h2>

          <ul>

            <li>React.js</li>

            <li>CSS3</li>

            <li>Python</li>

            <li>Flask</li>

            <li>LangChain</li>

            <li>Google Gemini</li>

            <li>EmailJS</li>

            <li>REST API</li>

          </ul>

        </div>

        <div className="about-card">

          <h2>🧠 Memory System</h2>

          <p>

            <strong>Short-Term Memory</strong>

            <br />

            Stores incidents during the current session.

          </p>

          <br />

          <p>

            <strong>Long-Term Memory</strong>

            <br />

            Stores historical incidents for future analysis and
            intelligent decision making.

          </p>

        </div>

      </div>

      <div className="about-card">

        <h2>⚙ Workflow</h2>

        <div className="workflow">

          User Incident

          <span>↓</span>

          Coordinator Agent

          <span>↓</span>

          Classification Agent

          <span>↓</span>

          Risk Assessment Agent

          <span>↓</span>

          Retrieval Agent

          <span>↓</span>

          Decision Agent

          <span>↓</span>

          Emergency Alert

          <span>↓</span>

          Incident History

        </div>

      </div>

      <div className="about-card">

        <h2>📧 Emergency Alert System</h2>

        <ul>

          <li>AI generates emergency report</li>

          <li>Alerts are sent through EmailJS</li>

          <li>Includes Incident Summary</li>

          <li>Risk Level</li>

          <li>Nearby Hospital</li>

          <li>Emergency Contacts</li>

          <li>AI Recommended Response</li>

        </ul>

      </div>

      <div className="about-card">

        <h2>🚀 Future Enhancements</h2>

        <ul>

          <li>Live GPS Tracking</li>

          <li>SMS Notifications</li>

          <li>Voice Emergency Reporting</li>

          <li>Image-based Incident Detection</li>

          <li>MongoDB Integration</li>

          <li>Predictive AI Analytics</li>

          <li>Mobile Application</li>

        </ul>

      </div>

      <div className="about-footer">

        AI Emergency Coordination & Decision Engine

        <br />

        <span>

          Developed using Multi-Agent AI Architecture • Version 1.0

        </span>

      </div>

    </div>

  );

}

export default About;