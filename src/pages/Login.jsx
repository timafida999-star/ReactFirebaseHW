import { useEffect, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';

export default function Login() {
  const { user, loading, error, clearError, login, loginWithGoogle } = useAuth();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldError, setFieldError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    clearError();
    return clearError;
  }, [clearError]);

  if (loading) return <Loading text="Checking player..." />;
  if (user) return <Navigate to={location.state?.from ?? '/profile'} replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim() || !password) {
      setFieldError('Enter your email and password');
      return;
    }
    setFieldError('');
    setSubmitting(true);
    await login(email.trim(), password);
    setSubmitting(false);
  }

  async function handleGoogle() {
    setFieldError('');
    setSubmitting(true);
    await loginWithGoogle();
    setSubmitting(false);
  }

  return (
    <div className="login">
      <form className="login__box" onSubmit={handleSubmit} noValidate>
        <p className="login__title">Press start</p>
        <h1>Log in</h1>
        {location.state?.from && (
          <p className="field-error">You need to log in to open this page.</p>
        )}

        <label>
          Email
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {(fieldError || error) && <p className="field-error">{fieldError || error}</p>}

        <button className="btn" type="submit" disabled={submitting}>
          {submitting ? 'Loading...' : 'Start'}
        </button>
        <span className="login__divider">or</span>
        <button className="btn btn--light" type="button" onClick={handleGoogle} disabled={submitting}>
          Continue with Google
        </button>
        <p className="muted small">
          No account yet? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
}
