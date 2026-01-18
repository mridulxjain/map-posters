export default function PosterPreview({ imageUrl, loading }) {
  return (
    <div className="border border-dashed border-gray-700 rounded-lg flex items-center justify-center bg-black/40">
      {loading && (
        <div className="text-sm text-gray-200 animate-pulse">
          Generating poster...
        </div>
      )}

      {!loading && !imageUrl && (
        <div className="text-sm text-gray-500 text-center px-6">
          Your poster preview will appear here
        </div>
      )}

      {!loading && imageUrl && (
        <img
          src={imageUrl}
          alt="Generated Poster"
          className="max-h-105 rounded-md shadow-lg"
        />
      )}
    </div>
  );
}