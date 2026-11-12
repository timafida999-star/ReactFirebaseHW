export default function Pagination({ page, pages, onChange }) {
  if (pages <= 1) return null;
  const numbers = Array.from({ length: pages }, (_, i) => i + 1);

  return (
    <div className="pagination">
      <button disabled={page === 1} onClick={() => onChange(page - 1)}>
        Prev
      </button>
      {numbers.map((n) => (
        <button key={n} className={n === page ? 'active' : ''} onClick={() => onChange(n)}>
          {n}
        </button>
      ))}
      <button disabled={page === pages} onClick={() => onChange(page + 1)}>
        Next
      </button>
    </div>
  );
}
