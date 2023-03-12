import {  useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import AllReviews from "../seriesInfoPage/AllReviews";
import { FaStar } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { ImUserPlus } from "react-icons/im";


function SeriesInfoAdmin() {
  const { id } = useParams();
  const [series, setSeries] = useState({});
  const [episodesData, setEpisodesData] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:6969/api/series/${id}`)
      .then((series) => {
        // console.log(series.data.seriesInfo);

        setSeries(series.data.seriesInfo);
      })
      .catch((err) => console.log(err));

      axios
      .get(`http://localhost:6969/api/reviews/${id}`)
      .then((res) => {
        // console.log('res.data.reviews', id)
        setReviews(res.data.reviewsData);
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:6969/api/episodes/${id}`)
      .then((episodes) => {
        // console.log(episodes.data.episodeInfo);

        setEpisodesData(episodes.data.episodeInfo);
      })
      .catch((err) => console.log(err));
  }, [series]);

  const episodesList = episodesData.map((episode) => {
    const createdDate = new Date(episode.createdDate);
    return (
      <NavLink
        key={episode._id}
        to={`/episode/${episode.url}`}
        className="flex-row-box episode"
      >
        <span>{episode.name}</span>
        <div>
          <span className="mr-5">{createdDate.toDateString()}</span>
          <span># {episode.ep_num}</span>
        </div>
      </NavLink>
    );
  });

  
  return (
    <>
     {/* {console.log(user)} */}
      <div className="main-container ">
      <ToastContainer  position="top-center"
          autoClose={2000}
          hideProgressBa={false}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={true}
          theme="light"/>
        <div className="series-container">
          <div className="series-info">
            <div className="d-flex align-items-center gap-3 ">

            <h1>{series.name}</h1>
            <span>{new Date(series.date).toDateString()}</span>
            </div>
            <h3>{series.author}</h3>
            <p>{series.description}</p>
            <div className="flex-row-box gap-4">
              <span className="flex-row-box gap-1 center-flex">
                <ImUserPlus className="series-icon "/>
                <b>{series.subscribers}</b>
              </span>
              <span className="flex-row-box gap-1 center-flex">
                < FaStar className="series-icon"/> 

                 <b>{series.ratting}</b>
              </span>
        
            
            </div>
          </div>
          <div className="flex-col-box gap-2 episodes-container ">
            {episodesList.length ? (
              <>
                {episodesList}

              </>
            ) : (
              <h3 className="text-capitalize">no episode is added yet</h3>
            )}
          </div>
        </div>
      <div className="bg-white rounded shadow-sm  mb-5 series-container rating-review-select-page">
        <AllReviews reviews={reviews}/>
      </div>
        
      </div>
    </>
  );
}

export default SeriesInfoAdmin;
