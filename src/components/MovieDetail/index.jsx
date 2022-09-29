import React, { useEffect } from 'react';
import './styles.css';

function MovieDetail({ movieInfo }) {
  console.log('SELECTED MOVIE: ', movieInfo);
  const releaseYear = movieInfo.release_date.split('-')[0];

  useEffect(() => {
  });

  return (
    <div className="movieDetail h-[600px] w-full">
      <div className="bg-cover bg-center bg-top h-[600px] w-full opacity-70" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieInfo.backdrop_path})` }} />
      <div className="absolute top-[125px] left-52 text-sm">
        {releaseYear}
        {' \u2022 '}
        {movieInfo.genres.map((genre) => (
          <span key={`movieDetail-${movieInfo.id}-${genre.id}`} className="font-light coma_spacer">
            {genre.name}
          </span>
        ))}
      </div>
      <div className="absolute top-[165px] left-52 text-5xl font-bold">{movieInfo?.title.toUpperCase()}</div>
      <div className="absolute top-[300px] left-52 text-base w-3/5">{movieInfo?.overview}</div>
    </div>
  );
}

export default MovieDetail;
