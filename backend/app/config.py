import os
from dotenv import load_dotenv

load_dotenv()

# OpenWeatherMap API
OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")
OPENWEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

# Inflection AI
INFLECTION_API_KEY = os.getenv("INFLECTION_API_KEY")
INFLECTION_API_URL = "https://api.inflection.ai/v1/chat/completions"

