import { Link } from 'react-router';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user, nickname, age } = useAuth();

  return (
    <>
      <section className="hero">
        <div className="hero__text">
          <p className="hero__label">Level 1 — Start</p>
          <h1>Save Point</h1>
          <p>
            A library of famous indie games, from Braid and Limbo to Hades and Balatro. Find a game,
            check the details and add it to your wishlist.
          </p>
          <p className="muted">
            {user
              ? `Welcome back, ${nickname}! Games up to ${age}+ are unlocked for you.`
              : 'Playing as a guest: games rated 16+ and 18+ stay locked until you log in.'}
          </p>
          <div className="hero__links">
            <Link to="/games" className="btn">
              Browse games
            </Link>
            <Link to="/dashboard" className="btn btn--light">
              Dashboard
            </Link>
          </div>
        </div>
        <img
          className="hero__image"
          src={`${import.meta.env.BASE_URL}hero.svg`}
          alt="Pixel gamepad"
        />
      </section>

      <section className="menu">
        <Link to="/games?sort=rating-desc" className="menu__item menu__item--pink">
          <h3>Top rated</h3>
          <p>The best scores in the library</p>
        </Link>
        <Link to="/games?price=free" className="menu__item menu__item--cyan">
          <h3>Free to play</h3>
          <p>Games that cost nothing</p>
        </Link>
        <Link to="/games?mode=Co-op" className="menu__item menu__item--yellow">
          <h3>Co-op</h3>
          <p>Games to play with a friend</p>
        </Link>
        <Link to="/about" className="menu__item menu__item--green">
          <h3>How it works</h3>
          <p>About this project</p>
        </Link>
      </section>
    </>
  );
}
