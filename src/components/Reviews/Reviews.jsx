import s from './reviews.module.css';

import { API } from 'pages/services/fetch';
import { useEffect, useState } from 'react';
import { createSearchParams, useParams } from 'react-router-dom';

const Reviews = () => {
  const [reviews, setReviews] = useState({
    comments: [],
    loading: false,
    error: null,
  });
  const { movieId } = useParams();

  useEffect(() => {
    setReviews(prevState => {
      return {
        ...prevState,
        loading: true,
      }
    })
    const fetchReviews = async () => {
      try {
        const fetched = await API.fetchReviewsById(movieId);
        const reviews = fetched.data.results
        setReviews(prevState => {
          return {
            ...prevState,
            comments: reviews,
            loading: false,
          }
        })
      } catch (error) {
        setReviews(prevState=> {
          return {
            ...prevState,
            loading: false,
            error: error.message,
          }
        })
      }
    };
    fetchReviews()
  }, [movieId]);

  const elements = reviews.comments.map(comment => {
    const {author, content} = comment
    return (
      <li>
        <p className={s.author}>{author}</p>
        <p className={s.comment}>{content}</p>
      </li>
    )
  })

  const {comments, loading, error} = reviews


  return (
    <section className={s.section}>
      {loading && <p>Loading...</p>}
      {error && (
        <>
          <p>Server error occured</p>
          <p>{error}</p>
        </>
      )}
      <h2 className={s.title}>Reviews</h2>
     <ul className={s.list}>
      {comments.length>0 ? elements : <div className={s.message}>There are no comments yet</div>}
     </ul>
    </section>
  );
};

export default Reviews