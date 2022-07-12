import Header from './Header';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';

// import HomePage from 'pages/HomePage';
// import MoviesPage from 'pages/MoviesPage';
// import MovieDetailsPage from 'pages/MovieDetailsPage';
// import Cast from './Cast';
// import Reviews from './Reviews';
// import NotFoundPage from './NotFoundPage';

const HomePage = lazy(()=> import('pages/HomePage'))
const MoviesPage = lazy(()=> import('pages/MoviesPage'))
const MovieDetailsPage = lazy(()=> import('pages/MovieDetailsPage'))
const Cast = lazy(()=> import('./Cast'))
const Reviews = lazy(()=> import('./Reviews'))
// const NotFoundPage = lazy(()=> import('./NotFoundPage'))

export const App = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<p>...Loading</p>}>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/movies" element={<MoviesPage />}></Route>
          <Route path="/movies/:movieId" element={<MovieDetailsPage/>}>
            <Route path="cast" element={<Cast/>}/>
            <Route path="reviews" element={<Reviews/>}/>
          </Route>
          <Route path="*" element={<Navigate to="/" replace/>}></Route>
        </Routes>
      </Suspense>
    </>
  );
};
