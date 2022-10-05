export async function fetchMovie(movieId) {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?${process.env.REACT_APP_API_KEY}&append_to_response=credits`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('LOAD ERROR: ', error.message);
    return null;
  }
}

export async function fetchMovieByGenre(options) {
  const {
    page = '1',
    genres = '',
  } = options;
  const url = `https://api.themoviedb.org/3/discover/movie?${process.env.REACT_APP_API_KEY}&with_genres=${genres}&page=${page}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('LOAD ERROR: ', error.message);
    return null;
  }
}

export async function fetchPopular() {
  const page = '1';
  const url = `https://api.themoviedb.org/3/movie/popular?${process.env.REACT_APP_API_KEY}&page=${page}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('LOAD ERROR: ', error.message);
    return null;
  }
}
const setInStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const getFromStorage = (key) => JSON.parse(localStorage.getItem(key));

export function setSelectedMovie(value) {
  setInStorage('selectedMovie', value);
}

export function getSelectedMovie() {
  return getFromStorage('selectedMovie');
}

export function setGenresList(value) {
  setInStorage('genresList', value);
}

export function getGenresList() {
  return getFromStorage('genresList');
}

export const fetchGenres = async () => {
  console.log('KEY REACT_APP_API_KEY: ', process.env.REACT_APP_API_KEY);
  try {
    const data = await fetch(`https://api.themoviedb.org/3/genre/movie/list?${process.env.REACT_APP_API_KEY}`);
    try {
      const result = await data.json();
      setInStorage('genresList', result.genres);
      return (result.genres);
    } catch (error) {
      console.log('LOAD ERROR: ', error.message);
      return null;
    }
  } catch (error) {
    console.log('LOAD ERROR: ', error.message);
    return null;
  }
};

export function toHoursAndMinutes(value) {
  const secNum = Math.floor(value / 3600);
  let hours = Math.floor((value - (secNum * 3600)) / 60);
  let minutes = value - (secNum * 3600) - (hours * 60);
  let timeUnit;

  if (hours > 0) {
    timeUnit = 'h';
    hours = `${hours}.`;
    if (minutes < 10) { minutes = `0${minutes}`; }
  } else {
    timeUnit = 'm';
    hours = '';
  }

  return `${hours}${minutes}${timeUnit}`;
}
