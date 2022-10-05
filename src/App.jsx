import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Movie from './pages/Movie';
import { fetchGenres } from './services';
import './App.css';

function App() {
  useEffect(() => {
    fetchGenres();
  });

  return (
    <div className="App">
      <NavBar />
      <div className="screenContainer">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie" element={<Movie />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
