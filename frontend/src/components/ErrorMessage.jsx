/**
 * Displays an error message.
 * Returns nothing if there is no error.
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