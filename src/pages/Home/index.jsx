import React, { useEffect, useState } from 'react';
import MovieDetail from '../../components/MovieDetail';
import MovieList from '../../components/CardList';
import { getSelectedMovie, getGenresList } from '../../services';

function Home() {
  const [movieInfo, setMovieInfo] = useState(null);
  const [genresLabelList, setGenresLabelList] = useState(null);

  useEffect(() => {
    setGenresLabelList(getGenresList());
    setMovieInfo(getSelectedMovie());
  }, []);

  let isPoster = true;

  if (!movieInfo) {
    return null;
  }

  return (
    <div>
      <div>
        <MovieDetail movieInfo={movieInfo} />
        <MovieList id="top_rated" title="Popular on Movy" isPoster={isPoster} setMovieInfo={setMovieInfo} />
        {genresLabelList.map((genre) => {
          isPoster = false;

          return (
            <MovieList
              key={genre.id}
              title={genre.name}
              isPoster={isPoster}
              genres={genre.id}
              setMovieInfo={setMovieInfo}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Home;
