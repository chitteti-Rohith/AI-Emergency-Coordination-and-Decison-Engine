"""
Returns emergency contact numbers based on the incident category.
"""

def get_emergency_contacts(category):

    contacts = {

        "Fire": {
            "Fire Department": "101",
            "National Emergency": "112"
        },

        "Medical": {
            "Ambulance": "108",
            "National Emergency": "112"
        },

        "Gas Leak": {
            "Fire Department": "101",
            "Gas Emergency": "1906",
            "National Emergency": "112"
        },

        "Road Accident": {
            "Police": "100",
            "Ambulance": "108",
            "National Emergency": "112"
        },

        "Security Threat": {
            "Police": "100",
            "National Emergency": "112"
        },

        "Natural Disaster": {
            "Disaster Management": "1078",
            "National Emergency": "112"
        },

        "Equipment Failure": {
            "Maintenance Team": "Internal Support",
            "National Emergency": "112"
        },

        "Other": {
            "National Emergency": "112"
        }
    }

    return contacts.get(category, contacts["Other"])