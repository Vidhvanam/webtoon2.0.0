import React, { useEffect, useState } from "react";
import axios from "axios";
import { HiUserCircle } from "react-icons/hi";
import { FaStar } from "react-icons/fa";
import "./seriesInfo.css";

function AllReviews({ s_id }) {
  const [reviews, setReviews] = useState([]);
  const stars = Array(5).fill(0);

  const StarsHtml = ({ givenStars }) => {
    return stars.map((_, index) => {
      return (
        <FaStar
          key={index}
          size={24}
          color={givenStars > index ? "var(--main-color)" : "gray"}
          style={{
            marginRight: 10,
          }}
        />
      );
    });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:6969/api/reviews/${s_id}`)
      .then((res) => {
        // console.log('res.data.reviews', res.data.reviewsData)
        setReviews(res.data.reviewsData);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <div className="flex-col-box all-reviews">
      <h3>All Reviews</h3>

      {reviews.map((review, index) => {
        const date = new Date(review.date);
        // console.log("reviews", reviews);
        return (
          <div className="review-container " key={review._id}>
            <div className="person flex-row-box">
              <HiUserCircle size="70" />
              <div>
                {console.log('review..e', review)}
                <div>
                  <b>{review.userId?.userName}</b>
                </div>
                <small>{date.toDateString()}</small>
              </div>
              <div>
                <StarsHtml givenStars={review.star} />
              </div>
            </div>
            <div className="review">
              <div className="review-txt">{review.review}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default AllReviews;
