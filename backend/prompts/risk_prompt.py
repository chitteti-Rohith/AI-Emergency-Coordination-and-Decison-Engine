from langchain_core.prompts import PromptTemplate

risk_prompt = PromptTemplate(
    input_variables=["incident"],
    template="""
You are an Emergency Risk Assessment Expert.

Analyze the following emergency.

Provide the response exactly in this format:

Risk Level:
<Low / Medium / High / Critical>

Possible Impact:
<Explain the possible impact>

Reason:
<Why did you assign this risk level?>


Incident:
{incident}

Provide the output in this format:
FOR Example:

Risk Level:
Critical

Possible Impact:
- Fire may spread rapidly
- Smoke inhalation risk
- Electrical damage
- Building power failure

Reason:
- Electrical room contains high-voltage equipment.
- Smoke indicates possible short circuit.

"""
)