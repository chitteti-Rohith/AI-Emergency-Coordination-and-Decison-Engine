import { Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import Alerts from "./pages/Alerts";

import Dashboard from "./pages/Dashboard";
import Analysis from "./pages/Analysis";
import Resources from "./pages/Resources";
import History from "./pages/History";
import About from "./pages/About";

function App() {

  return (

    <MainLayout>

      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route path="/analysis" element={<Analysis />} />

        <Route path="/resources" element={<Resources />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/history" element={<History />}/>
        <Route path="/about" element={<About />} />

      </Routes>

    </MainLayout>

  );

}

export default App;