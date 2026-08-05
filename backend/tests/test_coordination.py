"""
Tests the Coordinator Agent.

Validates:
- Agent communication
- Short-term memory
- Long-term memory
"""

import sys
from pathlib import Path
from unittest.mock import patch

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from agents.coordinator import coordinate_incident
from memory.short_term import session_memory
from memory.long_term import (
    long_term_memory,
    STORE_PATH as LONG_TERM_STORE_PATH
)


@pytest.fixture(autouse=True)
def reset_memory():
    """Clear memory before and after every test."""

    session_memory.clear()

    if LONG_TERM_STORE_PATH.exists():
        LONG_TERM_STORE_PATH.unlink()

    yield

    session_memory.clear()

    if LONG_TERM_STORE_PATH.exists():
        LONG_TERM_STORE_PATH.unlink()


@patch(
    "agents.coordinator.make_decision",
    return_value="Immediate Actions:\n- Evacuate\n\nPriority:\nHigh"
)
@patch(
    "agents.coordinator.assess_risk",
    return_value="Risk Level: High\nReason: Electrical fault"
)
@patch(
    "agents.coordinator.classify_incident",
    return_value="Category: Fire\nSeverity: High"
)
def test_classification_passed_to_risk_agent(
    mock_classify,
    mock_risk,
    mock_decision
):
    coordinate_incident("Fire in the electrical room")

    _, kwargs = mock_risk.call_args

    assert kwargs["classification"] == "Category: Fire\nSeverity: High"


@patch(
    "agents.coordinator.make_decision",
    return_value="Immediate Actions:\n- Evacuate\n\nPriority:\nHigh"
)
@patch(
    "agents.coordinator.assess_risk",
    return_value="Risk Level: High\nReason: Electrical fault"
)
@patch(
    "agents.coordinator.classify_incident",
    return_value="Category: Fire\nSeverity: High"
)
def test_risk_and_classification_passed_to_decision_agent(
    mock_classify,
    mock_risk,
    mock_decision
):
    coordinate_incident("Fire in the electrical room")

    _, kwargs = mock_decision.call_args

    assert kwargs["classification"] == "Category: Fire\nSeverity: High"
    assert kwargs["risk"] == "Risk Level: High\nReason: Electrical fault"


@patch(
    "agents.coordinator.make_decision",
    return_value="Priority:\nHigh"
)
@patch(
    "agents.coordinator.assess_risk",
    return_value="Risk Level: High"
)
@patch(
    "agents.coordinator.classify_incident",
    return_value="Category: Fire\nSeverity: High"
)
def test_decision_receives_memory_context(
    mock_classify,
    mock_risk,
    mock_decision
):
    coordinate_incident("Fire in the electrical room")

    _, kwargs = mock_decision.call_args

    assert "session_memory" in kwargs
    assert "similar_incidents" in kwargs


@patch(
    "agents.coordinator.make_decision",
    return_value="Priority:\nHigh"
)
@patch(
    "agents.coordinator.assess_risk",
    return_value="Risk Level: High"
)
@patch(
    "agents.coordinator.classify_incident",
    return_value="Category: Fire\nSeverity: High"
)
def test_short_term_memory_updated(
    mock_classify,
    mock_risk,
    mock_decision
):
    assert len(session_memory.all()) == 0

    coordinate_incident("Fire in the electrical room")

    entries = session_memory.all()

    assert len(entries) == 1
    assert entries[0]["incident"] == "Fire in the electrical room"


@patch(
    "agents.coordinator.make_decision",
    return_value="Priority:\nHigh"
)
@patch(
    "agents.coordinator.assess_risk",
    return_value="Risk Level: High"
)
@patch(
    "agents.coordinator.classify_incident",
    return_value="Category: Fire\nSeverity: High"
)
def test_long_term_memory_updated(
    mock_classify,
    mock_risk,
    mock_decision
):
    assert long_term_memory.count() == 0

    coordinate_incident("Fire in the electrical room")

    assert long_term_memory.count() == 1


@patch(
    "agents.coordinator.make_decision",
    return_value="Priority:\nHigh"
)
@patch(
    "agents.coordinator.assess_risk",
    return_value="Risk Level: High"
)
@patch(
    "agents.coordinator.classify_incident",
    return_value="Category: Fire\nSeverity: High"
)
def test_similar_incident_retrieved_from_memory(
    mock_classify,
    mock_risk,
    mock_decision
):
    coordinate_incident("Fire in the electrical room")
    coordinate_incident("Fire in the server room")

    _, kwargs = mock_decision.call_args

    similar = kwargs["similar_incidents"]

    assert len(similar) == 1
    assert similar[0]["incident"] == "Fire in the electrical room"