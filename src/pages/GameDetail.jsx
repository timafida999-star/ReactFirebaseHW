import { Link, useLocation, useNavigate, useParams } from 'react-router';
import { useGame } from '../hooks/useGames';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice } from '../data/options';
import GameCover from '../components/GameCover';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

export default function GameDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, age } = useAuth();
  const { wishlist, toggleWishlist } = useWishlist();
  const { isPending, isError, data, error, refetch } = useGame(id);

  function goBack() {
    if (location.key === 'default') navigate('/games');
    else navigate(-1);
  }

  const links = (
    <div className="detail__links">
      <button className="btn btn--light" onClick={goBack}>
        ← Back
      </button>
      <Link to="/games" className="btn btn--light">
        All games
      </Link>
    </div>
  );

  if (isPending) {
    return (
      <>
        {links}
        <Loading text={`Loading game #${id}...`} />
      </>
    );
  }

  if (isError) {
    return (
      <>
        {links}
        {error.notFound ? (
          <div className="message message--error">
            <h3>Game not found</h3>
            <p>There is no game with id "{id}" in the library.</p>
          </div>
        ) : (
          <ErrorMessage error={error} onRetry={refetch} />
        )}
      </>
    );
  }

  const { game, similar } = data;
  const locked = game.ageRating > age;
  const inWishlist = wishlist.includes(game.id);

  const facts = [
    ['Genre', game.genre],
    ['Developer', game.developer],
    ['Platforms', game.platforms.join(', ')],
    ['Release year', game.releaseYear],
    ['Years on the market', new Date().getFullYear() - game.releaseYear],
    ['Mode', game.mode],
    ['Metascore', game.rating ? `${game.rating} / 100` : 'No score'],
    ['Price', formatPrice(game.price)],
    ['Age rating', `PEGI ${game.ageRating}`],
    ['Average playtime', `${game.playtime} hours`],
  ];

  return (
    <>
      {links}
      <article className="detail">
        <GameCover key={game.id} game={game} big />

        <div className="detail__info">
          <span className="card__genre">#{game.id}</span>
          <h1>{game.title}</h1>

          {locked ? (
            <p className="locked-note">
              This game is rated {game.ageRating}+. Your limit is {age}+.{' '}
              <Link to={user ? '/profile' : '/login'}>
                {user ? 'Change your age' : 'Log in to unlock it'}
              </Link>
            </p>
          ) : (
            <p className="detail__desc">{game.description}</p>
          )}

          <dl className="facts">
            {facts.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          <button className="btn" onClick={() => toggleWishlist(game.id)}>
            {inWishlist ? '♥ In wishlist' : '♡ Add to wishlist'}
          </button>
        </div>
      </article>

      {similar.length > 0 && (
        <section className="similar">
          <h2>More {game.genre} games</h2>
          <div className="similar__list">
            {similar.map((item) => (
              <Link key={item.id} to={`/games/${item.id}`} className="similar__item">
                <span className="similar__dot" style={{ backgroundColor: item.color }} />
                <span>{item.title}</span>
                <small>{item.rating ? `★ ${item.rating}` : '—'}</small>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
