import httpx
from app.config import INFLECTION_API_KEY, INFLECTION_API_URL

async def ask_inflection(question: str, context: dict = {}) -> str:
    messages = [
        {"role": "system", "content": "You are a helpful farming assistant that explains recommendations clearly."},
        {"role": "user", "content": f"{question}\n\nContext: {context}"}
    ]

    payload = {
        "model": "Pi-3.1",
        "messages": messages
    }

    headers = {
        "Authorization": f"Bearer {INFLECTION_API_KEY}",
        "Content-Type": "application/json"
    }

    async with httpx.AsyncClient(timeout=30.0) as client:
        response = await client.post(INFLECTION_API_URL, json=payload, headers=headers)
        response.raise_for_status()
        data = response.json()
        
        # Correctly parse the response
        try:
            return data["choices"][0]["message"]["content"]
        except (KeyError, IndexError):
            return "Sorry, I couldn't generate a response."
    