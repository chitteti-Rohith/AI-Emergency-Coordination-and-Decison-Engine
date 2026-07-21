from agents.classifier import classify_incident
from agents.risk import assess_risk
from agents.decision import make_decision

from tools.emergency_contacts import get_emergency_contacts
from tools.hospital_tool import get_nearest_hospital
from tools.weather_tool import get_weather
from tools.location_tool import get_location_details


def coordinate_incident(incident):

    classification = classify_incident(incident)

    risk = assess_risk(incident)

    decision = make_decision(incident)

    # Tool Outputs
    contacts = get_emergency_contacts("Fire")
    hospital = get_nearest_hospital()
    weather = get_weather()
    location = get_location_details()

    return {
        "classification": classification,
        "risk": risk,
        "decision": decision,
        "contacts": contacts,
        "hospital": hospital,
        "weather": weather,
        "location": location
    }