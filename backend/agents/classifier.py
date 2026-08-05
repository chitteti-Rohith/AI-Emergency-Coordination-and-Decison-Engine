"""
Classification Agent

Receives the incident and classifies the emergency.
The output is used by the Risk and Decision Agents.
"""

from config import llm
from prompts.classify_prompt import classification_prompt


def classify_incident(incident):
    prompt = classification_prompt.format(
        incident=incident
    )

    response = llm.invoke(prompt)

    return response.content