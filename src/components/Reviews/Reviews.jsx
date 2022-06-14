import s from './reviews.module.css';

import { API } from 'pages/services/fetch';
import { useEffect, useState } from 'react';
import { createSearchParams, useParams } from 'react-router-dom';

const Reviews = () => {
  const [reviews, setReviews] = useState({});
  const { movieId } = useParams();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviews = await API.fetchReviewsById(movieId);
        setReviews(reviews)
      } catch (error) {}
    };
  }, [movieId]);

  return (
    <div>
      <h2>Reviews</h2>
      <p></p>
      <p></p>
    </div>
  );
};

export default Reviews