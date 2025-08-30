from fastapi import APIRouter, Query
from app.services.weather_client import fetch_weather

router = APIRouter()

@router.get("/")
async def get_weather_data(city: str = Query(default="Nairobi")):
    data = await fetch_weather(city)
    return {
        "location": data["name"],
        "temperature": data["main"]["temp"],
        "humidity": data["main"]["humidity"],
        "weather": data["weather"][0]["description"],
        "wind_speed": data["wind"]["speed"]
    }
