from config import llm
from prompts.classify_prompt import classification_prompt

def classify_incident(incident):

    prompt = classification_prompt.format(
        incident=incident
    )

    response = llm.invoke(prompt)

    return response.content