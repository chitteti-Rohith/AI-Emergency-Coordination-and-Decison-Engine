def get_emergency_contacts(category):
    """
    Returns emergency contact numbers based on the incident category.
    """

    contacts = {
        "Fire": {
            "Fire Department": "101",
            "National Emergency": "112"
        },

        "Medical": {
            "Ambulance": "108",
            "National Emergency": "112"
        },

        "Crime": {
            "Police": "100",
            "National Emergency": "112"
        },

        "Natural Disaster": {
            "Disaster Management": "1078",
            "National Emergency": "112"
        }
    }

    return contacts.get(
        category,
        {
            "National Emergency": "112"
        }
    )