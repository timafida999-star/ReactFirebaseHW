import { useEffect, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/Loading';

function validate({ email, password, confirm }) {
  const errors = {};
  if (!/^\S+@\S+\.\S+$/.test(email.trim())) errors.email = 'Enter a valid email address';
  if (password.length < 6) errors.password = 'At least 6 characters';
  if (confirm !== password) errors.confirm = 'Passwords do not match';
  return errors;
}

export default function Signup() {
  const { user, loading, error, clearError, signup, loginWithGoogle } = useAuth();
  const location = useLocation();
  const [values, setValues] = useState({ email: '', password: '', confirm: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    clearError();
    return clearError;
  }, [clearError]);

  if (loading) return <Loading text="Checking player..." />;
  if (user) return <Navigate to={location.state?.from ?? '/profile'} replace />;

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    setSubmitting(true);
    await signup(values.email.trim(), values.password);
    setSubmitting(false);
  }

  async function handleGoogle() {
    setSubmitting(true);
    await loginWithGoogle();
    setSubmitting(false);
  }

  return (
    <div className="login">
      <form className="login__box" onSubmit={handleSubmit} noValidate>
        <p className="login__title">New game</p>
        <h1>Sign up</h1>

        <label>
          Email
          <input
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && <small className="field-error">{errors.email}</small>}
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            autoComplete="new-password"
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && <small className="field-error">{errors.password}</small>}
        </label>
        <label>
          Confirm password
          <input
            name="confirm"
            type="password"
            autoComplete="new-password"
            value={values.confirm}
            onChange={handleChange}
          />
          {errors.confirm && <small className="field-error">{errors.confirm}</small>}
        </label>
        {error && <p className="field-error">{error}</p>}

        <button className="btn" type="submit" disabled={submitting}>
          {submitting ? 'Loading...' : 'Create account'}
        </button>
        <span className="login__divider">or</span>
        <button className="btn btn--light" type="button" onClick={handleGoogle} disabled={submitting}>
          Sign up with Google
        </button>
        <p className="muted small">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
}
