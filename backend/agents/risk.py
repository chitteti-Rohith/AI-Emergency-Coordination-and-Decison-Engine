"""
Risk Assessment Agent

Analyzes the incident using:
- Incident
- Classification

The output is used by the Decision Agent.
"""

from config import llm
from prompts.risk_prompt import risk_prompt


def assess_risk(incident, classification=None):

    prompt = risk_prompt.format(
        incident=incident,
        classification=classification or "No classification available."
    )

    response = llm.invoke(prompt)

    return response.content