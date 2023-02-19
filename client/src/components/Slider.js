// import img1 from '../img/sliderImg/Unlovable-Replacement-Mobile-Banner2.2.jpg'

import img1 from '../img/sliderImg/1TheUncommons_desktopbanner_launch-badge_A.png'
import img2 from '../img/sliderImg/1unOrdinary_Pivotal_Ep285_desktopbanner_B.png'
import img3 from '../img/sliderImg/5A_Heartfelt_Andante_desktopbanner_launch-nobadge_B.png'
import img4 from '../img/sliderImg/6NoS_desktopbanner_launch-badge_B.png'

export default function Slider() {
    return (
        <>
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" data-interval="100">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                </div>
                <div className="carousel-item active">
                    <center>
                        <img src={img1} className="d-block " alt="no img" />
                    </center>
                </div>
                <div className="carousel-item">
                    <center>
                        <img src={img2} className="d-block " alt="..." />
                    </center>
                </div>
                <div className="carousel-item">
                    <center>
                        <img src={img3} className="d-block " alt="..." />
                    </center>
                </div>
                <div className="carousel-item">
                    <center>
                        <img src={img4} className="d-block " alt="..." />
                    </center>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </>
    )
}