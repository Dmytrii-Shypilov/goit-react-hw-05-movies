import s from './movie-details.module.css';
import { useParams, NavLink, useNavigate, Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { API } from 'pages/services/fetch';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    item: {},
    error: null,
  });

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const { data } = await API.byId(movieId);

        setMovie(prevState => {
          return { ...prevState, item: data };
        });
      } catch (error) {
        setMovie(prevState => {
          return {
            ...prevState,
            error: error.message,
          };
        });
      }
    };
    fetchMovie();
  }, [movieId]);

  const goBack = () => {
    navigate(-1);
  };

  const { item } = movie;
  const { vote_average, poster_path, title, overview, genres } = item;

  return (
    <>
    <section className={s.section}>
      <button className={s.button} onClick={goBack}>
        Go back
      </button>
      <div className={s.movie}>
        <img
          className={s.image}
          width="220"
          height="auto"
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt=""
        />

        <ul className={s.linksList}>
          <li className={s.listItem}>
            <NavLink className={s.link} to={`/movies/${movieId}/cast`}>
              Cast
            </NavLink>
          </li>
          <li className={s.listItem}>
            <NavLink className={s.link} to={`/movies/${movieId}/reviews`}>
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
    </>
  );
};

export default MovieDetailsPage;
