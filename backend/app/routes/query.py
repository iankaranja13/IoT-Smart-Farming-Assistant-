from fastapi import APIRouter, Body
from app.services.ai_client import ask_inflection
from app.routes.recommendations import simulate_sensor_data
from app.services.weather_client import fetch_weather
from app.services.rules import generate_recommendations

router = APIRouter()

@router.post("/")
async def query_chatbot(
    question: str = Body(..., embed=True),
):
    sensor_data = simulate_sensor_data()
    weather_data = await fetch_weather("Nairobi")
    recommendations = generate_recommendations(sensor_data, weather_data)
    
    context = {
        "sensor_data": sensor_data,
        "weather": weather_data["weather"][0]["description"],
        "recommendations": recommendations
    }


    response = await ask_inflection(question, context)
    return {"response": response}