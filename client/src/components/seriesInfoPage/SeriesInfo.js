import { useContext, useEffect, useState, useMemo } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import Review from "./Review";
import AllReviews from "./AllReviews";
import { FaStar } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { ImUserPlus } from "react-icons/im";
import { userContext } from "../UserContext";
import Pagination from '../pagination/Pagination';
import WTLoader from "../WTLoader";
let PageSize = 5;


function SeriesInfo() {
  const { user, setUser } = useContext(userContext)
  const [loading, setLoading] = useState(true)

  const { id } = useParams();
  const [series, setSeries] = useState({});
  const [episodesData, setEpisodesData] = useState([]);
  const [reviews, setReviews] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return episodesData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, episodesData]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}api/series/${id}`)
      .then((series) => {
        // console.log(series.data.seriesInfo);

        setSeries(series.data.seriesInfo);
      })
      .catch((err) => console.log(err));

    axios
      .get(`${process.env.REACT_APP_API}api/reviews/${id}`)
      .then((res) => {
        // console.log('res.data.reviews', id)
        setReviews(res.data.reviewsData);
      })
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}api/episodes/${id}`)
      .then((episodes) => {
        // console.log(episodes.data.episodeInfo);
        setLoading(false)
        setEpisodesData(episodes.data.episodeInfo);
      })
      .catch((err) => console.log(err));
  }, [series]);

  const episodesList = currentTableData.map((episode) => {
    const createdDate = new Date(episode.createdDate);
    const className = `flex-row-box episode ${episode?.status === "removed" ? "removed-ep" : ""}`
    return (
      <NavLink
        key={episode._id}
        to={`/episode/${episode.url}`}
        className={className}
      >
        <span>{episode.name}</span>
        <div>
          {episode?.status === "removed" ? <span className="text-danger">Removed (will be availabel soon)</span> : null}
          <span className="mr-5">{createdDate.toDateString()}</span>
          <span># {episode.ep_num}</span>
        </div>
      </NavLink>
    );
  });

  function subscribe(action) {
    let newSubcribes
    if (action === "unSub") {
      newSubcribes = user.subscribes.filter(item => item !== id)
    } else {
      newSubcribes = [...user.subscribes, id]
    }
    axios.put(`${process.env.REACT_APP_API}api/user/unSubscribe/${user._id}`, { data: newSubcribes, action, s_id: [id] }).then(res => {
      if (res.data.type === "success") {

        setUser(res.data.upUser)
        localStorage.setItem("user", JSON.stringify(res.data.upUser))
        if (action === "unSub") {

          setSeries({ ...series, subscribers: series.subscribers - 1 })
        } else {
          setSeries({ ...series, subscribers: series.subscribers + 1 })

        }
        toast[res.data.type](res.data.message);
      } else {

        toast[res.data.type](res.data.message);
      }
    })
  }
  if (loading) {
    return <WTLoader />
  }
  return (
    <>
      {/* {console.log(user)} */}
      <div className="main-container ">
        <ToastContainer position="top-center"
          autoClose={2000}
          hideProgressBa={false}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={true}
          theme="light" />
        <div className="series-container">
          <div className="series-info">
            <div className="d-flex align-items-center gap-3 ">

              <h1>{series.name}</h1>
              <span>{new Date(series.date).toDateString()}</span>
            </div>
            <h3>{series.author?.name}</h3>
            <p>{series.description}</p>
            <div className="flex-row-box gap-4">
              <span className="flex-row-box gap-1 center-flex">
                <ImUserPlus className="series-icon " />
                <b>{series.subscribers}</b>
              </span>
              <span className="flex-row-box gap-1 center-flex">
                < FaStar className="series-icon" />

                <b>{series.ratting}</b>
              </span>
              {user && (user?.subscribes.includes(series._id) ? <button className="btn btn-sub  btn-unsub " onClick={() => subscribe("unSub")}>UnSubscribe</button>
                : <button className="btn btn-sub" onClick={() => subscribe("sub")}><b>+</b>Subscribe</button>)

              }

            </div>
          </div>
          <div className="flex-col-box gap-2 episodes-container ">
            {episodesList.length ? (
              <>
                {episodesList}
                <Pagination
                  className="pagination-bar"
                  currentPage={currentPage}
                  totalCount={episodesData.length}
                  pageSize={PageSize}
                  onPageChange={page => setCurrentPage(page)}
                />
              </>
            ) : (
              <h3 className="text-capitalize">no episode is added yet</h3>
            )}
          </div>
        </div>
        <div className="bg-white rounded shadow-sm  mb-5 series-container rating-review-select-page">
          <Review s_id={id} reviews={reviews} setReviews={setReviews} />
          <AllReviews reviews={reviews} />
        </div>

      </div>
    </>
  );
}

export default SeriesInfo;
