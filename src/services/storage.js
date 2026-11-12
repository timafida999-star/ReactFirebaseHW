const WISHLIST_KEY = 'savepoint-wishlist';
const CUSTOM_KEY = 'savepoint-custom-games';
const AGE_KEY = 'savepoint-age';

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    return;
  }
}

function readList(key) {
  const list = readJson(key, []);
  return Array.isArray(list) ? list : [];
}

export function loadWishlist() {
  return readList(WISHLIST_KEY);
}

export function saveWishlist(ids) {
  writeJson(WISHLIST_KEY, ids);
}

export function loadCustomGames() {
  return readList(CUSTOM_KEY);
}

export function saveCustomGames(games) {
  writeJson(CUSTOM_KEY, games);
}

export function loadAge(uid, fallback) {
  const age = Number(readJson(`${AGE_KEY}:${uid}`, fallback));
  return [3, 7, 12, 16, 18].includes(age) ? age : fallback;
}

export function saveAge(uid, age) {
  writeJson(`${AGE_KEY}:${uid}`, age);
}
