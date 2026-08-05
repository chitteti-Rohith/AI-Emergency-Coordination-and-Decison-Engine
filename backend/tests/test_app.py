"""
Tests for the Flask API endpoints.

Run:
    python -m pytest tests/ -v
"""

import sys
from pathlib import Path
from unittest.mock import patch

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

import app as app_module
from memory.short_term import session_memory
from memory.long_term import STORE_PATH as LONG_TERM_STORE_PATH


SAMPLE_RESULT = {
    "classification": "Category: Fire\nIncident Type: Electrical Fire\nSeverity: High",
    "risk": "Risk Level: High\n\nReason:\n- Electrical fault",
    "decision": "Immediate Actions:\n- Evacuate\n\nPriority:\nHigh",
    "contacts": {
        "Fire Department": "101",
        "National Emergency": "112"
    },
    "hospital": {
        "Hospital": "Government General Hospital"
    },
    "weather": {
        "Temperature": "34°C"
    },
    "location": {
        "Latitude": "13.6288",
        "Longitude": "79.4192"
    },
    "session_memory": "No previous incidents in this session.",
    "related_incidents": [],
}


@pytest.fixture
def client():
    app_module.app.config["TESTING"] = True

    # Clear memory before every test
    session_memory.clear()

    if LONG_TERM_STORE_PATH.exists():
        LONG_TERM_STORE_PATH.unlink()

    return app_module.app.test_client()


def test_health_returns_200(client):
    response = client.get("/health")

    assert response.status_code == 200
    assert response.get_json()["status"] == "ok"


def test_analyze_missing_incident_returns_400(client):
    response = client.post("/analyze", json={})

    assert response.status_code == 400
    assert "error" in response.get_json()


def test_analyze_empty_incident_returns_400(client):
    response = client.post("/analyze", json={"incident": "   "})

    assert response.status_code == 400


def test_analyze_returns_expected_response(client):
    with patch("app.coordinate_incident", return_value=SAMPLE_RESULT):
        response = client.post(
            "/analyze",
            json={"incident": "Fire in the electrical room"}
        )

    assert response.status_code == 200

    body = response.get_json()

    expected_keys = [
        "classification",
        "risk",
        "decision",
        "contacts",
        "hospital",
        "weather",
        "location"
    ]

    for key in expected_keys:
        assert key in body


def test_analyze_returns_500_when_error_occurs(client):
    with patch(
        "app.coordinate_incident",
        side_effect=RuntimeError("Groq API timeout")
    ):
        response = client.post(
            "/analyze",
            json={"incident": "Fire in the electrical room"}
        )

    assert response.status_code == 500
    assert "error" in response.get_json()


def test_history_starts_empty(client):
    response = client.get("/history")

    assert response.status_code == 200
    assert response.get_json()["count"] == 0


def test_history_grows_after_analysis(client):
    with patch(
        "agents.coordinator.classify_incident",
        return_value="Category: Fire\nSeverity: High"
    ), patch(
        "agents.coordinator.assess_risk",
        return_value="Risk Level: High"
    ), patch(
        "agents.coordinator.make_decision",
        return_value="Priority:\nHigh"
    ):

        client.post(
            "/analyze",
            json={"incident": "Fire in the electrical room"}
        )

        client.post(
            "/analyze",
            json={"incident": "Flood in the basement"}
        )

    response = client.get("/history")

    body = response.get_json()

    assert body["count"] == 2
    assert body["history"][0]["incident"] == "Fire in the electrical room"


def test_history_not_updated_after_failure(client):
    with patch(
        "app.coordinate_incident",
        side_effect=RuntimeError("Error")
    ):
        client.post(
            "/analyze",
            json={"incident": "Fire"}
        )

    response = client.get("/history")

    assert response.get_json()["count"] == 0


def test_memory_endpoint(client):
    response = client.get("/memory")

    assert response.status_code == 200

    body = response.get_json()

    assert "short_term_count" in body
    assert "long_term_count" in body