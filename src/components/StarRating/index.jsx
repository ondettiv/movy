import React from 'react';
import './styles.css';

function StarRating({ rate }) {
  const percentageRate = Math.trunc(((rate * 100) / 10));

  return (
    <div className="stars">
      <div className="flex overflow-hidden" style={{ width: `${percentageRate}%` }}>
        {[...Array(5)].map((star, index) => {
          const id = index;

          return (
            <span key={id} className="fa fa-star pr-[2px]" />
          );
        })}
        <div className="absolute flex">
          {[...Array(5)].map((star, index) => {
            const id = index;

            return (
              <span key={id} className="fa fa-star-o pr-[2px]" />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default StarRating;
