import { Link, NavLink } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';

export default function NavBar() {
  const { user, nickname, loading, logout } = useAuth();
  const { wishlist } = useWishlist();

  return (
    <header className="navbar">
      <Link to="/" className="logo">
        SAVE<span>POINT</span>
      </Link>
      <nav>
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/games">Games</NavLink>
        <NavLink to="/wishlist">Wishlist ({wishlist.length})</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/about">About</NavLink>
        {!loading && !user && (
          <>
            <NavLink to="/login" className="nav-player">
              Login
            </NavLink>
            <NavLink to="/signup" className="nav-player">
              Signup
            </NavLink>
          </>
        )}
        {!loading && user && (
          <>
            <NavLink to="/profile" className="nav-player" title={nickname}>
              Profile
            </NavLink>
            <button type="button" className="nav-logout" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
