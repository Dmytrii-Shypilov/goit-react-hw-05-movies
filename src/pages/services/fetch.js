import axios from 'axios';

const key = '313da384ffe4ec90efea6fc8b4aa73ee';
const baseURL = `https://api.themoviedb.org/3/`;

const fetchByQuery = async query => {
  const movies = await axios.get(
    `${baseURL}search/movie?api_key=${key}&query=${query}`
  );
  return movies;
};

const fetchTrending = async () => {
  const movies = await axios.get(
    `${baseURL}trending/movie/week?api_key=${key}`
  );
  return movies;
};

const fetchById = async (id) => {
  const movies = await axios.get(
    `${baseURL}movie/${id}?api_key=${key}`
  );
  return movies;
}

const fetchCastById = async (id) => {
  const cast = await axios.get(`${baseURL}movie/${id}/credits?api_key=${key}`)
  return cast
}

const fetchReviewsById = async (id) => {
  const reviews = await axios.get(`${baseURL}movie/${id}/reviews?api_key=${key}`)
  return reviews
}

export const API = {
  byQuery: fetchByQuery,
  trending: fetchTrending,
  byId: fetchById,
  fetchReviewsById,
  fetchCastById,
};
