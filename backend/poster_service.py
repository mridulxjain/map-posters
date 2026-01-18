import os

def generate_poster(city: str):
    os.makedirs("posters", exist_ok=True)

    filename = city.replace(" ", "_") + ".txt"
    path = os.path.join("posters", filename)

    with open(path, "w") as f:
        f.write(f"Poster generated for {city}")

    return path