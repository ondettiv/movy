import React from 'react';
import MovieDetail from './components/MovieDetail';
import MovieList from './components/CardList';
import './App.css';

function App() {
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
    <div className="App">
      <header className="App-header">
        <MovieDetail />
        <MovieList id="popular" title="Popular on Movy" url="/movie/popular" options={configParams} />
        <MovieList id="top_rated" title="Top Rated" url="/movie/top_rated" options={configParams2} />
      </header>
    </div>
  );
}

export default App;
