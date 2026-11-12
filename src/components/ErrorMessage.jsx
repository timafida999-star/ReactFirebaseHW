export default function ErrorMessage({ error, onRetry }) {
  return (
    <div className="message message--error">
      <h3>Game over</h3>
      <p>{error?.message || 'Something went wrong'}</p>
      {onRetry && (
        <button className="btn" onClick={onRetry}>
          Continue?
        </button>
      )}
    </div>
  );
}
