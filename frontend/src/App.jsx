import { useState } from "react";
import PosterForm from "./components/PosterForm";
import PosterPreview from "./components/PosterPreview";
import "./App.css";

export default function App() {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-200 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl rounded-2xl border border-gray-700/40 bg-black/70 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">

        {/* Header */}
        <header className="px-6 py-5 border-b border-dashed border-gray-700/60">
          <h1 className="text-3xl tracking-wide">
            Map Poster Generator
          </h1>

          <p className="text-sm text-gray-400 mt-1">
            Create minimal city map posters with different visual themes.
          </p>

          <p className="mt-2 text-[11px] text-gray-500">
            Credits:{" "}
            <a
              href="https://github.com/originalankur/maptoposter"
              target="_blank"
              rel="noreferrer"
              className="text-white/80 underline hover:text-gray-300 transition"
            >
              maptoposter
            </a>
          </p>
        </header>

        {/* Content */}
        <div className="grid md:grid-cols-2 gap-6 p-6">
          <PosterForm
            setImageUrl={setImageUrl}
            setLoading={setLoading}
            loading={loading}
          />

          <PosterPreview
            imageUrl={imageUrl}
            loading={loading}
          />
        </div>

        {/* Footer */}
        <footer className="px-6 py-3 border-t border-dashed border-gray-700/40 text-[11px] text-gray-500 text-center">
          made with <span className="text-red-400/80">♥</span> by{" "}
          <a
            href="https://github.com/mridulxjain"
            target="_blank"
            rel="noreferrer"
            className="text-white underline hover:text-gray-200 transition"
          >
            mriduljain
          </a>
        </footer>

      </div>
    </div>
  );
}