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

function Review({ s_id }) {
  const { user } = useContext(userContext)
  const [review, setReview] = useState({
    seriesId: s_id,
    review: '',
    star: 0
  });
  const [mode, setMode] = useState("adde")
  useEffect(() => {
    if (user) {
      axios.get(`http://localhost:6969/api/reviews/useReview?s_id=${s_id}&u_id=${user._id}`)
        .then(res => {
          // console.log('res.userReview', res.data.userReview)
          setReview({ ...review, ...res.data.userReview[0] })
          if (res.data.userReview[0]) {
            setMode("edite")
          }
        }).catch(err => console.log(err))

    }
  }, [user])
  const stars = Array(5).fill(0);

  const handleClick = (value) => {
    setReview({ ...review, star: value })
  };
  const handaleChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
    //  console.log('e.target.value', e.target.value)
  }
  const addReview = () => {
    if (review.review.length === 0 || review.star === 0) {

      toast.warn('Pleace rate and review first');
    } else {
      //  console.log(review);
      axios.post(`http://localhost:6969/api/reviews/addReview`, { ...review, userId: user['_id'] })
        .then(res => {

          toast[res.data.type](res.data.message);
        })
      setTimeout(() => {

        window.location.reload()
      }, 2000)
    }

  }

  const updateReview = () => {
    alert("udat fun")
  }
  const deleteReview = () => {
    alert("udat fun")
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
        {/* {console.log('review', review)} */}
        <h5 className="mb-4">Reviews Section</h5>
        <div className="flex-row-box stars-container">
          <span>

            {stars.map((_, index) => {
              return (
                <FaStar
                  key={index}
                  size={24}
                  onClick={() => handleClick(index + 1)}
                  color={review.star > index ? colors.orange : colors.grey}
                  style={{
                    marginRight: 10,
                    cursor: "pointer",
                  }}
                />
              );
            })}
            {review.star || "No Rating"}
          </span>


        </div>
        <div className="mt-3">

          <form>
            <div className="form-group">
              <label>Your Review</label>
              <textarea name='review' value={review.review} className="form-control mt-3" onChange={handaleChange}></textarea>
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
