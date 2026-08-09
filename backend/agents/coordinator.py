"""
Coordinator Agent

Coordinates all AI agents, manages memory,
invokes enterprise tools, and tracks workflow execution.
"""

from agents.classifier import classify_incident
from agents.risk import assess_risk
from agents.decision import make_decision
from agents.context import (
    extract_category,
    format_session_memory
)

from tools.emergency_contacts import get_emergency_contacts
from tools.hospital_tool import get_nearest_hospital
from tools.weather_tool import get_weather
from tools.location_tool import get_location_details

from memory.short_term import session_memory
from memory.long_term import long_term_memory


def coordinate_incident(incident, latitude=None, longitude=None):

    # =====================================================
    # WORKFLOW TRACKING
    # =====================================================

    workflow = []

    workflow.append({
        "step": "Incident Received",
        "status": "Completed"
    })

    # =====================================================
    # DEFAULT LOCATION
    # =====================================================

    if latitude is None or longitude is None:
        latitude = 13.6288
        longitude = 80.0280

    # =====================================================
    # CLASSIFICATION AGENT
    # =====================================================

    try:

        classification = classify_incident(incident)

        category = extract_category(classification)

        workflow.append({
            "step": "Classification Agent",
            "status": "Completed"
        })

    except Exception as e:

        workflow.append({
            "step": "Classification Agent",
            "status": "Failed",
            "error": str(e)
        })

        raise e

    # =====================================================
    # RISK ASSESSMENT AGENT
    # =====================================================

    try:

        risk = assess_risk(
            incident,
            classification=classification
        )

        workflow.append({
            "step": "Risk Assessment Agent",
            "status": "Completed"
        })

    except Exception as e:

        workflow.append({
            "step": "Risk Assessment Agent",
            "status": "Failed",
            "error": str(e)
        })

        raise e

    # =====================================================
    # MEMORY RETRIEVAL
    # =====================================================

    try:

        recent_session = session_memory.recent()

        similar_incidents = long_term_memory.query_similar(
            category
        )

        workflow.append({
            "step": "Memory Retrieval",
            "status": "Completed"
        })

    except Exception as e:

        recent_session = []

        similar_incidents = []

        workflow.append({
            "step": "Memory Retrieval",
            "status": "Failed",
            "error": str(e)
        })

    # =====================================================
    # DECISION AGENT
    # =====================================================

    try:

        decision = make_decision(
            incident,
            classification=classification,
            risk=risk,
            session_memory=recent_session,
            similar_incidents=similar_incidents
        )

        workflow.append({
            "step": "Decision Agent",
            "status": "Completed"
        })

    except Exception as e:

        workflow.append({
            "step": "Decision Agent",
            "status": "Failed",
            "error": str(e)
        })

        raise e

    # =====================================================
    # ENTERPRISE TOOL EXECUTION
    # =====================================================

    contacts = None
    hospital = None
    weather = None
    location = None

    try:

        category_lower = category.lower()

        # -------------------------
        # Gas Leak
        # -------------------------

        if "gas" in category_lower:

            contacts = get_emergency_contacts("Gas Leak")

            hospital = get_nearest_hospital(
                latitude,
                longitude
            )

            location = get_location_details(
                latitude,
                longitude
            )

        # -------------------------
        # Fire
        # -------------------------

        elif (
            "fire" in category_lower
            or "wildfire" in category_lower
        ):

            contacts = get_emergency_contacts("Fire")

            hospital = get_nearest_hospital(
                latitude,
                longitude
            )

            weather = get_weather(
                latitude,
                longitude
            )

            location = get_location_details(
                latitude,
                longitude
            )

        # -------------------------
        # Flood
        # -------------------------

        elif "flood" in category_lower:

            contacts = get_emergency_contacts(
                "Natural Disaster"
            )

            weather = get_weather(
                latitude,
                longitude
            )

            location = get_location_details(
                latitude,
                longitude
            )

        # -------------------------
        # Road Accident
        # -------------------------

        elif "accident" in category_lower:

            contacts = get_emergency_contacts(
                "Road Accident"
            )

            hospital = get_nearest_hospital(
                latitude,
                longitude
            )

            location = get_location_details(
                latitude,
                longitude
            )

        # -------------------------
        # Medical
        # -------------------------

        elif "medical" in category_lower:

            contacts = get_emergency_contacts(
                "Medical"
            )

            hospital = get_nearest_hospital(
                latitude,
                longitude
            )

            location = get_location_details(
                latitude,
                longitude
            )

        # -------------------------
        # Security
        # -------------------------

        elif "security" in category_lower:

            contacts = get_emergency_contacts(
                "Security Threat"
            )

            location = get_location_details(
                latitude,
                longitude
            )

        # -------------------------
        # Equipment Failure
        # -------------------------

        elif "equipment" in category_lower:

            contacts = get_emergency_contacts(
                "Equipment Failure"
            )

            location = get_location_details(
                latitude,
                longitude
            )

        # -------------------------
        # Other
        # -------------------------

        else:

            contacts = get_emergency_contacts(
                "Other"
            )

        workflow.append({
            "step": "Enterprise Tools",
            "status": "Completed"
        })

    except Exception as e:

        workflow.append({
            "step": "Enterprise Tools",
            "status": "Partial / Failed",
            "error": str(e)
        })

    # =====================================================
    # FINAL RESULT
    # =====================================================

    result = {

        "classification": classification,

        "risk": risk,

        "decision": decision,

        "contacts": contacts,

        "hospital": hospital,

        "weather": weather,

        "location": location,

        # -------------------------
        # Milestone 3 Memory
        # -------------------------

        "session_memory":
            format_session_memory(
                recent_session
            ),

        "related_incidents":
            similar_incidents,

        # -------------------------
        # Milestone 4 Workflow
        # -------------------------

        "workflow": workflow,

        "workflow_status": "Completed"

    }

    # =====================================================
    # UPDATE SHORT-TERM MEMORY
    # =====================================================

    try:

        session_memory.add(
            incident,
            result
        )

        workflow.append({
            "step": "Short-Term Memory Update",
            "status": "Completed"
        })

    except Exception as e:

        workflow.append({
            "step": "Short-Term Memory Update",
            "status": "Failed",
            "error": str(e)
        })

    # =====================================================
    # UPDATE LONG-TERM MEMORY
    # =====================================================

    try:

        long_term_memory.add(
            incident,
            category,
            result
        )

        workflow.append({
            "step": "Long-Term Memory Update",
            "status": "Completed"
        })

    except Exception as e:

        workflow.append({
            "step": "Long-Term Memory Update",
            "status": "Failed",
            "error": str(e)
        })

    # =====================================================
    # FINAL WORKFLOW STATUS
    # =====================================================

    result["workflow"] = workflow

    failed_steps = [
        step
        for step in workflow
        if "Failed" in step["status"]
    ]

    if failed_steps:

        result["workflow_status"] = "Completed with warnings"

    else:

        result["workflow_status"] = "Completed"

    return result