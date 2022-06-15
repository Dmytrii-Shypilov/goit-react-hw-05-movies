import s from './cast.module.css';

import { API } from 'pages/services/fetch';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Cast = () => {
  const [cast, setCast] = useState({
    actors: [],
    loading: false,
    error: null,
  });
  const { movieId } = useParams();

  useEffect(() => {
    setCast(prevState => {
      return {
        ...prevState,
        loading: true,
      };
    });
    const fetchCast = async () => {
      try {
        const fetched = await API.fetchCastById(movieId);
        const actors = fetched.data.cast;
        setCast(prevState => {
          return {
            ...prevState,
            loading: false,
            actors,
          };
        });
      } catch (error) {
        setCast(prevState => {
          return {
            ...prevState,
            loading: false,
            error: error.mesage,
          };
        });
      }
    };
    fetchCast();
  }, [movieId]);

  const elements = cast.actors.map(actor => {
    const { profile_path, original_name, character } = actor;
    const image = profile_path
      ? `https://image.tmdb.org/t/p/w500${profile_path}`
      : 'https://sd.keepcalms.com/i/keep-calm-poster-not-found.png';



    return (
      <li className={s.listItem}>
        <img className={s.image} src={image} alt="" />

        <div className={s.meta}>
          <p className={s.info}>{original_name}</p>
          <p className={s.info}>
            Character: <span className={s.character}>{character}</span>
          </p>
        </div>
      </li>
    );
  });

const {actors, loading, error} = cast

  return (
    <section className={s.section}>
      {loading && <p>Loading...</p>}
      {error && (
        <>
          <p>Server error occured</p>
          <p>{error}</p>
        </>
      )}
      <h2 className={s.title}>Cast</h2>
      <ul className={s.list}>
      {actors.length>0 ? elements : <div className={s.message}>There are no cast details</div>}
      </ul>
    </section>
  );
};

export default Cast;
