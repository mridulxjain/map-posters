export default function PosterPreview({
  imageUrl,
  loading,
  queuePosition,
  status,
}) {
  return (
    <div className="border border-dashed border-gray-700 rounded-lg flex items-center justify-center bg-black/40 min-h-80 transition-all">

      {status === "queued" && queuePosition !== null && queuePosition > 0 && (
        <div className="text-sm text-gray-200 text-center px-6">
          <div className="mb-2 text-gray-300">You are in queue</div>
          <div className="text-3xl font-semibold text-indigo-400">
            #{queuePosition}
          </div>
          <div className="mt-3 text-xs text-gray-500">
            Please wait, this usually takes under a minute
          </div>
        </div>
      )}


      {status === "processing" && (
        <div className="text-sm text-indigo-300 animate-pulse text-center">
          Generating your poster...
        </div>
      )}


      {loading && status === "idle" && (
        <div className="text-sm text-gray-400 animate-pulse">
          Preparing your request...
        </div>
      )}


      {!loading && status === "idle" && !imageUrl && (
        <div className="text-sm text-gray-500 text-center px-6">
          Your poster preview will appear here
        </div>
      )}

      {status === "done" && imageUrl && (
        <img
          src={`${imageUrl}?t=${Date.now()}`}
          alt="Generated Poster"
          className="max-h-105 rounded-md shadow-lg transition-opacity duration-300"
        />
      )}
    </div>
  );
}