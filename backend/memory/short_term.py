"""
Milestone 3 — Short-term (session) memory.

This formalizes what used to be the ad-hoc `_history` list living
directly in app.py (Milestone 1/2). It's now a proper module the
Decision Agent can actually read from — not just a display list for the
optional GET /history endpoint.

Design notes (being upfront about the tradeoffs, not hiding them):
- In-memory only — resets on server restart. That's what makes it
  "short-term" as opposed to the long-term store in long_term.py, which
  is explicitly required to persist.
- Not thread/process-safe for multiple concurrent workers — fine for a
  single Flask dev server, would need a real store (Redis, a database)
  behind a production WSGI server running multiple workers.
"""

from threading import Lock


class SessionMemory:
    def __init__(self):
        self._entries = []
        self._lock = Lock()

    def add(self, incident, result):
        """Record one completed analysis. Called by the coordinator
        after all agents have run — see coordinator.py."""
        with self._lock:
            self._entries.append({"incident": incident, "result": result})

    def recent(self, n=5):
        """The last n entries, most-recent-last (same order as `all()`)
        — this is what the Decision Agent reads as "current session
        memory" context."""
        with self._lock:
            return list(self._entries[-n:])

    def all(self):
        """Every entry recorded this session, in insertion order. Used
        by GET /history — preserves the exact response shape the
        Milestone 1/2 frontend already expects."""
        with self._lock:
            return list(self._entries)

    def clear(self):
        """Used by tests to reset state between test cases, and
        available if you ever want a manual "reset session" action."""
        with self._lock:
            self._entries.clear()


# One shared instance for the whole app — imported by both coordinator.py
# (to write) and app.py (to expose via GET /history).
session_memory = SessionMemory()
