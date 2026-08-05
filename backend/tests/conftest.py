"""
Test Configuration

Sets a temporary GROQ_API_KEY so the application
can be imported during testing.
"""

import os

os.environ.setdefault(
    "GROQ_API_KEY",
    "test-key-not-used-for-real-calls"
)