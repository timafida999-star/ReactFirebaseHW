import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import PixelIcon from './PixelIcon';

function getSrc(image) {
  return image.startsWith('http') ? image : import.meta.env.BASE_URL + image;
}

export default function GameCover({ game, big = false }) {
  const { age } = useAuth();
  const [imageFailed, setImageFailed] = useState(false);
  const locked = game.ageRating > age;
  const showImage = game.image && !imageFailed;

  return (
    <div
      className={`cover ${big ? 'cover--big' : ''} ${locked ? 'cover--locked' : ''}`}
      style={{ backgroundColor: game.color }}
    >
      {showImage ? (
        <img
          className="cover__image"
          src={getSrc(game.image)}
          alt={game.title}
          loading="lazy"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div className="cover__art">
          <PixelIcon genre={game.genre} size={big ? 100 : 64} />
        </div>
      )}
      <span className="cover__age">PEGI {game.ageRating}</span>
      {locked && <span className="cover__lock">{game.ageRating}+ only</span>}
    </div>
  );
}
