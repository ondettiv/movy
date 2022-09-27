import React, { useState, useEffect } from 'react';
import fetchFrom from '../../services';

function Genres() {
  const [genres, setGenres] = useState([]);

  const fetchGenres = async () => {
    const result = await fetchFrom('/genre/movie/list');
    setGenres(result.genres);
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  return (
    <div className="p-8 w-full">
      <h3 className="text-left font-bold mb-4">Genres: </h3>
      <ul id="genre_list" className="ml-8 flex flex-row flex-wrap" name="">
        {genres.map((genre) => <li key={genre.id} className="min-w-[100px] text-center shrink border rounded-full p-1 mr-2 mb-2"><a className="" href="./">{genre.name}</a></li>)}
      </ul>
    </div>
  );
}

export default Genres;
