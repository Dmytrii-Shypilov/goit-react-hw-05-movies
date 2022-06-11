import Header from './Header';
import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';

import HomePage from 'pages/HomePage';
import MoviesPage from 'pages/MoviesPage';
import MovieDetailsPage from 'pages/MovieDetailsPage';

export const App = () => {
  return (
    <div>
      <Header />
      <Suspense fallback={<p>...Loading</p>}>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/movies" element={<MoviesPage />}></Route>
          <Route path="/movies/:movieId" element={<MovieDetailsPage/>}></Route>
        </Routes>
      </Suspense>
    </div>
  );
};
