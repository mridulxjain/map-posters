import { useState } from "react";

const THEMES = [
  {
    value: "feature_based",
    label: "Feature Based",
    desc: "Balanced streets with clear hierarchy and clean contrast.",
  },
  {
    value: "noir",
    label: "Noir",
    desc: "Dark, high-contrast city maps inspired by classic posters.",
  },
  {
    value: "blueprint",
    label: "Blueprint",
    desc: "Technical blueprint-style layout with sharp lines.",
  },
  {
    value: "sunset",
    label: "Sunset",
    desc: "Warm oranges and pinks on soft peach - dreamy golden hour aesthetic",
  },
  {
    value: "midnight_blue",
    label: "Midnight Blue",
    desc: "Deep navy background with gold/copper roads - luxury atlas aesthetic",
  },
  {
    value: "autumn",
    label: "Autumn",
    desc: "Burnt oranges, deep reds, golden yellows - seasonal warmth",
  },
  {
    value: "contrast_zones",
    label: "Contrast Zones",
    desc: "Strong contrast showing urban density - darker in center, lighter at edges",
  },
  {
    value: "gradient_roads",
    label: "Gradient Roads",
    desc: "Smooth gradient from dark center to light edges with subtle features",
  },
  {
    value: "neon_cyberpunk",
    label: "Neon Cyberpunk",
    desc: "Dark background with electric pink/cyan - bold night city vibes",
  },
];

const DISTANCES = [
  { value: 6000, label: "6 km (Focused)" },
  { value: 8000, label: "8 km (Balanced)" },
  { value: 10000, label: "10 km (Wide)" },
];

export default function PosterForm({ setImageUrl, setLoading }) {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [theme, setTheme] = useState("feature_based");
  const [distance, setDistance] = useState(6000);
  const [submitting, setSubmitting] = useState(false);

  const activeTheme = THEMES.find((t) => t.value === theme);

  const handleGenerate = async () => {
    if (!city || !country || submitting) return;

    setSubmitting(true);
    setLoading(true);
    setImageUrl(null);

    try {
      const res = await fetch(
        `https://map-posters.onrender.com/generate?city=${encodeURIComponent(
          city
        )}&country=${encodeURIComponent(
          country
        )}&theme=${theme}&dist=${distance}`
      );

      const data = await res.json();
      setImageUrl(data.image_url);
    } catch {
      alert("Failed to generate poster");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="space-y-4">
        <div>
          <label className="text-xs text-gray-400">City</label>
          <input
            className="w-full mt-1 bg-black/80 border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 transition"
            placeholder="Paris"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        <div>
          <label className="text-xs text-gray-400">Country</label>
          <input
            className="w-full mt-1 bg-black/80 border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 transition"
            placeholder="France"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>

        <div>
          <label className="text-xs text-gray-400">Map Radius</label>
          <select
            className="w-full mt-1 bg-black/80 border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 transition"
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
          >
            {DISTANCES.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs text-gray-400">Theme</label>
          <select
            className="w-full mt-1 bg-black/80 border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-indigo-500 transition"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            {THEMES.map((t) => (
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
          disabled={submitting}
          className={`
            w-full py-2.5 rounded-md text-sm font-medium transition
            ${
              submitting
                ? "bg-gray-800 text-gray-500 cursor-not-allowed"
                : "bg-indigo-500/10 border border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/20"
            }
          `}
        >
          {submitting ? "Generating…" : "Generate Poster"}
        </button>
      </div>
    </div>
  );
}