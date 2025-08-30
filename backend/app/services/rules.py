def generate_recommendations(sensor_data: dict, weather_data: dict) -> list:
    recs = []

    moisture = sensor_data.get("moisture")
    pH = sensor_data.get("pH")
    temp = sensor_data.get("temperature")
    humidity = sensor_data.get("humidity")
    rain_desc = weather_data.get("weather", [{}])[0].get("description", "").lower()

    # Rule 1: Irrigation
    if moisture < 20 and "rain" not in rain_desc:
        recs.append({
            "action": "Irrigate within 12 hours",
            "reason": f"Soil moisture is {moisture}%, and no rain is expected."
        })

    # Rule 2: Lime treatment
    if pH < 5.5:
        recs.append({
            "action": "Apply lime treatment",
            "reason": f"Soil pH is {pH}, which is too acidic for most crops."
        })

    # Rule 3: Shade or cooling
    if temp > 35:
        recs.append({
            "action": "Provide shade or cooling",
            "reason": f"Temperature is {temp}°C, which may stress crops."
        })

    return recs
