import "./Layout.css";

function Topbar() {

  return (

    <header className="topbar">

      <div>

        <h2>AI Agent Coordination & Decision Engine</h2>

        <p>
          Multi-Agent AI Emergency Response Platform
        </p>

      </div>

      <div className="user-box">

        <div className="status-dot"></div>

        <span>System Online</span>

      </div>

    </header>

  );
}

export default Topbar;