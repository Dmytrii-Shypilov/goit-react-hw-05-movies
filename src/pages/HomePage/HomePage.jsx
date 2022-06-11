import s from './home-page.module.css';
import MoviesList from 'components/MoviesList';
import { useState, useEffect } from 'react';

import { API } from 'pages/services/fetch';

const HomePage = () => {
  const [trendMovies, SetTrendMovies] = useState([]);

  useEffect(() => {
    async function fetchTrendMovies() {
      try {
        const data = await API.trending();
        const fetchedMovies = data.data.results;
        SetTrendMovies(fetchedMovies);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTrendMovies();
  }, []);

  return (
    <section className={s.section}>
      <h1 className={s.title}>Movies in trend</h1>
      <MoviesList movies={trendMovies} />
    </section>
  );
};

export default HomePage;
