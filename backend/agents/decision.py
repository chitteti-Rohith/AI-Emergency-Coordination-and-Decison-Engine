from config import llm
from prompts.decision_prompt import decision_prompt

def make_decision(incident):

    prompt = decision_prompt.format(
        incident=incident
    )

    response = llm.invoke(prompt)

    return response.content