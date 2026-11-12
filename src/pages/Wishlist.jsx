import { Link } from 'react-router';
import { useWishlistGames } from '../hooks/useGames';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice } from '../data/options';
import GameCard from '../components/GameCard';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

export default function Wishlist() {
  const { wishlist } = useWishlist();
  const { isPending, isError, data, error, refetch } = useWishlistGames(wishlist);

  const total = data ? data.reduce((sum, game) => sum + game.price, 0) : 0;

  return (
    <div>
      <div className="page-head">
        <h1>Wishlist</h1>
        {data && data.length > 0 && (
          <span className="tag tag--big">Total: {formatPrice(total)}</span>
        )}
      </div>

      {isPending && <Loading />}
      {isError && <ErrorMessage error={error} onRetry={refetch} />}
      {data && data.length === 0 && (
        <div className="message">
          <h3>Your wishlist is empty</h3>
          <p>Press ♡ on any game to save it here.</p>
          <Link to="/games" className="btn">
            Browse games
          </Link>
        </div>
      )}
      {data && data.length > 0 && (
        <div className="grid">
          {data.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
}
