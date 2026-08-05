"""
Coordinator Agent

Coordinates all AI agents, manages memory,
and invokes enterprise tools.
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

    # Default Location (Sullurpeta)
    if latitude is None or longitude is None:
        latitude = 13.6288
        longitude = 80.0280

    # -------------------------
    # Classification Agent
    # -------------------------
    classification = classify_incident(incident)
    category = extract_category(classification)

    # -------------------------
    # Risk Agent
    # -------------------------
    risk = assess_risk(
        incident,
        classification=classification
    )

    # -------------------------
    # Memory
    # -------------------------
    recent_session = session_memory.recent()
    similar_incidents = long_term_memory.query_similar(category)

    # -------------------------
    # Decision Agent
    # -------------------------
    decision = make_decision(
        incident,
        classification=classification,
        risk=risk,
        session_memory=recent_session,
        similar_incidents=similar_incidents
    )

    # -------------------------
    # Enterprise Tools
    # -------------------------
    contacts = None
    hospital = None
    weather = None
    location = None

    if "gas" in category.lower():

        contacts = get_emergency_contacts("Gas Leak")
        hospital = get_nearest_hospital(latitude, longitude)
        location = get_location_details(latitude, longitude)

    elif "fire" in category.lower() or "wildfire" in category.lower():

        contacts = get_emergency_contacts("Fire")
        hospital = get_nearest_hospital(latitude, longitude)
        weather = get_weather(latitude, longitude)
        location = get_location_details(latitude, longitude)

    elif "flood" in category.lower():

        contacts = get_emergency_contacts("Natural Disaster")
        weather = get_weather(latitude, longitude)
        location = get_location_details(latitude, longitude)

    elif "accident" in category.lower():

        contacts = get_emergency_contacts("Road Accident")
        hospital = get_nearest_hospital(latitude, longitude)
        location = get_location_details(latitude, longitude)

    elif "medical" in category.lower():

        contacts = get_emergency_contacts("Medical")
        hospital = get_nearest_hospital(latitude, longitude)
        location = get_location_details(latitude, longitude)

    elif "security" in category.lower():

        contacts = get_emergency_contacts("Security Threat")
        location = get_location_details(latitude, longitude)

    elif "equipment" in category.lower():

        contacts = get_emergency_contacts("Equipment Failure")
        location = get_location_details(latitude, longitude)

    else:

        contacts = get_emergency_contacts("Other")

    # -------------------------
    # Final Result
    # -------------------------
    result = {
        "classification": classification,
        "risk": risk,
        "decision": decision,
        "contacts": contacts,
        "hospital": hospital,
        "weather": weather,
        "location": location,

        # Milestone 3
        "session_memory": format_session_memory(recent_session),
        "related_incidents": similar_incidents
    }

    # -------------------------
    # Update Memory
    # -------------------------
    session_memory.add(
        incident,
        result
    )

    long_term_memory.add(
        incident,
        category,
        result
    )

    return result