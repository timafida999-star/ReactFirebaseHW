import { Link } from 'react-router';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice } from '../data/options';
import GameCover from './GameCover';

export default function GameCard({ game }) {
  const { wishlist, toggleWishlist } = useWishlist();
  const inWishlist = wishlist.includes(game.id);

  return (
    <article className="card">
      <Link to={`/games/${game.id}`} className="card__link">
        <GameCover game={game} />
        <div className="card__body">
          <span className="card__genre">{game.genre}</span>
          <h3>{game.title}</h3>
          <p className="card__dev">{game.developer}</p>
          <div className="card__row">
            <span className="tag">{game.rating ? `★ ${game.rating}` : '—'}</span>
            <span className="tag">{game.releaseYear}</span>
            <span className="card__price">{formatPrice(game.price)}</span>
          </div>
        </div>
      </Link>
      <button
        className={inWishlist ? 'heart heart--on' : 'heart'}
        onClick={() => toggleWishlist(game.id)}
        title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
      >
        {inWishlist ? '♥' : '♡'}
      </button>
    </article>
  );
}
