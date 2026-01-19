import os
from fastapi import FastAPI
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
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_URL = "https://map-posters.onrender.com"

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
POSTERS_DIR = os.path.join(BASE_DIR, "posters")
os.makedirs(POSTERS_DIR, exist_ok=True)

app.mount("/posters", StaticFiles(directory=POSTERS_DIR), name="posters")


@app.get("/")
def health():
    return {"status": "ok"}


@app.get("/generate")
def generate(
    city: str,
    country: str,
    theme: str = "feature_based",
    dist: int = 5000,
):
    # HARD safety limits for Render
    dist = min(dist, 5000)

    print("STARTING GENERATION")

    image_path = generate_map_poster(
        city=city,
        country=country,
        theme_name=theme,
        dist=dist,
    )

    filename = os.path.basename(image_path)

    cleanup_old_posters(POSTERS_DIR)

    print("GENERATION DONE")

    return {
        "image_url": f"{BASE_URL}/posters/{filename}"
    }