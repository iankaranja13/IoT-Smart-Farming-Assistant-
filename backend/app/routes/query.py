from fastapi import APIRouter, Body

router = APIRouter()

@router.get("/")
async def get_query():
    return {
        "message": "Sample query"
    }