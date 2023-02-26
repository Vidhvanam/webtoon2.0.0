import { useEffect, useState, useContext } from "react";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import { userContext } from '../UserContext'
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const colors = {
  orange: "var(--main-color)",
  grey: "#a9a9a9",
};

function Review({ reviews, setReviews, s_id }) {
  const { user } = useContext(userContext)
  const [userReview, setUserReview] = useState({

    seriesId: s_id,
    review: '',
    star: 0
  });
  const [mode, setMode] = useState("adde")
  useEffect(() => {
    if (user) {

      // console.log({reviews});
      reviews.filter((review) => {
        if (review.userId._id === user._id) {
          setUserReview(review)
          setMode("update")
        }
      })
    }
  }, [user, reviews])
  const stars = Array(5).fill(0);

  const handleClick = (value) => {
    setUserReview({ ...userReview, star: value })
  };
  const handaleChange = (e) => {
    setUserReview({ ...userReview, [e.target.name]: e.target.value });
    //  console.log('e.target.value', e.target.value)
  }
  const addReview = () => {
    if (userReview.review.length === 0 || userReview.star === 0) {

      toast.warn('Pleace rate and review first');
    } else {
      axios.post(`http://localhost:6969/api/reviews/addReview`, { ...userReview, userId: user['_id'] })
        .then(res => {
          //  console.log(res.data.newReview);
          toast[res.data.type](res.data.message);
          if (res.data.type === "success") {
            const newReview ={...res.data.newReview,userId :user}
            setReviews(prevReviews => ([...prevReviews , newReview ]))
            console.log(newReview);
            setMode("update")

          }
        })

    }

  }

  const updateReview = () => {
    if (userReview.review.length === 0 || userReview.star === 0) {

      toast.warn('Pleace rate and review first');
    } else {
      axios.post(`http://localhost:6969/api/reviews/updateReview/${userReview._id}`, { ...userReview, userId: user['_id'] })
        .then(res => {

          toast[res.data.type](res.data.message);
          if (res.data.type === "success") {
            setReviews(prevReviews => prevReviews.map(item => {

              if (item.userId._id === user._id) {
                console.log("inside");
                item.review = userReview.review
                item.star = userReview.star
                return item
              } else {
                return item
              }
            }))
          }
        })

    
    }
  }
  const deleteReview = () => {
    axios.post(`http://localhost:6969/api/reviews/deleteReview/${userReview._id}`)
      .then(res => {
          
        toast[res.data.type](res.data.message);
        if (res.data.type === "error") {
          setReviews(prevReviews =>  prevReviews.filter(item => item.userId._id !== user._id))
          setMode("adde")
          setUserReview({
            seriesId: s_id,
            review: '',
            star: 0
          })
        }
      })
         
  }

  return (
    user ? (
      <div >
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBa={false}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={true}
          theme="light"
        />
        <h5 className="mb-4">Reviews Section</h5>
        <div className="flex-row-box stars-container">
          <span>

            {stars.map((_, index) => {
              return (
                <FaStar
                  key={index}
                  size={24}
                  onClick={() => handleClick(index + 1)}
                  color={userReview.star > index ? colors.orange : colors.grey}
                  style={{
                    marginRight: 10,
                    cursor: "pointer",
                  }}
                />
              );
            })}
            {userReview.star || "No Rating"}
          </span>


        </div>
        <div className="mt-3">

          <form>
            <div className="form-group">
              <label>Your Review</label>
              <textarea name='review' value={userReview.review} className="form-control mt-3" onChange={handaleChange}></textarea>
            </div>
            <div className="form-group">
              {mode === "adde" ? <button className="btn btn-primary btn-sm mt-3" type="button" onClick={addReview}>
                Review Now
              </button> : <div className="btn-container">

                <button className="btn btn-primary btn-sm my-3 " type="button" onClick={updateReview}>
                  Update Now
                </button>
                <button className="btn btn-danger btn-sm m-3" type="button" onClick={deleteReview}>
                  Delete Now
                </button>
              </div>
              }
            </div>
          </form>
        </div>



      </div>) :
      <NavLink to='/login' className='nav-link'>Login To Review</NavLink>

  );
}

export default Review;
