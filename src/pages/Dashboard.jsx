import { useState } from 'react';
import { Link } from 'react-router';
import { useAllGames } from '../hooks/useGames';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { GENRES, PLATFORMS, MODES } from '../data/options';
import BarList from '../components/BarList';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

export default function Dashboard() {
  const { nickname } = useAuth();
  const { wishlist } = useWishlist();
  const [platform, setPlatform] = useState('');
  const { isPending, isError, data, error, refetch } = useAllGames();

  if (isPending) return <Loading text="Counting games..." />;
  if (isError) return <ErrorMessage error={error} onRetry={refetch} />;

  const games = platform ? data.filter((game) => game.platforms.includes(platform)) : data;
  const platformQuery = platform ? `&platform=${platform}` : '';

  const rated = games.filter((game) => game.rating);
  const avgRating = rated.length
    ? Math.round(rated.reduce((sum, game) => sum + game.rating, 0) / rated.length)
    : 0;
  const freeGames = games.filter((game) => game.price === 0).length;
  const multiplayer = games.filter((game) => game.mode !== 'Single player').length;

  const byGenre = GENRES.map((genre) => ({
    label: genre,
    count: games.filter((game) => game.genre === genre).length,
    to: `/games?genre=${genre}${platformQuery}`,
  })).sort((a, b) => b.count - a.count);

  const byMode = MODES.map((mode) => ({
    label: mode,
    count: games.filter((game) => game.mode === mode).length,
    to: `/games?mode=${mode}${platformQuery}`,
  }));

  const top = [...rated].sort((a, b) => b.rating - a.rating).slice(0, 5);

  return (
    <div>
      <div className="page-head">
        <h1>Dashboard</h1>
        <div className="switch">
          <button className={platform === '' ? 'active' : ''} onClick={() => setPlatform('')}>
            All
          </button>
          {PLATFORMS.map((p) => (
            <button
              key={p}
              className={platform === p ? 'active' : ''}
              onClick={() => setPlatform(p)}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      <p className="muted">Player: {nickname}</p>

      <div className="stats">
        <div className="stat stat--pink">
          <strong>{games.length}</strong>
          <span>games</span>
        </div>
        <div className="stat stat--yellow">
          <strong>{avgRating}</strong>
          <span>average Metascore</span>
        </div>
        <div className="stat stat--cyan">
          <strong>{freeGames}</strong>
          <span>free to play</span>
        </div>
        <div className="stat stat--green">
          <strong>{multiplayer}</strong>
          <span>co-op or online</span>
        </div>
        <Link to="/wishlist" className="stat stat--purple">
          <strong>{wishlist.length}</strong>
          <span>in your wishlist →</span>
        </Link>
      </div>

      <div className="dash-grid">
        <BarList title="By genre" rows={byGenre} />
        <div>
          <BarList title="By mode" rows={byMode} />
          <section className="panel">
            <h2>Top 5</h2>
            <ol className="top">
              {top.map((game) => (
                <li key={game.id}>
                  <Link to={`/games/${game.id}`}>{game.title}</Link>
                  <span className="tag">★ {game.rating}</span>
                </li>
              ))}
            </ol>
            <Link to={`/games?sort=rating-desc${platformQuery}`}>See full ranking →</Link>
          </section>
        </div>
      </div>
    </div>
  );
}
