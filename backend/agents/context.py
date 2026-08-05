"""
Context Helper Functions

Provides helper functions for extracting categories
and formatting memory for AI agent prompts.
"""

import re


def extract_category(classification_text):
    """
    Extracts the incident category from the classification output.
    Example:
    Category: Fire -> Fire
    """

    if not classification_text:
        return "Other"

    match = re.search(
        r"Category:\s*(.*)",
        classification_text,
        re.IGNORECASE
    )

    if match:
        return match.group(1).strip()

    return "Other"


def format_session_memory(entries):
    """
    Formats short-term memory for the Decision Agent.
    """

    if not entries:
        return "No previous incidents in this session."

    lines = [
        f"- {entry.get('incident', '')}"
        for entry in entries
    ]

    return "\n".join(lines)


def format_similar_incidents(entries):
    """
    Formats long-term memory for the Decision Agent.
    """

    if not entries:
        return "No similar incidents found."

    lines = [
        f"- {entry.get('incident', '')} "
        f"(Category: {entry.get('category', 'Unknown')})"
        for entry in entries
    ]

    return "\n".join(lines)