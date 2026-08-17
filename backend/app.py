"""
Flask API for the AI Agent Coordination & Decision Engine.
"""

from flask import Flask, request, jsonify
from flask_cors import CORS

from agents.coordinator import coordinate_incident
from memory.short_term import session_memory
from memory.long_term import long_term_memory


app = Flask(__name__)

# Enable CORS for React frontend
CORS(app)


# =====================================================
# HEALTH CHECK
# =====================================================

@app.route("/health", methods=["GET"])
def health():
    """Health check endpoint."""

    return jsonify({
        "status": "ok",
        "service": "AI Agent Coordination API"
    }), 200


# =====================================================
# SYSTEM STATUS
# =====================================================

@app.route("/status", methods=["GET"])
def status():
    """Returns overall system status and memory information."""

    try:

        short_term_count = len(
            session_memory.all()
        )

        long_term_count = long_term_memory.count()

        return jsonify({

            "system":
                "AI Emergency Coordination & Decision Engine",

            "status":
                "Operational",

            "api":
                "Online",

            "ai_engine":
                "Ready",

            "memory":
                "Active",

            "short_term_memory":
                short_term_count,

            "long_term_memory":
                long_term_count

        }), 200

    except Exception as e:

        return jsonify({

            "system":
                "AI Emergency Coordination & Decision Engine",

            "status":
                "Warning",

            "api":
                "Online",

            "ai_engine":
                "Unknown",

            "memory":
                "Error",

            "error":
                str(e)

        }), 500


# =====================================================
# INCIDENT ANALYSIS
# =====================================================

@app.route("/analyze", methods=["POST"])
def analyze():

    data = request.get_json(
        silent=True
    ) or {}

    incident = data.get(
        "incident",
        ""
    ).strip()

    latitude = data.get(
        "latitude"
    )

    longitude = data.get(
        "longitude"
    )

    # Validate incident
    if not incident:

        return jsonify({

            "error":
                "Incident is required."

        }), 400

    try:

        result = coordinate_incident(

            incident,

            latitude,

            longitude

        )

        return jsonify(result), 200

    except Exception as e:
        import traceback
        traceback.print_exc()

        return jsonify({
            "error": f"Analysis failed: {str(e)}"
        }), 500


# =====================================================
# INCIDENT HISTORY
# =====================================================

@app.route("/history", methods=["GET"])
def history():
    """Returns all incidents analyzed in the current session."""

    try:

        history = session_memory.all()

        return jsonify({

            "count":
                len(history),

            "history":
                history

        }), 200

    except Exception as e:

        return jsonify({

            "error":
                f"Unable to retrieve history: {str(e)}"

        }), 500


# =====================================================
# MEMORY STATISTICS
# =====================================================

@app.route("/memory", methods=["GET"])
def memory():
    """Returns memory statistics."""

    try:

        return jsonify({

            "short_term_count":
                len(session_memory.all()),

            "long_term_count":
                long_term_memory.count()

        }), 200

    except Exception as e:

        return jsonify({

            "error":
                f"Unable to retrieve memory statistics: {str(e)}"

        }), 500


# =====================================================
# START FLASK SERVER
# =====================================================

if __name__ == "__main__":

    app.run(
        debug=True,
        port=5000
    )