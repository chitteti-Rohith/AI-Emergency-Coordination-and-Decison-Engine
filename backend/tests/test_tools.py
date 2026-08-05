"""
Tests for Enterprise Tools.

Run:
    python -m pytest tests/ -v
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from tools.emergency_contacts import get_emergency_contacts
from tools.hospital_tool import get_nearest_hospital
from tools.weather_tool import get_weather
from tools.location_tool import get_location_details


def test_fire_contacts():
    contacts = get_emergency_contacts("Fire")

    assert contacts["Fire Department"] == "101"
    assert contacts["National Emergency"] == "112"


def test_unknown_category_returns_default():
    contacts = get_emergency_contacts("Unknown")

    assert contacts == {
        "National Emergency": "112"
    }


def test_hospital_tool():
    hospital = get_nearest_hospital()

    assert "Hospital" in hospital
    assert "Ambulance" in hospital


def test_weather_tool():
    weather = get_weather()

    assert "Temperature" in weather
    assert "Condition" in weather
    assert "Wind Speed" in weather


def test_location_tool():
    location = get_location_details()

    assert "Location" in location
    assert "Latitude" in location
    assert "Longitude" in location