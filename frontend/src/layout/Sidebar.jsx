import { NavLink } from "react-router-dom";
import "./Layout.css";

function Sidebar() {
  const menus = [
    { name: "Dashboard", path: "/" },
    { name: "Analysis", path: "/analysis" },
    { name: "Resources", path: "/resources" },
    { name: "Alerts", path: "/alerts" },
    { name: "History", path: "/history" },
    { name: "About", path: "/about" },
  ];

  return (
    <aside className="sidebar">

      <div className="logo">
        🚨
        <div>
          <h2>AI Emergency</h2>
          <span>Coordination System</span>
        </div>
      </div>

      <nav>

        {menus.map((menu) => (

          <NavLink
            key={menu.path}
            to={menu.path}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            {menu.name}
          </NavLink>

        ))}

      </nav>

    </aside>
  );
}

export default Sidebar;