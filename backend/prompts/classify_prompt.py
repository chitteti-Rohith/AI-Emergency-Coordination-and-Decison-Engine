from langchain_core.prompts import PromptTemplate

classification_prompt = PromptTemplate(
    input_variables=["incident"],
    template="""
You are an Emergency Classification AI.

Analyze the incident and identify:

1. Category
2. Incident Type
3. Severity

Choose one category:

- Fire
- Medical
- Gas Leak
- Road Accident
- Security Threat
- Natural Disaster
- Equipment Failure
- Other

Severity must be one of:

- Low
- Medium
- High
- Critical

Incident:
{incident}

Return the output exactly in this format:

Category: <category>

Incident Type: <incident type>

Severity: <severity>

Do not use markdown, bullet points, or additional explanations.
"""
)