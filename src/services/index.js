import { API_KEY } from './constants';

export default async function fetchMovies(url, options) {
  let {
    page = '1',
    genres = '',
  } = options;

  page = `&page=${page}`;
  let fetchUrl = `https://api.themoviedb.org/3/movie/popular?${API_KEY}${page}`;

  if (genres !== '') {
    genres = `&with_genres=${genres}`;
    fetchUrl = `https://api.themoviedb.org/3/discover/movie?${API_KEY}${genres}${page}`;
  }

  const data = await fetch(fetchUrl)
    .catch((error) => {
      console.log('LOAD ERROR: ', error);
    });
  const movies = await data.json();
  console.log(movies);

  return movies;
}

export const setInStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));

export const getFromStorage = (key) => JSON.parse(localStorage.getItem(key));

export const fetchGenres = async () => {
  const data = await fetch(`https://api.themoviedb.org/3/genre/movie/list?${API_KEY}`)
    .catch((error) => {
      console.log('LOAD ERROR: ', error);
    });
  const result = await data.json()
    .catch((error) => {
      console.log('json ERROR: ', error);
    });
  console.log(result);
  setInStorage('genresList', result.genres);
  return (result.genres);
};

export const filterByReference = (arr1, arr2) => {
  let res = [];
  res = arr1.filter((el) => arr2.find((element) => element === el.id));
  return res.slice(0, 3);
};

fetchGenres();
