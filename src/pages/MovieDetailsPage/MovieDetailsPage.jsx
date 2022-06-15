import s from './movie-details.module.css';
import {
  useParams,
  NavLink,
  useNavigate,
  Outlet,
  useLocation,
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import { API } from 'pages/services/fetch';

const getClassName = ({isActive}) => {
  return isActive ? `${s.link} ${s.active}` : s.link
}

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from || '/';

  const [movie, setMovie] = useState({
    item: {},
    error: null,
    loading: false,
  });

  useEffect(() => {
    setMovie(prevState => {
      return {
        ...prevState,
        loading: true,
      };
    });
    const fetchMovie = async () => {
      try {
        const { data } = await API.byId(movieId);

        setMovie(prevState => {
          return {
            ...prevState,
            loading: false,
            item: data,
          };
        });
      } catch (error) {
        setMovie(prevState => {
          return {
            ...prevState,
            loading: false,
            error: error.message,
          };
        });
      }
    };
    fetchMovie();
  }, [movieId]);

  const goBack = () => {
    navigate(from);
  };

  const { item, loading, error } = movie;
  const { vote_average, poster_path, title, overview, genres } = item;
  const image = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : 'https://sd.keepcalms.com/i/keep-calm-poster-not-found.png';

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && (
        <>
          <p>Server error occured</p>
          <p>{error}</p>
        </>
      )}
      {Object.keys(item).length > 0 && (
        <div>
          <section className={s.section}>
            <button className={s.button} onClick={goBack}>
              Go back
            </button>
            <div className={s.movie}>
              <img
                className={s.image}
                width="220"
                height="auto"
                src={image}
                alt=""
              />

              <ul className={s.linksList}>
                <li className={s.listItem}>
                  <NavLink
                    state={{ from }}
                    className={getClassName}
                    to={`/movies/${movieId}/cast`}
                  >
                    Cast
                  </NavLink>
                </li>
                <li className={s.listItem}>
                  <NavLink
                    state={{ from }}
                    className={getClassName}
                    to={`/movies/${movieId}/reviews`}
                  >
                    Reviews
                  </NavLink>
                </li>
              </ul>

              <div className={s.description}>
                <h2 className={s.title}>{title}</h2>
                <span className={s.info}>
                  Users Score: <span className={s.vote}>{vote_average}</span>
                </span>

                <span className={s.info}>Overview:</span>
                <p>{overview}</p>

                <span className={s.info}>
                  Genres:
                  <span className={s.genres}>
                    {genres && genres.map(({ name }) => name).join(', ')}
                  </span>
                </span>
              </div>
            </div>
          </section>
          <Outlet />
        </div>
      )}
    </>
  );
};

export default MovieDetailsPage;
