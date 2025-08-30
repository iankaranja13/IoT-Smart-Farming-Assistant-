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
    

    # Build a richer weather context
    weather_context = {
        "description": weather_data["weather"][0]["description"],
        "temperature": weather_data["main"]["temp"],
        "humidity": weather_data["main"]["humidity"],
        "wind_speed": weather_data["wind"]["speed"],
        "cloud_coverage": weather_data["clouds"]["all"],
        "pressure": weather_data["main"]["pressure"],
        "sunrise": weather_data["sys"]["sunrise"],
        "sunset": weather_data["sys"]["sunset"],
        "city": weather_data["name"],
        "country": weather_data["sys"]["country"]
    }

    context = {
        "sensor_data": sensor_data,
        "weather": weather_context,
        "recommendations": recommendations
    }


    response = await ask_inflection(question, context)
    return {"response": response}