import s from './movies-list.module.css';
import { Link, useLocation } from 'react-router-dom';


const MoviesList = ({ movies }) => {

  return (
    <>
      <ul>
        {movies &&
          movies.map(movie => {
            const { id, title } = movie;
            return (
              <li key={id}>
                <Link to={`/movies/${id}`}>{title}</Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default MoviesList;
