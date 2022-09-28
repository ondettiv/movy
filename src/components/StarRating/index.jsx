import React from 'react';
import './styles.css';

function StarRating({ rate }) {
  return (
    <div className="stars">
      {[...Array(5)].map((star, index) => {
        const id = index;
        const selectedStars = (Math.ceil(rate) / 2 > index + 1) ? 'checked' : '';
        return (
          <span key={id} className={`fa fa-star ${selectedStars}`} />
        );
      })}
    </div>
  );
}

export default StarRating;
