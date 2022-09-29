import React, { useEffect, useState } from 'react';
import MovieDetail from '../../components/MovieDetail';
import MovieList from '../../components/CardList';
import { getFromStorage } from '../../services';

function Home() {
  const [movieInfo, setMovieInfo] = useState(getFromStorage('selectedMovie'));

  useEffect(() => {
  });

  const configParams = {
    page: '1',
    genres: '12',
    isPosert: false,
  };

  const configParams2 = {
    page: '1',
    isPoster: true,
  };

  return (
    <>
      <MovieDetail movieInfo={movieInfo} />
      <MovieList id="popular" title="Popular on Movy" url="/discover/movie" options={configParams} setMovieInfo={setMovieInfo} />
      <MovieList id="top_rated" title="Top Rated" url="/movie/top_rated" options={configParams2} setMovieInfo={setMovieInfo} />
    </>
  );
}

export default Home;
