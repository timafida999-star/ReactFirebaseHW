import { Link } from 'react-router';
import PixelIcon from '../components/PixelIcon';
import { GENRES } from '../data/options';

export default function About() {
  return (
    <div className="about">
      <h1>About</h1>
      <p>
        Save Point is my React project for the web development course. It is a library of famous
        indie games, from Braid (2008) to Balatro (2024). You can search and filter games, open a
        game page, keep a wishlist and look at statistics on the dashboard.
      </p>

      <section className="panel">
        <h2>Genres</h2>
        <div className="genre-list">
          {GENRES.map((genre) => (
            <Link key={genre} to={`/games?genre=${genre}`} className="genre-item">
              <PixelIcon genre={genre} size={40} />
              <span>{genre}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>Age ratings</h2>
        <p>
          Every game has its real PEGI age rating from 3 to 18. Guests can open games up to 12+.
          After login you choose your age group on your profile and the other games unlock. The dashboard and the
          "Add game" form are only for logged in players.
        </p>
      </section>

      <section className="panel">
        <h2>Built with</h2>
        <ul className="plain-list">
          <li>React 19 and Vite</li>
          <li>React Router: nested routes, useParams, useSearchParams, lazy pages</li>
          <li>Games come from public/api/games.json through fetch in services/service.js</li>
          <li>TanStack Query for cached server data with invalidation</li>
          <li>Firebase Authentication with email, password and Google</li>
          <li>localStorage for the wishlist, added games and your age group</li>
        </ul>
      </section>
    </div>
  );
}
