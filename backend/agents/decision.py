"""
Decision Support Agent

Generates the final response using:
- Incident
- Classification
- Risk Assessment
- Short-Term Memory
- Long-Term Memory
"""

from config import llm
from prompts.decision_prompt import decision_prompt
from agents.context import (
    format_session_memory,
    format_similar_incidents
)


def make_decision(
    incident,
    classification=None,
    risk=None,
    session_memory=None,
    similar_incidents=None
):

    prompt = decision_prompt.format(
        incident=incident,
        classification=classification or "No classification available.",
        risk=risk or "No risk assessment available.",
        session_memory=format_session_memory(session_memory),
        similar_incidents=format_similar_incidents(similar_incidents)
    )

    response = llm.invoke(prompt)

    return response.content