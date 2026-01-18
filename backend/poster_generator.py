import os
import json
import time
import matplotlib
matplotlib.use("Agg")

import osmnx as ox
import matplotlib.pyplot as plt
from datetime import datetime
from geopy.geocoders import Nominatim
from matplotlib.font_manager import FontProperties



BASE_DIR = os.path.dirname(os.path.abspath(__file__))

THEMES_DIR = os.path.join(BASE_DIR, "themes")
POSTERS_DIR = os.path.join(BASE_DIR, "posters")

os.makedirs(POSTERS_DIR, exist_ok=True)

THEME = None



def get_available_themes():
    return [
        f.replace(".json", "")
        for f in os.listdir(THEMES_DIR)
        if f.endswith(".json")
    ]


def load_theme(theme_name):
    path = os.path.join(THEMES_DIR, f"{theme_name}.json")

    if not os.path.exists(path):
        raise ValueError(f"Theme '{theme_name}' not found")

    with open(path, "r") as f:
        return json.load(f)



def generate_output_filename(city, theme):
    ts = datetime.now().strftime("%Y%m%d_%H%M%S")
    city_slug = city.lower().replace(" ", "_")
    return os.path.join(POSTERS_DIR, f"{city_slug}_{theme}_{ts}.png")


def get_coordinates(city, country):
    geolocator = Nominatim(user_agent="maptoposters/1.0")
    time.sleep(0.5)

    location = geolocator.geocode(f"{city}, {country}")

    if not location:
        raise ValueError("City not found")

    return (location.latitude, location.longitude)


def get_edge_colors(G):
    colors = []

    for _, _, data in G.edges(data=True):
        hw = data.get("highway", "unclassified")
        if isinstance(hw, list):
            hw = hw[0]

        if hw in ["motorway", "motorway_link"]:
            colors.append(THEME["road_motorway"])
        elif hw in ["primary", "primary_link", "trunk"]:
            colors.append(THEME["road_primary"])
        elif hw in ["secondary"]:
            colors.append(THEME["road_secondary"])
        elif hw in ["tertiary"]:
            colors.append(THEME["road_tertiary"])
        elif hw in ["residential"]:
            colors.append(THEME["road_residential"])
        else:
            colors.append(THEME["road_default"])

    return colors


def get_edge_widths(G):
    widths = []

    for _, _, data in G.edges(data=True):
        hw = data.get("highway", "")
        if isinstance(hw, list):
            hw = hw[0]

        if hw == "motorway":
            widths.append(1.2)
        elif hw == "primary":
            widths.append(1.0)
        elif hw == "secondary":
            widths.append(0.8)
        else:
            widths.append(0.5)

    return widths



def generate_map_poster(city, country, theme_name="feature_based", dist=6000):
    global THEME

    try:
        THEME = load_theme(theme_name)
    except Exception:
        THEME = load_theme("feature_based")

    point = get_coordinates(city, country)
    output_path = generate_output_filename(city, theme_name)

    G = ox.graph_from_point(point, dist=dist, network_type="all")

    fig, ax = plt.subplots(figsize=(12, 16), facecolor=THEME["bg"])
    ax.set_facecolor(THEME["bg"])
    ax.axis("off")

    ox.plot_graph(
        G,
        ax=ax,
        node_size=0,
        edge_color=get_edge_colors(G),
        edge_linewidth=get_edge_widths(G),
        show=False,
        close=False,
        bgcolor=THEME["bg"],
    )



    font_city = FontProperties(weight="bold", size=48)
    font_country = FontProperties(size=24)

    ax.text(
        0.5,
        0.12,
        "  ".join(city.upper()),
        transform=ax.transAxes,
        ha="center",
        color=THEME["text"],
        fontproperties=font_city,
    )

    ax.text(
        0.5,
        0.08,
        country.upper(),
        transform=ax.transAxes,
        ha="center",
        color=THEME["text"],
        fontproperties=font_country,
    )

    plt.savefig(
        output_path,
        dpi=180,
        bbox_inches="tight",
        facecolor=THEME["bg"],
    )
    plt.close()

    return output_path