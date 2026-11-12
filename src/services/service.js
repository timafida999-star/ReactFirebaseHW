import { PAGE_SIZE } from '../data/options';
import { loadCustomGames, saveCustomGames } from './storage';

const API_URL = `${import.meta.env.BASE_URL}api/games.json`;

function wait(ms, signal) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, ms);
    signal?.addEventListener('abort', () => {
      clearTimeout(timer);
      reject(new DOMException('Aborted', 'AbortError'));
    });
  });
}

async function loadGames(signal) {
  await wait(350, signal);
  const response = await fetch(API_URL, { signal });
  if (!response.ok) throw new Error(`Server error: ${response.status}`);
  const games = await response.json();
  return [...loadCustomGames(), ...games];
}

const sorters = {
  'rating-desc': (a, b) => (b.rating ?? 0) - (a.rating ?? 0),
  'year-desc': (a, b) => b.releaseYear - a.releaseYear,
  'year-asc': (a, b) => a.releaseYear - b.releaseYear,
  'price-asc': (a, b) => a.price - b.price,
  'price-desc': (a, b) => b.price - a.price,
  'title-asc': (a, b) => a.title.localeCompare(b.title),
};

export async function getGames(params, signal) {
  const { q = '', genre, platform, mode, price, sort, page = 1 } = params;
  const games = await loadGames(signal);
  const search = q.trim().toLowerCase();

  let result = games.filter((game) => {
    if (search && !`${game.title} ${game.developer}`.toLowerCase().includes(search)) return false;
    if (genre && game.genre !== genre) return false;
    if (platform && !game.platforms.includes(platform)) return false;
    if (mode && game.mode !== mode) return false;
    if (price === 'free' && game.price > 0) return false;
    if (price === 'paid' && game.price === 0) return false;
    return true;
  });

  if (sorters[sort]) result = [...result].sort(sorters[sort]);

  const pages = Math.max(1, Math.ceil(result.length / PAGE_SIZE));
  const current = Math.min(Math.max(1, Number(page) || 1), pages);

  return {
    items: result.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE),
    total: result.length,
    page: current,
    pages,
  };
}

export async function getGame(id, signal) {
  const games = await loadGames(signal);
  const game = games.find((item) => String(item.id) === id);
  if (!game) {
    const error = new Error(`Game #${id} not found`);
    error.notFound = true;
    throw error;
  }
  const similar = games
    .filter((item) => item.genre === game.genre && item.id !== game.id)
    .slice(0, 4);
  return { game, similar };
}

export async function getAllGames(signal) {
  return loadGames(signal);
}

export async function getGamesByIds(ids, signal) {
  const games = await loadGames(signal);
  return games.filter((game) => ids.includes(game.id));
}

export async function createGame(values) {
  const games = await loadGames();
  const title = values.title.trim();
  if (games.some((game) => game.title.toLowerCase() === title.toLowerCase())) {
    throw new Error('A game with this title already exists');
  }
  const game = {
    ...values,
    id: Math.max(...games.map((item) => item.id)) + 1,
    title,
    developer: values.developer.trim(),
    description: values.description.trim(),
    releaseYear: Number(values.releaseYear),
    rating: Number(values.rating),
    price: Number(values.price),
    ageRating: Number(values.ageRating),
    playtime: Number(values.playtime),
    image: '',
  };
  saveCustomGames([game, ...loadCustomGames()]);
  return game;
}
