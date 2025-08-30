from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import sensor, query, recommendations, weather

app = FastAPI(title="Smart Farming Assistant API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(sensor.router, prefix="/sensor-data", tags=["Sensor"])
app.include_router(query.router, prefix="/query", tags=["Query"])
app.include_router(recommendations.router, prefix="/recommendations", tags=["Recommendations"])
app.include_router(weather.router, prefix="/weather", tags=["Weather"])

@app.get("/")
async def main():
    return {"message": "Hello World"}

@app.get("/health")
async def health_check():
    return {"status": "Backend is running..."}