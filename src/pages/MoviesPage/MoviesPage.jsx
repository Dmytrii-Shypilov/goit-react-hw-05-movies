import Form from 'components/Form';
import { API } from 'pages/services/fetch';
import MoviesList from 'components/MoviesList';

import { useState, useEffect } from 'react';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState({
    films: [],
    error: null,
    loading: false,
  });

  useEffect(() => {
    async function fetchMovies() {
      if (query === '') {
        return;
      }

      setMovies({
        ...movies,
        loading: true,
      });
      try {
        const fetched = await API.byQuery(query);
        const fetchedMovies = fetched.data.results;
        setMovies(prevMovies => {
          return { ...prevMovies, films: fetchedMovies, loading: false };
        });
      } catch (error) {
        setMovies({
          ...movies,
          loading: false,
          error: error.message,
        });
      }
    }
    fetchMovies();
  }, [query]);

  const { films, loading } = movies;
  return (
    <>
      <Form onSubmit={setQuery} />
      {loading && <p>...Loading</p>}
      <MoviesList movies={films} />
    </>
  );
};

export default MoviesPage;
