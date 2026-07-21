from config import llm
from prompts.risk_prompt import risk_prompt

def assess_risk(incident):

    prompt = risk_prompt.format(
        incident=incident
    )

    response = llm.invoke(prompt)

    return response.content