import s from './movies-page.module.css';

import Form from 'components/Form';
import { API } from 'pages/services/fetch';
import MoviesList from 'components/MoviesList';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState({
    films: [],
    error: null,
    loading: false,
  });

  const query = searchParams.get('query');

  useEffect(() => {
    async function fetchMovies() {
      if (!query) {
        return;
      }

      setMovies(prevState => {
        return {
          ...prevState,
          loading: true,
        };
      });
      try {
        const fetched = await API.byQuery(query);
        const fetchedMovies = fetched.data.results;
        setMovies(prevMovies => {
          return { ...prevMovies, films: fetchedMovies, loading: false };
        });
      } catch (error) {
        setMovies(prevState => {
          return {
            ...prevState,
            loading: false,
            error: error.message,
          };
        });
      }
    }
    fetchMovies();
  }, [query]);

  const onSubmit = query => {
    setSearchParams({ query });
  };

  const { films, loading, error } = movies;
  return (
    <section className={s.section}>
      <Form onSubmit={onSubmit} />
      {loading && <p>Loading...</p>}
      {error && (
        <>
          <p>Server error occured</p>
          <p>{error}</p>
        </>
      )}
      <MoviesList movies={films} />
    </section>
  );
};

export default MoviesPage;
