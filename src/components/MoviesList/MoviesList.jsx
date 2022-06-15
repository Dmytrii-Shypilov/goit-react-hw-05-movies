import s from './movies-list.module.css';
import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';


const MoviesList = ({ movies }) => {
const location = useLocation()
  return (
    <section className={s.section}>
      <ul className={s.list}>
        {movies &&
          movies.map(movie => {
            const { id, title } = movie;
            return (
              <li key={id} className={s.listItem}>
                <Link className={s.link} state={{from: location}} to={`/movies/${id}`}>{title}</Link>
              </li>
            );
          })}
      </ul>
    </section>
  );
};

export default MoviesList;

MoviesList.propsDefault = {
  movies: [],
}

MoviesList.propTypes = {
movies: PropTypes.arrayOf(PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
}))
}
