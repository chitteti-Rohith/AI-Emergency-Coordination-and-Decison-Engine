def get_location_details(location=None):
    """
    Returns location details.
    (Currently uses sample data. Can be connected to Google Maps/OpenStreetMap later.)
    """

    details = {
        "Location": location if location else "Unknown",
        "Latitude": "13.6288",
        "Longitude": "79.4192",
        "Nearest Landmark": "City Center"
    }

    return details