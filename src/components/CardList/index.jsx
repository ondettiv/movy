import React, { useEffect, useState, useRef } from 'react';
import Movie from '../Card';
import { fetchMovieByGenre, fetchPopular } from '../../services';
import './styles.css';

function CardList({
  title,
  isPoster,
  genres,
  setMovieInfo,
}) {
  const [movieList, setMovieList] = useState([]);
  const initialPosition = 40;
  const containerRef = useRef();
  const cardListRef = useRef();
  let direction = '';
  let myTimer = null;

  const fetchMovies = async () => {
    const fetchOptions = {
      genres,
    };
    let movies;
    if (genres !== null) {
      movies = await fetchMovieByGenre(fetchOptions);
    } else {
      movies = await fetchPopular();
    }
    console.log('QUE ES MOVIE: ', movies);
    setMovieList(movies.results);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  function stopMove() {
    clearTimeout(myTimer);
  }

  function animateCardList() {
    const cardListElement = cardListRef.current;
    const containerCardListElement = containerRef.current;
    const maxListWidth = (
      cardListElement.offsetWidth
      - containerCardListElement.offsetWidth
      + initialPosition
    );
    const step = 7;
    let x = cardListElement.offsetLeft;
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

    cardListElement.style.left = `${x}px`;
  }

  function startMove() {
    animateCardList();
    myTimer = setTimeout(startMove, 10);
  }

  return (
    <div className="px-8 pb-4 w-screen">
      <h3 className="text-left font-bold">
        {`${title}:`}
      </h3>
      <div ref={containerRef} className="relative overflow-hidden">
        <div className={`flex items-center ${isPoster ? 'listPosterContainer' : 'listContainer'}`}>
          <div ref={cardListRef} className="left-[40px] ease-out relative flex gap-6">
            {movieList.map((movie) => (
              <Movie
                key={`movie-${movie.id}`}
                movie={movie}
                isPoster={isPoster}
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
