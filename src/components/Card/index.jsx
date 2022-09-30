import React, { useState, useEffect } from 'react';
import './styles.css';
import {
  fetchFrom,
  setSelectedMovie,
  getGenresList,
} from '../../services';
import StarRating from '../StarRating';
import movyLogo from '../../assets/logos/movy.png';

function Card({ movie, isPoster, setMovieInfo }) {
  const movieImagePath = isPoster ? movie.poster_path : movie.backdrop_path;
  const [infoVisible, setInfoVisible] = useState(false);
  const [genresLabelList, setGenresLabelList] = useState({});

  function showInfo() {
    setInfoVisible(true);
  }

  function hideInfo() {
    setInfoVisible(false);
  }

  async function selectMovie() {
    const selectedMovie = await fetchFrom('/movie/', { movieId: movie.id });
    setSelectedMovie(selectedMovie);
    setMovieInfo(selectedMovie);
    console.log('SELECTED MOVIE: ', selectedMovie);
  }

  useEffect(() => {
    const genresList = getGenresList('genresList');
    const filteredGenres = genresList.filter((el) => (movie.genre_ids.includes(el.id)));
    setGenresLabelList(filteredGenres.slice(0, 3));
  }, []);

  return (
    <div
      className="card w-48 flex-none origin-center ease-out duration-100 hover:duration-300 hover:scale-125"
      onClick={selectMovie}
      aria-hidden="true"
    >
      <div
        className="bg-center bg-no-repeat w-[192px] hover:opacity-70"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500/${movieImagePath}), url(${movyLogo})`,
          backgroundSize: 'cover, contain',
          height: isPoster ? 288 : 108,
        }}
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
                <div className="absolute top-[63px] text-sm pl-2 pr-2">
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
