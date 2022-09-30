import { API_KEY } from './constants';

export async function fetchFrom(url, options) {
  const {
    page = '1',
    genres = '',
    movieId,
  } = options;

  let fetchUrl;
  switch (url) {
    case '/movie/':
      fetchUrl = `https://api.themoviedb.org/3${url}${movieId}?${API_KEY}&append_to_response=credits`;
      break;

    case '/discover/movie':
      if (genres !== '') {
        fetchUrl = `https://api.themoviedb.org/3${url}?${API_KEY}&with_genres=${genres}&page=${page}`;
      }
      break;

    default:
      fetchUrl = `https://api.themoviedb.org/3/movie/popular?${API_KEY}&page=${page}`;
      break;
  }

  const data = await fetch(fetchUrl)
    .catch((error) => {
      console.log('LOAD ERROR: ', error);
    });
  const movies = await data.json();
  console.log(movies);
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
