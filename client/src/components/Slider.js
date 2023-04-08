import { useState, useContext, useEffect } from "react";
import { userContext } from './UserContext';
import axios from "axios"
import { NavLink } from "react-router-dom"



// const promotedSeries = [
//     {
//         img: "1TheUncommons_desktopbanner_launch-badge_A.png",
//         s_id: "63f1fa5535a2ec169bfefa93"
//     },
//     {
//         img: "1unOrdinary_Pivotal_Ep285_desktopbanner_B.png",
//         s_id: "63cac9ee305732edcfde1ae8"
//     },
//     {
//         img: "5A_Heartfelt_Andante_desktopbanner_launch-nobadge_B.png",
//         s_id: "63ef96724bcca37589763ec3"
//     },


// ]

export default function Slider({ promoSeries }) {
    const [promotedSeries, setPromotedSeries] = useState(promoSeries)
    const { user } = useContext(userContext)
    const [link, setLink] = useState("/series/")
    useEffect(() => {
        if (user) {
            if (user?.roll === "admin") {
                setLink("/series/admin/")
            }
        }
    }, [user])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}api/promotions/filter/all`)
            .then(res => {
                setPromotedSeries(res.data.promotions)
                // console.log(res.data.promotions);
            })
    }, [promoSeries])
    return (promotedSeries.length !== 0 &&

        < div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" data-interval="100">
            <div className="carousel-indicators">
                {promotedSeries.map((series, index) => {
                    if (index === 0) {
                        return <button key={index} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>

                    } else {
                        return <button key={index} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={`${index}`} aria-label={`Slide ${index}`}></button>

                    }
                })}
                {/* <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button> */}
            </div>
            {
                promotedSeries.map((series, i) => {

                    return <NavLink key={i} to={`${link}${series.s_id}`} className={`carousel-item ${i === 0 && "active"}`}>
                        <center>
                            <img src={process.env.REACT_APP_IMG_PATH + "sliderImg/" + series.img} className="d-block " alt="no img" />
                        </center>
                    </NavLink>
                })
            }


            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>

    )


}