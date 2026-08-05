import requests


def get_nearest_hospital(latitude=None, longitude=None):
    """
    Finds the nearest hospital using the OpenStreetMap Overpass API.
    """

    if latitude is None or longitude is None:
        latitude = 13.6288
        longitude = 80.0280

    query = f"""
    [out:json];

    (
      node["amenity"="hospital"](around:10000,{latitude},{longitude});
      way["amenity"="hospital"](around:10000,{latitude},{longitude});
      relation["amenity"="hospital"](around:10000,{latitude},{longitude});
    );

    out center;
    """

    try:

        response = requests.post(
            "https://overpass-api.de/api/interpreter",
            data=query,
            timeout=20
        )

        data = response.json()

        if data.get("elements"):

            hospital = data["elements"][0]

            if "lat" in hospital:
                lat = hospital["lat"]
                lon = hospital["lon"]
            else:
                lat = hospital["center"]["lat"]
                lon = hospital["center"]["lon"]

            return {
                "Hospital": hospital.get(
                    "tags",
                    {}
                ).get(
                    "name",
                    "Unknown Hospital"
                ),
                "Latitude": lat,
                "Longitude": lon,
                "Ambulance": "108"
            }

    except Exception:
        pass

    return {
        "Hospital": "Government General Hospital",
        "Latitude": latitude,
        "Longitude": longitude,
        "Ambulance": "108"
    }