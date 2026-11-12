import { Link, useSearchParams } from 'react-router';
import { useGames } from '../hooks/useGames';
import { useDebounce } from '../hooks/useDebounce';
import { useAuth } from '../context/AuthContext';
import Filters from '../components/Filters';
import GameCard from '../components/GameCard';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

export default function Games() {
  const [params, setParams] = useSearchParams();
  const { user } = useAuth();

  const values = {
    q: params.get('q') ?? '',
    genre: params.get('genre') ?? '',
    platform: params.get('platform') ?? '',
    mode: params.get('mode') ?? '',
    price: params.get('price') ?? '',
    sort: params.get('sort') ?? 'default',
    page: Number(params.get('page')) || 1,
  };
  const search = useDebounce(values.q);

  const { isPending, isError, data, error, refetch } = useGames({ ...values, q: search });

  function updateParam(name, value) {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        if (value && value !== 'default') next.set(name, value);
        else next.delete(name);
        if (name !== 'page') next.delete('page');
        return next;
      },
      { replace: name === 'q' },
    );
  }

  function changePage(page) {
    updateParam('page', page === 1 ? '' : String(page));
    window.scrollTo(0, 0);
  }

  const loading = isPending || search !== values.q;

  return (
    <div>
      <div className="page-head">
        <h1>Games</h1>
        {user && (
          <Link to="/games/new" className="btn">
            + Add game
          </Link>
        )}
      </div>

      <Filters values={values} onChange={updateParam} onReset={() => setParams({})} />

      {loading && <Loading text="Loading games..." />}
      {!loading && isError && <ErrorMessage error={error} onRetry={refetch} />}
      {!loading && data && data.total === 0 && (
        <div className="message">
          <h3>No games found</h3>
          <p>Try another search or remove some filters.</p>
          <button className="btn btn--light" onClick={() => setParams({})}>
            Clear filters
          </button>
        </div>
      )}
      {!loading && data && data.total > 0 && (
        <>
          <p className="result-count">
            {data.total} games · page {data.page} of {data.pages}
          </p>
          <div className="grid">
            {data.items.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
          <Pagination page={data.page} pages={data.pages} onChange={changePage} />
        </>
      )}
    </div>
  );
}
