from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import sensor

app = FastAPI(title="Smart Farming Assistant API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(sensor.router, prefix="/sensor-data", tags=["Sensor"])


@app.get("/")
async def main():
    return {"message": "Hello World"}

@app.get("/health")
async def health_check():
    return {"status": "Backend is running..."}