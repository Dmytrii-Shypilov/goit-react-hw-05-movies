import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { API } from 'pages/services/fetch';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState({
    item: [],
    error: null,
  });

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const {data} = await API.byId(movieId);
        
        setMovie(prevState => {
          return { ...prevState, item: data };
        });
      } catch (error) {
        
      }
    };
    fetchMovie()
  }, [movieId]);

  const {item} = movie
  console.log(movie.item)

 
  return (
    <section>
      <button></button>
      <div>
        <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="" />
        <div>
          <h2>{item.title}</h2>
          <span>Users Score:</span>
          <span></span>
          <span>Overview:</span>
          <span></span>
          <span>Genres:</span>
          <span></span>
        </div>
      </div>
    </section>
  );
};

export default MovieDetailsPage;
