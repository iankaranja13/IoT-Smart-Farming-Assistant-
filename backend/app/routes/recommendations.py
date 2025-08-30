from fastapi import APIRouter
from app.services.rules import generate_recommendations
from app.services.weather_client import fetch_weather
import random

router = APIRouter()

def simulate_sensor_data():
    return {
        "moisture": random.randint(10, 40),
        "pH": round(random.uniform(4.5, 7.5), 1),
        "temperature": random.randint(20, 35),
        "humidity": random.randint(50, 90)
    }

@router.get("/")
async def get_recommendations(city: str = "Nairobi"):
    sensor_data = simulate_sensor_data()
    weather_data = await fetch_weather(city)

    recs = generate_recommendations(sensor_data, weather_data)

    return {
        "sensor_data": sensor_data,
        "weather_data": {
            "location": weather_data["name"],
            "description": weather_data["weather"][0]["description"]
        },
        "recommendations": recs
    }
