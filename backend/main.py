from fastapi import FastAPI, Query
from fastapi import BackgroundTasks
from cleanup import cleanup_old_posters
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from poster_generator import generate_map_poster
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://beautymap.vercel.app",
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_URL = os.getenv("BASE_URL", "http://127.0.0.1:8000")

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
POSTERS_DIR = os.path.join(BASE_DIR, "posters")

os.makedirs(POSTERS_DIR, exist_ok=True)

app.mount("/posters", StaticFiles(directory=POSTERS_DIR), name="posters")

@app.get("/generate")
def generate(
    city: str,
    country: str,
    theme: str = "feature_based",
    dist: int = 6000,
    background_tasks: BackgroundTasks = None,
):
    image_path = generate_map_poster(city, country, theme, dist)

    filename = os.path.basename(image_path)

    background_tasks.add_task(cleanup_old_posters, POSTERS_DIR)

    return {
        "image_url": f"{BASE_URL}/posters/{filename}"
    }