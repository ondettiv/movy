import React, { useEffect, useState } from 'react';
import MovieDetail from '../../components/MovieDetail';
import MovieList from '../../components/CardList';
import { getSelectedMovie, getGenresList } from '../../services';

function Home() {
  const [movieInfo, setMovieInfo] = useState(null);
  const genresLabelList = getGenresList();

  useEffect(() => {
    setMovieInfo(getSelectedMovie());
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
            <MovieList id="top_rated" title="Popular on Movy" options={configParams} setMovieInfo={setMovieInfo} />
            {genresLabelList.map((genre) => {
              configParams = { ...configParams, genres: genre.id, isPoster: false };

              return (
                <MovieList
                  key={genre.id}
                  title={genre.name}
                  options={configParams}
                  setMovieInfo={setMovieInfo}
                />
              );
            })}
            ;
          </>
        )}
    </div>
  );
}

export default Home;
