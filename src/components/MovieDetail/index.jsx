import React, { useState, useEffect } from 'react';
import { getFromStorage } from '../../services';

function MovieDetail() {
  const [movieInfo, setMovieInfo] = useState(getFromStorage('selectedMovie'));

  useEffect(() => {
    setMovieInfo(() => getFromStorage('selectedMovie'));
  }, []); // eslint-disable-line

  return (
    <>
      <div>{movieInfo.title}</div>
      <div>{movieInfo.overview}</div>
    </>
  );
}

export default MovieDetail;
