import { NavLink } from "react-router-dom"
import { AiFillStar } from "react-icons/ai";
import { useState,useContext } from "react";
import { userContext } from './UserContext';

import noImg from "D:/sem6/ReactjsProjects/webtoon/client/src/img/noimage.png"

export default function Card({ series, mode="view",label ,handleSubArray }) {
  const {user , setUser} = useContext(userContext)

    const colors = { thriller:"#c00355",romance : "#fd337f" ,action:"#006afa" ,fantasy:"#8b00e9" , sliceoflife:"#9ab710" ,comedy : "#eea800" ,supernatural:"#7a41e9"} 
    const color = series.genres[0].split(" ").join("").toLowerCase()
    const link= user?.roll === "admin" ?   `/series/admin/${series._id}`: `/series/${series._id}`
    const [isChecked, setIsChecked] = useState(false);
    
    function handleCheckboxChange() {
      setIsChecked(!isChecked);
      handleSubArray(series._id)
    }
  const inpClass = mode === "view" ? "dis-none" : "card-inp" 
  return (

    mode === "view" ?

      <NavLink className={`card-container `} to={link} style={{backgroundColor:"white"}}>
        <img src={process.env.REACT_APP_IMG_PATH + series.img} className="card-img-top" alt="..." onError={(e)=>e.target.src =noImg}/>
        <div className="card-img-overlay">
          <h5 className="card-title">{series.name}</h5>
          <p style={{color :colors[color]}} className="pos-bot">{series.genres.join(' / ')}</p>
          <div>{series.author}</div>
          <AiFillStar style={{ color: 'var(--main-color)' }} /> <span className="main-txt-color">{series.ratting}/5</span>
           <div className="main-txt-color">{series.completed ? "completed" : "on going"}</div> 
        <div>{new Date(series.date).getDate()+ "/" + (new Date(series.date).getMonth()+1) + "/" + new Date(series.date).getFullYear()}</div>
        </div>
        <div className="card hover-component" style={{backgroundColor :colors[color]}}>
          <h5 className="card-title">{series.name}</h5>
          <p className="card-text">{series.description.substring(0, 220) + '....'}</p>
        </div>
        
      </NavLink> :

      <label className={`card-container ${isChecked ? "label-checked" : ""}`}  htmlFor={label} >
        <img src={process.env.REACT_APP_IMG_PATH + series.img} className="card-img-top" alt="..." onError={(e)=>e.target.src =noImg} style={{opacity:"0.8"}}/>
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