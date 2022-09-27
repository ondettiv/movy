import React, { useState } from 'react';
import './styles.css';

function Card({ movie, isPoster }) {
  const movieImagePath = isPoster ? movie.poster_path : movie.backdrop_path;
  const [infoVisible, setInfoVisible] = useState(false);
  let timeOutId = null;

  function showInfo() {
    timeOutId = setTimeout(() => {
      setInfoVisible(true);
    }, 250);
  }

  function hideInfo() {
    setInfoVisible(false);
    clearTimeout(timeOutId);
  }

  return (
    <div className="w-48 flex-none origin-center ease-out duration-100 hover:duration-300 hover:scale-125">
      <img
        className="overlay-cover hover:opacity-70"
        src={`https://image.tmdb.org/t/p/w500/${movieImagePath}`}
        alt={movie.title}
        onMouseEnter={showInfo}
        onMouseLeave={hideInfo}
      />
      {!isPoster
        && (
          infoVisible
          && (
            <div className="antialiased min-h-full pointer-events-none">
              <p className="absolute bottom-10 text-base font-bold pl-2  pr-2">{movie.title}</p>
              <div className="absolute bottom-2 text-sm pl-2 pr-2">
                {movie.genre_ids.map((genre) => (
                  <span key={genre} className="text-sm font-light">{genre}</span>
                ))}
              </div>
            </div>
          )
        )}
    </div>
  );
}

export default Card;
