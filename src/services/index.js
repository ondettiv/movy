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
      fetchUrl = `https://api.themoviedb.org/3${url}${movieId}?${API_KEY}&append_to_response=images,videos`;
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
  setInStorage('genresList', result.genres);
  return (result.genres);
};
