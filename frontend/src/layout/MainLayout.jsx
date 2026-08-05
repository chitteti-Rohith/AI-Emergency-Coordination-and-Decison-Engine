import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "./Layout.css";

function MainLayout({ children }) {

  return (

    <div className="layout">

      <Sidebar />

      <div className="content">

        <Topbar />

        <main className="page-content">

          {children}

        </main>

      </div>

    </div>

  );
}

export default MainLayout;