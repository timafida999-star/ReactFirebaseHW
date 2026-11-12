import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useCreateGame } from '../hooks/useGames';
import { GENRES, PLATFORMS, MODES, AGES, COLORS } from '../data/options';

const EMPTY = {
  title: '',
  developer: '',
  genre: 'Action',
  mode: 'Single player',
  platforms: ['PC'],
  releaseYear: '2026',
  rating: '75',
  price: '0',
  ageRating: '12',
  playtime: '10',
  color: COLORS[0],
  description: '',
};

function validate(values) {
  const errors = {};
  if (values.title.trim().length < 2) errors.title = 'At least 2 characters';
  if (values.developer.trim().length < 2) errors.developer = 'At least 2 characters';
  if (values.platforms.length === 0) errors.platforms = 'Pick at least one platform';
  if (values.releaseYear < 1980 || values.releaseYear > 2030) errors.releaseYear = '1980 – 2030';
  if (values.rating < 0 || values.rating > 100) errors.rating = '0 – 100';
  if (values.price < 0) errors.price = 'Cannot be negative';
  if (values.description.trim().length < 20) errors.description = 'At least 20 characters';
  return errors;
}

export default function NewGame() {
  const navigate = useNavigate();
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const { mutateAsync, isPending: saving, error: saveError } = useCreateGame();

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function togglePlatform(platform) {
    setValues((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((item) => item !== platform)
        : [...prev.platforms, platform],
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    try {
      const game = await mutateAsync(values);
      navigate(`/games/${game.id}`);
    } catch {
      return;
    }
  }

  return (
    <div className="form-page">
      <Link to="/games" className="btn btn--light">
        ← All games
      </Link>
      <h1>Add a game</h1>

      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="form__row">
          <label>
            Title
            <input name="title" value={values.title} onChange={handleChange} />
            {errors.title && <small className="field-error">{errors.title}</small>}
          </label>
          <label>
            Developer
            <input name="developer" value={values.developer} onChange={handleChange} />
            {errors.developer && <small className="field-error">{errors.developer}</small>}
          </label>
        </div>

        <div className="form__row">
          <label>
            Genre
            <select name="genre" value={values.genre} onChange={handleChange}>
              {GENRES.map((genre) => (
                <option key={genre}>{genre}</option>
              ))}
            </select>
          </label>
          <label>
            Mode
            <select name="mode" value={values.mode} onChange={handleChange}>
              {MODES.map((mode) => (
                <option key={mode}>{mode}</option>
              ))}
            </select>
          </label>
          <label>
            Age rating
            <select name="ageRating" value={values.ageRating} onChange={handleChange}>
              {AGES.map((age) => (
                <option key={age} value={age}>
                  {age}+
                </option>
              ))}
            </select>
          </label>
        </div>

        <fieldset className="platforms">
          <legend>Platforms</legend>
          {PLATFORMS.map((platform) => (
            <label key={platform} className="check">
              <input
                type="checkbox"
                checked={values.platforms.includes(platform)}
                onChange={() => togglePlatform(platform)}
              />
              {platform}
            </label>
          ))}
          {errors.platforms && <small className="field-error">{errors.platforms}</small>}
        </fieldset>

        <div className="form__row">
          <label>
            Year
            <input
              type="number"
              name="releaseYear"
              value={values.releaseYear}
              onChange={handleChange}
            />
            {errors.releaseYear && <small className="field-error">{errors.releaseYear}</small>}
          </label>
          <label>
            Metascore
            <input type="number" name="rating" value={values.rating} onChange={handleChange} />
            {errors.rating && <small className="field-error">{errors.rating}</small>}
          </label>
          <label>
            Price $
            <input
              type="number"
              step="0.01"
              name="price"
              value={values.price}
              onChange={handleChange}
            />
            {errors.price && <small className="field-error">{errors.price}</small>}
          </label>
          <label>
            Playtime, h
            <input type="number" name="playtime" value={values.playtime} onChange={handleChange} />
          </label>
        </div>

        <div className="colors">
          <span>Cover color</span>
          {COLORS.map((color) => (
            <button
              key={color}
              type="button"
              className={values.color === color ? 'color color--on' : 'color'}
              style={{ backgroundColor: color }}
              onClick={() => setValues((prev) => ({ ...prev, color }))}
            />
          ))}
        </div>

        <label>
          Description
          <textarea
            name="description"
            rows="5"
            value={values.description}
            onChange={handleChange}
          />
          {errors.description && <small className="field-error">{errors.description}</small>}
        </label>

        {saveError && <p className="field-error">{saveError.message}</p>}

        <button className="btn" type="submit" disabled={saving}>
          {saving ? 'Saving...' : 'Save game'}
        </button>
      </form>
    </div>
  );
}
