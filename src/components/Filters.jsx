import { GENRES, PLATFORMS, MODES, SORTS } from '../data/options';

export default function Filters({ values, onChange, onReset }) {
  return (
    <div className="filters">
      <input
        className="filters__search"
        placeholder="Search by title or studio..."
        value={values.q}
        onChange={(e) => onChange('q', e.target.value)}
      />

      <select value={values.genre} onChange={(e) => onChange('genre', e.target.value)}>
        <option value="">All genres</option>
        {GENRES.map((genre) => (
          <option key={genre}>{genre}</option>
        ))}
      </select>

      <select value={values.platform} onChange={(e) => onChange('platform', e.target.value)}>
        <option value="">All platforms</option>
        {PLATFORMS.map((platform) => (
          <option key={platform}>{platform}</option>
        ))}
      </select>

      <select value={values.mode} onChange={(e) => onChange('mode', e.target.value)}>
        <option value="">Any mode</option>
        {MODES.map((mode) => (
          <option key={mode}>{mode}</option>
        ))}
      </select>

      <select value={values.price} onChange={(e) => onChange('price', e.target.value)}>
        <option value="">Any price</option>
        <option value="free">Free</option>
        <option value="paid">Paid</option>
      </select>

      <select value={values.sort} onChange={(e) => onChange('sort', e.target.value)}>
        {Object.entries(SORTS).map(([value, label]) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      <button className="btn btn--light" onClick={onReset}>
        Reset
      </button>
    </div>
  );
}
