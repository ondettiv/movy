import React from 'react';
import Home from './pages/Home';
import { fetchGenres } from './services';
import './App.css';

function App() {
  fetchGenres();

  return (
    <div className="App">
      <header className="App-header">
        <Home />
      </header>
    </div>
  );
}

export default App;
