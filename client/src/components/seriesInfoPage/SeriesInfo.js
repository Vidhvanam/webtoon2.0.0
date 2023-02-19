import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import Review from "./Review";
import AllReviews from "./AllReviews";

function SeriesInfo() {
  const { id } = useParams();
  const [series, setSeries] = useState({});
  const [episodesData, setEpisodesData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:6969/api/series/${id}`)
      .then((series) => {
        // console.log(series.data.seriesInfo);

        setSeries(series.data.seriesInfo);
      })
      .catch((err) => console.log(err));
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
      <div className="main-container ">
        {/* {console.log("episodesData : ", episodesData)} */}
        <div className="series-container">
          {/* <h1>{id}</h1> */}
          <div className="series-info">
            <h1>{series.name}</h1>
            <h3>{series.author}</h3>
            <p>{series.description}</p>
            <div className="flex-row-box gap-2">
              <span>
                <b>Subscribers : </b>
                {series.subscribers}
              </span>
              <span>
                <b>Rating :</b> {series.ratting}
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
        <Review s_id={id}/>
        <AllReviews s_id={id}/>
      </div>
        
      </div>
    </>
  );
}

export default SeriesInfo;
