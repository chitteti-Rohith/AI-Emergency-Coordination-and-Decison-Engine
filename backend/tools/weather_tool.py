import requests

WEATHER_CODES = {
    0: "Clear Sky",
    1: "Mainly Clear",
    2: "Partly Cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing Fog",
    51: "Light Drizzle",
    53: "Moderate Drizzle",
    55: "Dense Drizzle",
    61: "Light Rain",
    63: "Moderate Rain",
    65: "Heavy Rain",
    71: "Light Snow",
    73: "Moderate Snow",
    75: "Heavy Snow",
    80: "Rain Showers",
    81: "Heavy Rain Showers",
    82: "Violent Rain Showers",
    95: "Thunderstorm",
    96: "Thunderstorm with Hail",
    99: "Severe Thunderstorm with Hail"
}


def get_weather(latitude=None, longitude=None):
    """
    Returns live weather using Open-Meteo API.
    """

    if latitude is None or longitude is None:
        latitude = 13.6288
        longitude = 80.0280

    url = (
        "https://api.open-meteo.com/v1/forecast"
        f"?latitude={latitude}"
        f"&longitude={longitude}"
        "&current_weather=true"
    )

    try:

        response = requests.get(url, timeout=10)
        current = response.json()["current_weather"]

        return {
            "Temperature": f"{current['temperature']}°C",
            "Condition": WEATHER_CODES.get(
                current["weathercode"],
                "Unknown"
            ),
            "Wind Speed": f"{current['windspeed']} km/h"
        }

    except Exception:

        return {
            "Temperature": "Unknown",
            "Condition": "Unknown",
            "Wind Speed": "Unknown"
        }