import React, { useEffect, useState } from 'react';
import Movie from '../Card';
import { fetchFrom } from '../../services';
import './styles.css';

function CardList({
  id,
  title,
  url,
  options,
  setMovieInfo,
}) {
  const [movieList, setMovieList] = useState([]);
  const initialPosition = 40;
  const idName = `${id}-cardList`;
  const containerName = `${id}-containerCardList`;
  let direction = '';
  let myTimer = null;
  let isFetching = false;

  const fetchMovies = async (fetchOptions) => {
    isFetching = true;
    const movies = await fetchFrom(url, fetchOptions);
    setMovieList([...movieList, ...movies.results]);
    isFetching = false;
  };

  useEffect(() => {
    fetchMovies(options);
  }, []);

  function stopMove() {
    clearTimeout(myTimer);
  }

  function animateCardList() {
    if (isFetching) {
      stopMove();
      return;
    }

    const cardListElement = document.getElementById(idName);
    const containerCardListElement = document.getElementById(containerName);
    const maxListWidth = (
      cardListElement.offsetWidth
      - containerCardListElement.offsetWidth
      + initialPosition
    );
    const step = 7;
    let x = document.getElementById(idName).offsetLeft;
    if (direction === 'left') {
      if (x < initialPosition) {
        x += step;
      } else {
        x = initialPosition;
      }
    } else if (direction === 'right') {
      if (Math.abs(x) <= maxListWidth) {
        x -= step;
      }
    }

    document.getElementById(idName).style.left = `${x}px`;
  }

  function startMove() {
    animateCardList();
    myTimer = setTimeout(startMove, 10);
  }

  return (
    <div className="p-8 w-screen">
      <h3 className="text-left font-bold mb-4">
        {`${title}:`}
      </h3>
      <div id={containerName} className="relative overflow-hidden">
        <div className={`flex items-center ${options.isPoster ? 'listPosterContainer' : 'listContainer'}`}>
          <div id={idName} className="left-[40px] ease-out relative flex gap-6">
            {movieList.map((movie) => (
              <Movie
                key={movie.id}
                movie={movie}
                isPoster={options.isPoster}
                setMovieInfo={setMovieInfo}
              />
            ))}
          </div>
        </div>
        <div
          id="prev"
          className="w-10 h-full bg-gradient-to-r from-black to-transparent absolute left-0 top-0"
          onMouseEnter={() => {
            direction = 'left';
            startMove();
          }}
          onMouseLeave={stopMove}
        />
        <div
          id="next"
          className="w-10 h-full bg-gradient-to-r from-transparent to-black absolute right-0 top-0"
          onMouseEnter={() => {
            direction = 'right';
            startMove();
          }}
          onMouseLeave={stopMove}
        />
      </div>
    </div>
  );
}

export default CardList;
