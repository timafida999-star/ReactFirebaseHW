import { Link } from 'react-router';

export default function BarList({ title, rows }) {
  const max = Math.max(1, ...rows.map((row) => row.count));

  return (
    <section className="panel">
      <h2>{title}</h2>
      <ul className="bars">
        {rows.map((row) => (
          <li key={row.label}>
            <Link to={row.to}>
              <span className="bars__label">{row.label}</span>
              <span className="bars__track">
                <span className="bars__fill" style={{ width: `${(row.count / max) * 100}%` }} />
              </span>
              <span className="bars__count">{row.count}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
