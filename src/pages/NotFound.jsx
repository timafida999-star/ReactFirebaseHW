import { Link, useLocation } from 'react-router';

export default function NotFound() {
  const { pathname } = useLocation();

  return (
    <div className="not-found">
      <p className="not-found__code">404</p>
      <h1>Game over</h1>
      <p>
        The page <code>{pathname}</code> does not exist. Maybe it is a secret level that nobody has
        made yet.
      </p>
      <Link to="/" className="btn">
        Back to Home
      </Link>
    </div>
  );
}
