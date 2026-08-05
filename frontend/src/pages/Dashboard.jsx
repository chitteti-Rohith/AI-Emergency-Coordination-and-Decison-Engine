import { useState } from "react";
import { useNavigate } from "react-router-dom";

import IncidentForm from "../components/IncidentForm";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorMessage from "../components/ErrorMessage";
import Footer from "../components/Footer";

import apiClient from "../api/client";

import "../App.css";
import "../styles/Dashboard.css";
function Dashboard() {

  const navigate = useNavigate();

  const [incident, setIncident] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async () => {

    setLoading(true);
    setError(null);

    const analyzeIncident = async (
      latitude = null,
      longitude = null
    ) => {

      try {

        const response = await apiClient.post("/analyze", {

          incident,
          latitude,
          longitude,

        });

        navigate("/analysis", {

          state: {

            incident,
            result: response.data,
            analyzedAt: new Date(),

          },

        });

      }

      catch (err) {

        if (err.response) {

          setError(

            err.response.data.error ||

            "Server Error"

          );

        }

        else {

          setError(

            "Unable to connect to backend."

          );

        }

      }

      finally {

        setLoading(false);

      }

    };

    navigator.geolocation.getCurrentPosition(

      (position) => {

        analyzeIncident(

          position.coords.latitude,

          position.coords.longitude

        );

      },

      () => {

        analyzeIncident();

      }

    );

  };

  return (

    <div className="dashboard-page">

      {/* HERO */}

      <section className="hero-section">

        <div className="hero-left">

          <span className="eyebrow">

            AI Powered Emergency Platform

          </span>

          <h1>

            AI Agent Coordination & Decision Engine

          </h1>

          <p>

            Analyze emergency incidents using multiple AI agents,
            assess risk, retrieve nearby emergency resources,
            coordinate emergency response, and support intelligent
            decision making in real time.

          </p>

        </div>

        <div className="hero-right">

          <div className="hero-card">

            <h3>System Status</h3>

            <h2>🟢 Online</h2>

            <p>

              All AI Agents Ready

            </p>

          </div>

        </div>

      </section>

      {/* FORM */}

      <main className="page-main">

        <IncidentForm

          value={incident}

          onChange={setIncident}

          onSubmit={handleAnalyze}

          disabled={loading}

        />

        <ErrorMessage

          message={error}

        />

        {

          loading &&

          <LoadingSpinner />

        }

      </main>

      <Footer />

    </div>

  );

}

export default Dashboard;