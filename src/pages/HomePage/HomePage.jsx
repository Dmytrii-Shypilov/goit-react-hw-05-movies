import s from './home-page.module.css';
import MoviesList from 'components/MoviesList';
import { useState, useEffect } from 'react';

import { API } from 'services/fetch';

const HomePage = () => {
  const [trendMovies, SetTrendMovies] = useState({
    movies: [],
    loading: false,
    error: null,
  });

  useEffect(() => {
    SetTrendMovies(prevState => {
      return {
        ...prevState,
        loading: true,
      };
    });
    async function fetchTrendMovies() {
      try {
        const fetched = await API.trending();
        const movies = fetched.data.results;
        SetTrendMovies(prevState => {
          return {
            ...prevState,
            loading: false,
            movies,
          };
        });
      } catch (error) {
        SetTrendMovies(prevState => {
          return {
            ...prevState,
            loading: false,
            error: error.message,
          };
        });
      }
    }
    fetchTrendMovies();
  }, []);

  const { movies, loading, error } = trendMovies;

  return (
    <section className={s.section}>
      {loading && <p>Loading...</p>}
      {error && (
        <>
          <p>Server error occured</p>
          <p>{error}</p>
        </>
      )}
      <h1 className={s.title}>Movies in trend</h1>
      <MoviesList movies={movies} />
    </section>
  );
};

export default HomePage;
