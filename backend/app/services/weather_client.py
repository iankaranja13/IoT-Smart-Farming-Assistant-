import httpx

from app.config import OPENWEATHER_API_KEY, OPENWEATHER_BASE_URL


async def fetch_weather(city: str = "Nairobi"):
    params = {
        "q": city,
        "appid": OPENWEATHER_API_KEY,
        "units": "metric"
    }
    async with httpx.AsyncClient() as client:
        response = await client.get(OPENWEATHER_BASE_URL, params=params)
        response.raise_for_status()
        return response.json()