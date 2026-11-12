import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  signInWithEmail,
  signInWithGoogle,
  signOutUser,
  signUpWithEmail,
  subscribeToAuth,
  toAuthError,
} from '../services/authService';
import { loadAge, saveAge } from '../services/storage';

const AuthContext = createContext(null);
const GUEST_AGE = 12;
const DEFAULT_AGE = 16;

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userAge, setUserAge] = useState(GUEST_AGE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    return subscribeToAuth((nextUser) => {
      setUser(nextUser);
      setUserAge(nextUser ? loadAge(nextUser.uid, DEFAULT_AGE) : GUEST_AGE);
      setLoading(false);
    });
  }, []);

  const run = useCallback(async (action) => {
    setError('');
    try {
      await action();
      return true;
    } catch (err) {
      setError(toAuthError(err) ?? '');
      return false;
    }
  }, []);

  const signup = useCallback((email, password) => run(() => signUpWithEmail(email, password)), [run]);
  const login = useCallback((email, password) => run(() => signInWithEmail(email, password)), [run]);
  const loginWithGoogle = useCallback(() => run(() => signInWithGoogle()), [run]);
  const logout = useCallback(() => run(() => signOutUser()), [run]);
  const clearError = useCallback(() => setError(''), []);

  const setAge = useCallback(
    (next) => {
      if (!user) return;
      saveAge(user.uid, Number(next));
      setUserAge(Number(next));
    },
    [user],
  );

  const value = useMemo(
    () => ({
      user,
      nickname: user ? user.displayName || user.email.split('@')[0] : null,
      age: user ? userAge : GUEST_AGE,
      setAge,
      loading,
      error,
      clearError,
      signup,
      login,
      loginWithGoogle,
      logout,
    }),
    [user, userAge, loading, error, setAge, clearError, signup, login, loginWithGoogle, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
