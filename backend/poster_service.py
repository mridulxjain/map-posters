import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
POSTERS_DIR = os.path.join(BASE_DIR, "posters")


def generate_poster(city: str):
    os.makedirs(POSTERS_DIR, exist_ok=True)

    filename = city.replace(" ", "_") + ".txt"
    path = os.path.join(POSTERS_DIR, filename)

    with open(path, "w") as f:
        f.write(f"Poster generated for {city}")

    return path