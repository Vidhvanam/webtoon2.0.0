import { NavLink } from "react-router-dom"
import { AiFillStar } from "react-icons/ai";
import { useState } from "react";

export default function Card({ series, mode="view",label ,handleSubArray }) {


    const [isChecked, setIsChecked] = useState(false);
  
    function handleCheckboxChange() {
      setIsChecked(!isChecked);
      handleSubArray(series._id)
    }
  const inpClass = mode === "view" ? "dis-none" : "card-inp" 
  return (

    mode === "view" ?

      <NavLink className={`card-container `} to={`/series/${series._id}`}>
        <img src={process.env.REACT_APP_IMG_PATH + series.img} className="card-img-top" alt="..." />
        <div className="card-img-overlay">
          <h5 className="card-title">{series.name}</h5>
          <p className="pos-bot">{series.genres.join(' / ')}</p>
          <div>{series.author}</div>
          <AiFillStar style={{ color: 'var(--main-color)' }} /> <span className="main-txt-color">{series.ratting}/5</span>

        </div>
        <div className="card hover-component">
          <h5 className="card-title">{series.name}</h5>
          <p className="card-text">{series.description.substring(0, 220) + '....'}</p>
        </div>
      </NavLink> :

      <label className={`card-container ${isChecked ? "label-checked" : ""}`}  htmlFor={label} >
        <img src={process.env.REACT_APP_IMG_PATH + series.img} className="card-img-top" alt="..."  style={{opacity:"0.8"}}/>
        <div className="card-img-overlay" style={{pointerEvents:"none" ,opacity:"0.8"}}>
          <h5 className="card-title">{series.name}</h5>
          <p className="pos-bot">{series.genres.join(' / ')}</p>
          <div>{series.author}</div>
          <AiFillStar style={{ color: 'var(--main-color)' }} /> <span className="main-txt-color">{series.ratting}/5</span>

        </div>

        <input type="checkbox" className={inpClass} id={label} onChange={handleCheckboxChange} checked={isChecked}/>
      </label>


  )
}