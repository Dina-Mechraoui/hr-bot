export default function Status({ loading, error, retry }) {
  if (loading) {
    return (
      <div className="w-full text-center py-4">
        <p className="text-gray-600 animate-pulse">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full text-center py-4">
        <p className="text-red-500">{error}</p>
        {retry && (
          <button
            onClick={retry}
            className="mt-2 text-sm underline text-blue-600 hover:text-blue-800"
          >
            Try Again
          </button>
        )}
      </div>
    );
  }

  return null;
}
