from fastapi import APIRouter
from app.services.rules import generate_recommendations
from app.services.weather_client import fetch_weather
from app.services.ai_client import ask_inflection
import random
from datetime import datetime

router = APIRouter()

def simulate_sensor_data():
    return {
        "moisture": random.randint(10, 40),
        "pH": round(random.uniform(4.5, 7.5), 1),
        "temperature": random.randint(20, 35),
        "humidity": random.randint(50, 90)
    }

@router.get("/")
async def get_dashboard_data(city: str = "Nairobi"):
    sensor_data = simulate_sensor_data()
    weather_data = await fetch_weather(city)
    recommendations = generate_recommendations(sensor_data, weather_data)

    # Generate explanation for first recommendation
    explanation = None
    if recommendations:
        question = f"Why should I {recommendations[0]['action'].lower()}?"
        context = {
            "sensor_data": sensor_data,
            "weather": weather_data["weather"][0]["description"],
            "recommendation": recommendations[0]
        }
        explanation = await ask_inflection(question, context)

    return {
        "timestamp": datetime.now().isoformat(),
        "sensor_data": sensor_data,
        "weather": {
            "location": weather_data["name"],
            "description": weather_data["weather"][0]["description"],
            "temperature": weather_data["main"]["temp"],
            "humidity": weather_data["main"]["humidity"]
        },
        "recommendations": recommendations,
        "explanation": explanation
    }