import { useState } from "react";

const THEMES = [
  { value: "feature_based", label: "Feature Based", desc: "Balanced streets with clean hierarchy" },
  { value: "noir", label: "Noir", desc: "Dark, high-contrast classic poster style" },
  { value: "blueprint", label: "Blueprint", desc: "Technical blueprint aesthetic" },
  { value: "sunset", label: "Sunset", desc: "Warm golden hour tones" },
  { value: "midnight_blue", label: "Midnight Blue", desc: "Luxury atlas dark blue style" },
  { value: "autumn", label: "Autumn", desc: "Burnt orange and warm fall colors" },
  { value: "contrast_zones", label: "Contrast Zones", desc: "Strong urban density contrast" },
  { value: "gradient_roads", label: "Gradient Roads", desc: "Smooth radial gradients" },
  { value: "neon_cyberpunk", label: "Neon Cyberpunk", desc: "Electric pink and cyan night city" },
];

const DISTANCES = [
  { value: 4000, label: "4 km (Compact)" },
  { value: 5000, label: "5 km (Balanced)" },
];

const API = "https://map-posters.onrender.com";

export default function PosterForm({ setImageUrl, setLoading, loading }) {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [theme, setTheme] = useState("feature_based");
  const [distance, setDistance] = useState(5000);

  const activeTheme = THEMES.find(t => t.value === theme);

  async function handleGenerate() {
    if (!city || !country || loading) return;

    setLoading(true);
    setImageUrl(null);

    try {
      const res = await fetch(
        `${API}/generate?city=${encodeURIComponent(city)}&country=${encodeURIComponent(
          country
        )}&theme=${theme}&dist=${distance}`
      );

      const data = await res.json();
      setImageUrl(data.image_url);
    } catch (err) {
      alert("Failed to generate poster. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="space-y-4">
        <div>
          <label className="text-xs text-gray-400">City</label>
          <input
            className="w-full mt-1 bg-black/80 border border-gray-700 rounded-md px-3 py-2 text-sm"
            value={city}
            onChange={e => setCity(e.target.value)}
            disabled={loading}
          />
        </div>

        <div>
          <label className="text-xs text-gray-400">Country</label>
          <input
            className="w-full mt-1 bg-black/80 border border-gray-700 rounded-md px-3 py-2 text-sm"
            value={country}
            onChange={e => setCountry(e.target.value)}
            disabled={loading}
          />
        </div>

        <div>
          <label className="text-xs text-gray-400">Map Radius</label>
          <select
            className="w-full mt-1 bg-black/80 border border-gray-700 rounded-md px-3 py-2 text-sm"
            value={distance}
            onChange={e => setDistance(Number(e.target.value))}
            disabled={loading}
          >
            {DISTANCES.map(d => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs text-gray-400">Theme</label>
          <select
            className="w-full mt-1 bg-black/80 border border-gray-700 rounded-md px-3 py-2 text-sm"
            value={theme}
            onChange={e => setTheme(e.target.value)}
            disabled={loading}
          >
            {THEMES.map(t => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>

          {activeTheme && (
            <p className="mt-1 text-xs text-gray-500">
              {activeTheme.desc}
            </p>
          )}
        </div>
      </div>

      <div className="mt-auto pt-5">
        <button
          onClick={handleGenerate}
          disabled={loading}
          className={`w-full py-2.5 rounded-md text-sm font-medium transition
            ${
              loading
                ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                : "bg-indigo-500/10 border border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/20"
            }`}
        >
          {loading ? "Generating…" : "Generate Poster"}
        </button>
      </div>
    </div>
  );
}