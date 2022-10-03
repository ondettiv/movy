import React, { useEffect } from 'react';
import imdbLogo from '../../assets/logos/imdb.png';
import boockmarkIcon from '../../assets/icons/boockmark.png';
import playIcon from '../../assets/icons/play.png';
import directorIcon from '../../assets/icons/director.png';
import StarRating from '../StarRating';
import { toHoursAndMinutes } from '../../services';
import './styles.css';

function MovieDetail({ movieInfo }) {
  const releaseYear = movieInfo.release_date.split('-')[0];
  const director = movieInfo.credits.crew.find((element) => element.department === 'Directing').name;
  const movieDuration = toHoursAndMinutes(movieInfo.runtime);

  useEffect(() => {
  });

  return (
    <div className="movieDetail h-[700px] w-full">
      <div className="bg-cover bg-center bg-top h-[700px] w-full opacity-40" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieInfo.backdrop_path})` }} />
      <div className="absolute top-[50px] w-full">
        <div className="relative top-[125px] left-52 text-sm">
          {releaseYear}
          {' \u2022 '}
          {movieInfo.genres.map((genre) => (
            <span key={`movieDetail-${movieInfo.id}-${genre.id}`} className="font-light coma_spacer">
              {genre.name}
            </span>
          ))}
        </div>
        <div className="relative top-[165px] left-52 text-5xl font-bold">{movieInfo?.title.toUpperCase()}</div>
        <div className="relative flex items-center top-[200px] left-52 mr-12">
          <div className="pillPink">{movieDuration}</div>
          <div className="relative bg-contain bg-center w-[22px] h-[25px] ml-12 mr-2 " style={{ backgroundImage: `url(${directorIcon})` }} />
          <span className="relative text-base">{director}</span>
          <div className="ml-16">
            <StarRating rate={movieInfo.vote_average} />
          </div>
        </div>
        <div className="relative top-[250px] left-52 text-base w-3/5">{movieInfo?.overview}</div>
        <div className="relative overlay-cover top-[350px] left-52 flex items-center">
          <div className="relative flex items-center mr-12">
            <div className="relative bg-contain bg-center w-[14px] h-[18px] mr-2 " style={{ backgroundImage: `url(${boockmarkIcon})` }} />
            <span className="relative colored text-base">Watch Later</span>
          </div>
          <div className="relative flex items-center mr-12">
            <div className="relative bg-contain bg-center w-[20px] h-[20px] mr-2 " style={{ backgroundImage: `url(${playIcon})` }} />
            <span className="relative colored text-base">Watch Trailer</span>
          </div>
          <div className="relative bg-contain bg-center w-[68px] h-[33px]" style={{ backgroundImage: `url(${imdbLogo})` }} />
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
