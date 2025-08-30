from fastapi import APIRouter, Body
from app.services.ai_client import ask_inflection

router = APIRouter()

@router.post("/")
async def query_chatbot(
    question: str = Body(..., embed=True),
    context: dict = Body(default={}, embed=True)
):
    response = await ask_inflection(question, context)
    return {"response": response}