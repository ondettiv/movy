import React, { useEffect, useState } from 'react';
import MovieDetail from '../../components/MovieDetail';
import MovieList from '../../components/CardList';
import { getFromStorage } from '../../services';

function Home() {
  const [movieInfo, setMovieInfo] = useState(null);
  const genresLabelList = getFromStorage('genresList');

  useEffect(() => {
    setMovieInfo(getFromStorage('selectedMovie'));
  }, []);

  let configParams = {
    page: '1',
    isPoster: true,
  };

  return (
    <div>
      { (movieInfo !== null)
        && (
          <>
            <MovieDetail movieInfo={movieInfo} />
            <MovieList id="top_rated" title="Popular on Movy" url="/movie/popular" options={configParams} setMovieInfo={setMovieInfo} />
            {genresLabelList.map((genre) => {
              configParams = { ...configParams, genres: genre.id, isPoster: false };

              return <MovieList key={genre.id} title={genre.name} url="/discover/movie" options={configParams} setMovieInfo={setMovieInfo} />;
            })}
            ;
          </>
        )}
    </div>
  );
}

export default Home;
