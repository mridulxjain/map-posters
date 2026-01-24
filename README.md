# Map Poster Generator

A minimal web application that generates beautiful, poster-style city maps using OpenStreetMap data.  
Users can select a city, country, distance, and visual theme to create a unique map poster rendered in real time.


---

## What It Does

- Generates artistic city map posters based on real map data  
- Supports multiple visual themes inspired by modern map art styles  
- Displays city and country names directly on the poster  
- Allows users to control map density via distance selection  
- Renders posters dynamically and previews them instantly in the browser  

---

## How It Works

1. User enters city, country, theme, and distance
2. Backend fetches geospatial data from OpenStreetMap
3. Roads are styled by hierarchy and theme colors
4. A poster image is rendered using Matplotlib
5. The generated image is served back and displayed in the UI

---

## Use Cases

- Wall-art style city posters
- Personalized travel memorabilia
- Design and typography experiments
- Learning project for maps, rendering, and APIs

---

## Tech Stack

**Frontend**
- React
- Tailwind CSS

**Backend**
- FastAPI
- OSMnx
- Matplotlib
- OpenStreetMap data


---

## Credits

This project is inspired by and builds upon ideas from the open-source project  
[maptoposter](https://github.com/originalankur/maptoposter) by originalankur.

All map data © OpenStreetMap contributors.

---

## Author

Made with love by **Mridul Jain**  
