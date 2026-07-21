/**
 * ErrorMessage — shows the backend's error text (e.g. from Flask's
 * {"error": "..."} responses) in a visually distinct, obvious way.
 * Returns null (renders nothing) when there's no error, so Dashboard
 * can always include <ErrorMessage message={error} /> in its JSX
 * without wrapping it in its own if-check every time.
 */
function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <div className="error-banner" role="alert">
      ⚠️ {message}
    </div>
  );
}

export default ErrorMessage;
