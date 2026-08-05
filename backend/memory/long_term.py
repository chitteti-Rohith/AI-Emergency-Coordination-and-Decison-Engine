import json
from pathlib import Path
from threading import Lock

STORE_PATH = Path(__file__).resolve().parent / "long_term_store.json"


class LongTermMemory:

    def __init__(self):
        self._lock = Lock()

        STORE_PATH.parent.mkdir(parents=True, exist_ok=True)

        if not STORE_PATH.exists():
            STORE_PATH.write_text("[]")

    def _read(self):
        try:
            return json.loads(STORE_PATH.read_text())
        except (json.JSONDecodeError, FileNotFoundError):
            return []

    def _write(self, entries):
        STORE_PATH.write_text(
            json.dumps(entries, indent=2)
        )

    def add(self, incident, category, result):

        with self._lock:

            entries = self._read()

            # Prevent duplicate incidents
            for item in entries:

                if (
                    item["incident"].strip().lower() == incident.strip().lower()
                    and item["category"].strip().lower() == category.strip().lower()
                ):
                    return

            entries.append({
                "incident": incident,
                "category": category,
                "result": result
            })

            self._write(entries)

    def query_similar(self, category, k=3):

        with self._lock:

            entries = self._read()

        matches = []

        for item in reversed(entries):

            if item.get("category") == category:
                matches.append(item)

            if len(matches) >= k:
                break

        return matches

    def count(self):

        return len(self._read())


long_term_memory = LongTermMemory()