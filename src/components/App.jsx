import Header from './Header';
import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';

import HomePage from 'pages/HomePage';
import MoviesPage from 'pages/MoviesPage';
import MovieDetailsPage from 'pages/MovieDetailsPage';
import Cast from './Cast';
import Reviews from './Reviews';
import NotFoundPage from './NotFoundPage';

export const App = () => {
  return (
    <div>
      <Header />
      <Suspense fallback={<p>...Loading</p>}>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/movies" element={<MoviesPage />}></Route>
          <Route path="/movies/:movieId" element={<MovieDetailsPage/>}>
            <Route path="cast" element={<Cast/>}/>
            <Route path="reviews" element={<Reviews/>}/>
          </Route>
          <Route path="*" element={<NotFoundPage/>}></Route>
        </Routes>
      </Suspense>
    </div>
  );
};
