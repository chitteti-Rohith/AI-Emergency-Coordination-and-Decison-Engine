"""
Flask REST API layer for the AI Agent Coordination & Decision Engine.

This file replaces Streamlit as the interface. It does NOT contain any
business logic itself — it only receives HTTP requests, calls the existing
coordinate_incident() function (unchanged), and returns JSON.
"""

from flask import Flask, request, jsonify
from flask_cors import CORS

from agents.coordinator import coordinate_incident

app = Flask(__name__)

# Allows the React dev server (a different origin/port) to call this API.
# In production you'd restrict this to your actual frontend domain instead
# of allowing everything.
CORS(app)

# Simple in-memory history for the optional GET /history endpoint.
# NOTE: this resets every time the server restarts, and isn't safe for
# multiple concurrent users — it's a demo-friendly stand-in, not a database.
_history = []


@app.route("/health", methods=["GET"])
def health():
    """Lightweight endpoint so the frontend (or you, manually) can check
    the API is up before trying to call /analyze."""
    return jsonify({"status": "ok", "service": "AI Agent Coordination API"}), 200


@app.route("/analyze", methods=["POST"])
def analyze():
    """
    Main endpoint. Expects JSON body: {"incident": "..."}
    Returns the same shape coordinate_incident() already produces:
    classification, risk, decision, contacts, hospital, weather, location.
    """
    data = request.get_json(silent=True) or {}
    incident = data.get("incident", "").strip()

    if not incident:
        return jsonify({"error": "The 'incident' field is required and cannot be empty."}), 400

    try:
        result = coordinate_incident(incident)
    except Exception as exc:
        # Any failure inside the agents (LLM error, tool error, etc.)
        # becomes a clean 500 JSON response instead of a raw traceback.
        return jsonify({"error": f"Analysis failed: {exc}"}), 500

    _history.append({"incident": incident, "result": result})
    return jsonify(result), 200


@app.route("/history", methods=["GET"])
def history():
    """Optional endpoint: returns everything analyzed so far this session."""
    return jsonify({"count": len(_history), "history": _history}), 200


if __name__ == "__main__":
    # debug=True gives auto-reload + detailed error pages while developing.
    # Turn this off (or use a proper WSGI server like gunicorn) in production.
    app.run(debug=True, port=5000)
