import React, { useState } from 'react';
import './styles.css';
import {
  fetchFrom,
  setInStorage,
  getFromStorage,
  filterByReference,
} from '../../services';
import StarRating from '../StarRating';

function Card({ movie, isPoster, setMovieInfo }) {
  const movieImagePath = isPoster ? movie.poster_path : movie.backdrop_path;
  const [infoVisible, setInfoVisible] = useState(false);
  const genresLabelList = filterByReference(getFromStorage('genresList'), movie.genre_ids).slice(0, 3);
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

  async function selectMovie() {
    const selectedMovie = await fetchFrom('/movie/', { movieId: movie.id });
    setInStorage('selectedMovie', selectedMovie);
    setMovieInfo(selectedMovie);
  }

  return (
    <div
      className="card w-48 flex-none origin-center ease-out duration-100 hover:duration-300 hover:scale-125"
      onClick={selectMovie}
      aria-hidden="true"
    >
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
            <div className="absolute top-0 w-full antialiased min-h-full pointer-events-none">
              <p className="title absolute bottom-[50px] text-sm font-bold pl-2  pr-2">{movie.title}</p>
              { movie.vote_average !== 0
                && (
                <div className="absolute top-[60px] pl-2 pr-2">
                  <StarRating rate={movie.vote_average} />
                </div>
                )}
              <div className="genre absolute top-20 text-sm pl-2 pr-8">
                {genresLabelList.map((genre) => (
                  <span key={`${movie.id}-${genre.id}`} className="font-light bullet_spacer">
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
          )
        )}
    </div>
  );
}

export default Card;
