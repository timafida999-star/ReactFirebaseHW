import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

const MESSAGES = {
  'auth/invalid-email': 'This email address is not valid',
  'auth/missing-password': 'Enter your password',
  'auth/weak-password': 'Password must have at least 6 characters',
  'auth/email-already-in-use': 'An account with this email already exists',
  'auth/user-not-found': 'Wrong email or password',
  'auth/wrong-password': 'Wrong email or password',
  'auth/invalid-credential': 'Wrong email or password',
  'auth/too-many-requests': 'Too many attempts. Try again later',
  'auth/network-request-failed': 'Network error. Check your connection',
  'auth/popup-blocked': 'The sign-in window was blocked by the browser',
  'auth/unauthorized-domain': 'This domain is not authorized in Firebase',
  'auth/operation-not-allowed': 'This sign-in method is not enabled in Firebase',
};

const SILENT = ['auth/popup-closed-by-user', 'auth/cancelled-popup-request'];

export function toAuthError(error) {
  if (SILENT.includes(error?.code)) return null;
  return MESSAGES[error?.code] ?? 'Authentication failed. Try again';
}

export function subscribeToAuth(callback) {
  return onAuthStateChanged(auth, callback);
}

export function signUpWithEmail(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function signInWithEmail(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function signInWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

export function signOutUser() {
  return signOut(auth);
}
