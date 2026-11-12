export const GENRES = [
  'Action',
  'RPG',
  'Platformer',
  'Puzzle',
  'Racing',
  'Strategy',
  'Horror',
  'Sports',
  'Simulation',
];
export const PLATFORMS = ['PC', 'PlayStation', 'Xbox', 'Switch', 'Mobile'];
export const MODES = ['Single player', 'Co-op', 'Online PvP'];
export const AGES = [3, 7, 12, 16, 18];

export const SORTS = {
  default: 'Default',
  'rating-desc': 'Best rated',
  'year-desc': 'Newest',
  'year-asc': 'Oldest',
  'price-asc': 'Cheapest',
  'price-desc': 'Most expensive',
  'title-asc': 'Title A–Z',
};

export const COLORS = ['#e4000f', '#2b59c3', '#f5b700', '#5c5c66', '#2e9e4f', '#8b8b8b'];

export const PAGE_SIZE = 12;

export function formatPrice(price) {
  return price === 0 ? 'Free' : `$${price.toFixed(2)}`;
}
