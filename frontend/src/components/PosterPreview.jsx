export default function PosterPreview({
  imageUrl,
  loading,
  queuePosition,   // number | null
  status           // "idle" | "queued" | "processing" | "done"
}) {
  return (
    <div className="border border-dashed border-gray-700 rounded-lg flex items-center justify-center bg-black/40 min-h-80">

      {/* QUEUED */}
      {status === "queued" && queuePosition !== null && (
        <div className="text-sm text-gray-200 text-center px-6">
          <div className="mb-2">You are in queue</div>
          <div className="text-2xl font-semibold text-indigo-400">
            #{queuePosition}
          </div>
          <div className="mt-2 text-xs text-gray-400">
            Please wait, your poster will be generated shortly
          </div>
        </div>
      )}

      {/* PROCESSING */}
      {status === "processing" && (
        <div className="text-sm text-indigo-300 animate-pulse text-center">
          Generating your poster...
        </div>
      )}

      {/* IDLE */}
      {status === "idle" && !imageUrl && (
        <div className="text-sm text-gray-500 text-center px-6">
          Your poster preview will appear here
        </div>
      )}

      {/* DONE */}
      {status === "done" && imageUrl && (
        <img
          src={`${imageUrl}?t=${Date.now()}`}
          alt="Generated Poster"
          className="max-h-105 rounded-md shadow-lg"
        />
      )}
    </div>
  );
}