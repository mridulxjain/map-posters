export default function PosterPreview({ imageUrl, loading }) {
  return (
    <div className="border border-dashed border-gray-700 rounded-lg flex items-center justify-center bg-black/40 min-h-80 transition-all">

      {/* LOADING */}
      {loading && (
        <div className="text-sm text-indigo-300 animate-pulse text-center">
          Generating your poster...
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && !imageUrl && (
        <div className="text-sm text-gray-500 text-center px-6">
          Your poster preview will appear here
        </div>
      )}

      {/* RESULT */}
      {!loading && imageUrl && (
        <img
          src={`${imageUrl}?t=${Date.now()}`}
          alt="Generated Poster"
          className="max-h-105 rounded-md shadow-lg transition-opacity duration-300"
        />
      )}
    </div>
  );
}