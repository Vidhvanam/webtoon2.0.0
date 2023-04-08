import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { userContext } from "../UserContext"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { FaStar } from "react-icons/fa";
import noImg from "../../img/noimage.png"
import { NavLink } from "react-router-dom"

export default function UserReviws() {
    const { user, setUser } = useContext(userContext)
    const [reviews, setReviews] = useState([])
    const [reArray, setReArray] = useState({})
    const [mode, setMode] = useState("view")
    const stars = Array(5).fill(0);
    const [selectedAll, setSelectedAll] = useState(false)
    const labelClass = selectedAll ? "re-selected" : ""
    useEffect(() => {
        async function getData() {

            if (user) {
                const userSubscribes = user.subscribes
                const res = await axios.get(`http://localhost:6969/api/reviews/AllUserReviews/${user._id}`)

                if (res.data.type === "success") {
                    const reviewsData = res.data.reviewsData
                    setReviews(reviewsData)
                    let temp = {}


                    reviewsData.forEach(item => {

                        temp[item._id] = { id: item._id, isChecked: false }
                    })
                    setReArray(temp)
                }
            }
        }
        getData()
    }, [user])

    function handlereArray(s_id, e) {
        let isChecked = !reArray[s_id].isChecked
        console.log(reArray[s_id], isChecked);
        setReArray({ ...reArray, [s_id]: { ...reArray[s_id], isChecked } })

        e.target.parentElement.classList.toggle("re-selected")

    }

    function selectAll(e) {
        let bool = selectedAll ? false : true
        let temp = {}


        Object.values(reArray).forEach(val => {

            temp[val.id] = { id: val.id, isChecked: bool }
        })
        setReArray(temp)
        setReArray(temp)
        setSelectedAll(!selectedAll)

    }
    function handelMode() {
        setMode(prev => prev === "view" ? "edit" : "view")
    }
    function cancleEdit() {
        let temp = {}
        reviews.forEach(item => {

            temp[item._id] = { id: item._id, isChecked: false }
        })
        setReArray(temp)
        setSelectedAll(false)
        handelMode()
    }
    function deleteSub() {
        const r_id = []
        Object.values(reArray).forEach(val => {
            if (val.isChecked) {
                r_id.push(val.id)
            }
        })
        console.log({ r_id });
        if (r_id.length === 0) {
            toast.info("Select review to delete");
        } else {


            axios.delete(`http://localhost:6969/api/reviews/reviewsDelete?r_ids=${[...r_id]}`, { data: reArray, action: 'unSub' }).then(res => {
                if (res.data.type === "success") {

                    toast[res.data.type](res.data.message);
                    setReviews(reviews.filter(item => !r_id.includes(item._id)))
                } else {

                    toast[res.data.type](res.data.message);
                }
            })
        }
    }


    return (
        <div className="main-container">

            <ToastContainer position="top-center"
                autoClose={2000}
                hideProgressBa={false}
                closeOnClick={true}
                pauseOnHover={true}
                draggable={true}
                theme="light" />
            {console.log({ reArray, reviews })}
            <div className="subscribes-container">
                {

                    !reviews.length ? (<div className="flex-col-box color-gray">
                        <img src={noImg} />
                        <h3>No Reviews.</h3>
                        <h5>You haven’t reviewed  any series.</h5>

                    </div>) :
                        (
                            <>
                                <div className="flex-row-box js-space-bet">
                                    <h2 className=''>Reviews</h2>
                                    <span>
                                        {mode === "view" ?
                                            <button className="btn btn-success" onClick={() => handelMode()}>Edit</button> :
                                            (<div className="flex-row-box gap-2">

                                                <button className="btn btn-danger " onClick={() => deleteSub()}>Delete</button>
                                                <button className="btn btn-primary" onClick={(e) => selectAll(e)}>{selectedAll ? "Unselect All" : "Select All"}</button>
                                                <button className="btn btn-success" onClick={() => cancleEdit()}>Cancel</button>
                                            </div>
                                            )
                                        }
                                    </span>
                                </div>

                                <div className="flex-row-box gap-4 sub  mt-3 ">
                                    {
                                        mode === "view" ? (
                                            reviews.map((review, index) => {
                                                const date = new Date(review.date);
                                                return (
                                                    <NavLink to={`/series/${review.seriesId._id}`} className="review-container link-style" key={review._id}>

                                                        <div className="person flex-row-box">
                                                            {/* <HiUserCircle size="70" /> */}

                                                            <div>
                                                                <div>
                                                                    <span>Your Review For : <b>{review.seriesId.name}</b></span>
                                                                </div>
                                                                <small>{date.toDateString()}</small>
                                                            </div>
                                                            <div>
                                                                {/* <StarsHtml givenStars={review.star} /> */}
                                                                {stars.map((_, index) => {
                                                                    return (
                                                                        <FaStar
                                                                            key={index}
                                                                            size={24}
                                                                            color={review.star > index ? "var(--main-color)" : "gray"}
                                                                            style={{
                                                                                marginRight: 10,
                                                                            }}
                                                                        />
                                                                    )
                                                                })}
                                                            </div>

                                                        </div>
                                                        <div className="review">
                                                            <div className="review-txt">{review.review}</div>
                                                        </div>
                                                    </NavLink>
                                                );
                                            })
                                        ) : (
                                            reviews.map((review, index) => {
                                                const date = new Date(review.date);

                                                return (
                                                    <label className={`review-container re-label ${labelClass}`} key={review._id}>
                                                        <div className="person flex-row-box">
                                                            {/* <HiUserCircle size="70" /> */}

                                                            <div>
                                                                <div>
                                                                    <span>Your Review For : <b>{review.seriesId.name}</b></span>
                                                                </div>
                                                                <small>{date.toDateString()}</small>
                                                            </div>
                                                            <div>
                                                                {/* <StarsHtml givenStars={review.star} /> */}
                                                                {stars.map((_, index) => {
                                                                    return (
                                                                        <FaStar
                                                                            key={index}
                                                                            size={24}
                                                                            color={review.star > index ? "var(--main-color)" : "gray"}
                                                                            style={{
                                                                                marginRight: 10,
                                                                            }}
                                                                        />
                                                                    )
                                                                })}
                                                            </div>

                                                        </div>
                                                        <div className="review">
                                                            <div className="review-txt">{review.review}</div>
                                                        </div>
                                                        <input type="checkbox" name={review._id} className="review-check" onChange={(e) => handlereArray(review._id, e)} checked={reArray[review._id].isChecked} />

                                                    </label>
                                                );
                                            })
                                        )
                                    }

                                </div>
                            </>
                        )
                }

            </div>

        </div>
    )
}