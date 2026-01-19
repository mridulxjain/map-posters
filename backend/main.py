import os
from fastapi import FastAPI, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from poster_generator import generate_map_poster
from cleanup import cleanup_old_posters


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://beautymap.vercel.app",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


BASE_URL = "https://map-posters.onrender.com"

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
POSTERS_DIR = os.path.join(BASE_DIR, "posters")

os.makedirs(POSTERS_DIR, exist_ok=True)


app.mount("/posters", StaticFiles(directory=POSTERS_DIR), name="posters")



@app.options("/{path:path}")
def preflight(path: str):
    return {}



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

    if background_tasks:
        background_tasks.add_task(cleanup_old_posters, POSTERS_DIR)

    return {
        "image_url": f"{BASE_URL}/posters/{filename}"
    }

@app.get("/")
def health():
    return {"status": "ok"}