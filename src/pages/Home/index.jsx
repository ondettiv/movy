import React, { useEffect, useState } from 'react';
import MovieDetail from '../../components/MovieDetail';
import MovieList from '../../components/CardList';
import { getFromStorage } from '../../services';

function Home() {
  const [movieInfo, setMovieInfo] = useState(getFromStorage('selectedMovie'));
  const genresLabelList = getFromStorage('genresList');
  console.log(genresLabelList);

  useEffect(() => {
  });

  let configParams = {
    page: '1',
    isPoster: true,
  };

  return (
    <>
      <MovieDetail movieInfo={movieInfo} />
      <MovieList id="top_rated" title="Popular on Movy" url="/movie/popular" options={configParams} setMovieInfo={setMovieInfo} />
      {genresLabelList.map((genre) => {
        configParams = { ...configParams, genres: genre.id, isPoster: false };

        return <MovieList key={genre.id} id={`byGenre${genre.id}`} title={genre.name} url="/discover/movie" options={configParams} setMovieInfo={setMovieInfo} />;
      })}
      ;
    </>
  );
}

export default Home;
