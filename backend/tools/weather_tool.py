def get_weather(location=None):
    """
    Returns current weather information.
    (Sample data - can be replaced with a real weather API later.)
    """

    weather = {
        "Location": location if location else "Unknown",
        "Temperature": "34°C",
        "Condition": "Sunny",
        "Wind Speed": "12 km/h"
    }

    return weather