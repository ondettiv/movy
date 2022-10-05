import { API_KEY } from './constants';

async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log('LOAD ERROR: ', error.message);
    return null;
  }
}

export async function fetchMovie(movieId) {
  const fetchUrl = `https://api.themoviedb.org/3/movie/${movieId}?${API_KEY}&append_to_response=credits`;

  const movies = await fetchData(fetchUrl);
  return movies;
}

export async function fetchMovieByGenre(options) {
  const {
    page = '1',
    genres = '',
  } = options;
  const fetchUrl = `https://api.themoviedb.org/3/discover/movie?${API_KEY}&with_genres=${genres}&page=${page}`;

  const movies = await fetchData(fetchUrl);
  return movies;
}

export async function fetchPopular() {
  const page = '1';
  const fetchUrl = `https://api.themoviedb.org/3/movie/popular?${API_KEY}&page=${page}`;

  const movies = await fetchData(fetchUrl);
  return movies;
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
  const data = await fetch(`https://api.themoviedb.org/3/genre/movie/list?${API_KEY}`)
    .catch((error) => {
      console.log('LOAD ERROR: ', error);
    });
  const result = await data.json()
    .catch((error) => {
      console.log('json ERROR: ', error);
    });
  setInStorage('genresList', result.genres);
  return (result.genres);
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
