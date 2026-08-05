import requests


def get_location_details(latitude=None, longitude=None):
    """
    Reverse geocoding using OpenStreetMap Nominatim API.
    """

    if latitude is None or longitude is None:
        latitude = 13.6288
        longitude = 80.0280

    url = (
        f"https://nominatim.openstreetmap.org/reverse"
        f"?lat={latitude}&lon={longitude}&format=json"
    )

    headers = {
        "User-Agent": "AI-Emergency-Coordination-System"
    }

    try:
        response = requests.get(url, headers=headers, timeout=10)
        data = response.json()

        address = data.get("address", {})

        landmark = (
            address.get("road")
            or address.get("suburb")
            or address.get("village")
            or address.get("town")
            or address.get("city")
            or address.get("county")
            or "Unknown"
        )

        return {
            "Location": data.get("display_name", "Unknown"),
            "Latitude": str(latitude),
            "Longitude": str(longitude),
            "Nearest Landmark": landmark
        }

    except Exception:

        return {
            "Location": "Unknown",
            "Latitude": str(latitude),
            "Longitude": str(longitude),
            "Nearest Landmark": "Unknown"
        }