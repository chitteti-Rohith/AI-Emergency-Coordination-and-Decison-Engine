"""
Tests for Short-Term and Long-Term Memory.

Run:
    python -m pytest tests/ -v
"""

import sys
from pathlib import Path

import pytest

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from memory.short_term import SessionMemory
from memory.long_term import LongTermMemory, STORE_PATH


@pytest.fixture(autouse=True)
def clean_long_term_store():
    """Clear the long-term memory file before and after each test."""

    if STORE_PATH.exists():
        STORE_PATH.unlink()

    yield

    if STORE_PATH.exists():
        STORE_PATH.unlink()


# -------------------------
# Short-Term Memory Tests
# -------------------------

def test_short_term_memory_starts_empty():
    memory = SessionMemory()

    assert memory.all() == []
    assert memory.recent() == []


def test_short_term_memory_add_and_all():
    memory = SessionMemory()

    memory.add("Fire in the kitchen", {"decision": "Evacuate"})
    memory.add("Flooding in the basement", {"decision": "Move to higher ground"})

    entries = memory.all()

    assert len(entries) == 2
    assert entries[0]["incident"] == "Fire in the kitchen"
    assert entries[1]["incident"] == "Flooding in the basement"


def test_short_term_memory_recent_respects_limit():
    memory = SessionMemory()

    for i in range(10):
        memory.add(f"Incident {i}", {})

    recent = memory.recent(n=3)

    assert len(recent) == 3
    assert recent[-1]["incident"] == "Incident 9"


def test_short_term_memory_clear():
    memory = SessionMemory()

    memory.add("Fire in the kitchen", {})
    memory.clear()

    assert memory.all() == []


# -------------------------
# Long-Term Memory Tests
# -------------------------

def test_long_term_memory_starts_empty():
    memory = LongTermMemory()

    assert memory.count() == 0


def test_long_term_memory_add_and_count():
    memory = LongTermMemory()

    memory.add(
        "Fire in the kitchen",
        "Fire",
        {"decision": "Evacuate"}
    )

    memory.add(
        "Flooding in the basement",
        "Natural Disaster",
        {"decision": "Move up"}
    )

    assert memory.count() == 2


def test_long_term_memory_query_similar_filters_by_category():
    memory = LongTermMemory()

    memory.add("Fire in the kitchen", "Fire", {})
    memory.add("Flooding in the basement", "Natural Disaster", {})
    memory.add("Fire in the server room", "Fire", {})

    matches = memory.query_similar("Fire")

    assert len(matches) == 2
    assert all(
        match["category"] == "Fire"
        for match in matches
    )


def test_long_term_memory_query_similar_respects_limit():
    memory = LongTermMemory()

    for i in range(5):
        memory.add(
            f"Fire incident {i}",
            "Fire",
            {}
        )

    matches = memory.query_similar(
        "Fire",
        k=2
    )

    assert len(matches) == 2


def test_long_term_memory_returns_latest_incident():
    memory = LongTermMemory()

    memory.add("First fire", "Fire", {})
    memory.add("Second fire", "Fire", {})

    matches = memory.query_similar(
        "Fire",
        k=1
    )

    assert matches[0]["incident"] == "Second fire"


def test_long_term_memory_persists_after_restart():
    first_memory = LongTermMemory()

    first_memory.add(
        "Fire in the kitchen",
        "Fire",
        {"decision": "Evacuate"}
    )

    del first_memory

    second_memory = LongTermMemory()

    assert second_memory.count() == 1
    assert (
        second_memory.query_similar("Fire")[0]["incident"]
        == "Fire in the kitchen"
    )