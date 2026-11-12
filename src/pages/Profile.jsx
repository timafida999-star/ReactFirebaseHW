import { Link } from 'react-router';
import { useAuth } from '../context/AuthContext';
import { AGES } from '../data/options';

export default function Profile() {
  const { user, nickname, age, setAge, logout } = useAuth();

  return (
    <div className="login">
      <div className="login__box">
        <p className="login__title">Player 1</p>
        <h1>{nickname}</h1>

        <dl className="profile__facts">
          <dt>Email</dt>
          <dd>{user.email}</dd>
          <dt>UID</dt>
          <dd className="profile__uid">{user.uid}</dd>
        </dl>

        <label>
          My age group
          <select value={age} onChange={(e) => setAge(e.target.value)}>
            {AGES.filter((a) => a >= 12).map((a) => (
              <option key={a} value={a}>
                {a}+
              </option>
            ))}
          </select>
        </label>
        <p>Games up to {age}+ are unlocked.</p>

        <div className="hero__links">
          <Link to="/dashboard" className="btn">
            Dashboard
          </Link>
          <button className="btn btn--light" onClick={logout}>
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
