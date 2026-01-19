import os
import time
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from poster_generator import generate_map_poster
from cleanup import cleanup_old_posters
from queue_manager import (
    add_job,
    get_position,
    start_job,
    finish_job
)

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
def generate(city: str, country: str, theme: str = "feature_based", dist: int = 6000):
    job_id, position = add_job()

    return {
        "job_id": job_id,
        "queue_position": position
    }


@app.get("/queue-status")
def queue_status(job_id: str):
    return {
        "position": get_position(job_id)
    }



@app.get("/process")
def process(
    job_id: str,
    city: str,
    country: str,
    theme: str = "feature_based",
    dist: int = 6000
):
    active_job = start_job()


    if active_job != job_id:
        return {
            "status": "waiting",
            "position": get_position(job_id)
        }

    try:
        image_path = generate_map_poster(city, country, theme, dist)
        filename = os.path.basename(image_path)

        cleanup_old_posters(POSTERS_DIR)

        return {
            "status": "done",
            "image_url": f"{BASE_URL}/posters/{filename}"
        }

    finally:
        finish_job()