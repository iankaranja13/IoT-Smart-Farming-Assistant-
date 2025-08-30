from fastapi import APIRouter
import random

router = APIRouter()

@router.get("/")
async def get_sensor_data():
    return {
        "moisture": random.randint(10, 40),
        "pH": round(random.uniform(4.5, 7.5), 1),
        "temperature": random.randint(20, 35),
        "humidity": random.randint(50, 90)
    }
