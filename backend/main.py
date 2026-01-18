from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from poster_generator import generate_map_poster
import os

# ---------- APP ----------
app = FastAPI()

# ---------- CORS ----------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- STATIC FILES ----------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
POSTERS_DIR = os.path.join(BASE_DIR, "posters")

os.makedirs(POSTERS_DIR, exist_ok=True)

app.mount("/posters", StaticFiles(directory=POSTERS_DIR), name="posters")

# ---------- ROUTES ----------
@app.get("/generate")
def generate(
    city: str = Query(...),
    country: str = Query(...),
    theme: str = Query("feature_based")
):
    image_path = generate_map_poster(city, country, theme)

    filename = os.path.basename(image_path)

    return {
        "image_url": f"http://127.0.0.1:8000/posters/{filename}"
    }