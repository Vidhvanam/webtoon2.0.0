import { useEffect, useState } from "react"
import axios from "axios"
import { NavLink } from "react-router-dom"
import Page from "./Page"
function Popular() {
    const [seriesData, setSeriesData] = useState([])
    const [top, setTop] = useState({})

    const colors = { drama: "#00b19a", thriller: "#c00355", romance: "#fd337f", action: "#006afa", fantasy: "#8b00e9", sliceoflife: "#9ab710", comedy: "#eea800", supernatural: "#7a41e9" }
    const [color, setColor] = useState("#fd337f")
    function hexToRgba(hex, opacity) {
        hex = hex.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${0.1})`;
    }
    useEffect(() => {
        axios.get('http://localhost:6969/api/series/filter/popularByGenre/romance',)
            .then(res => {
                setSeriesData(res.data.series.filter((item, i) => i !== 0))
                setTop(res.data.series[0])

                // setColor(colors[res.data.series[0].genres[0].split(" ").join("").toLowerCase()])
                // console.log(color);
            })
    }, [])
    const handleGenre = (e) => {
        e.preventDefault()
        const gener = e.target.textContent.toLowerCase()
        setColor(colors[gener] ? colors[gener] : "#fd337f")
        axios.get(`http://localhost:6969/api/series/filter/popularByGenre/${gener}`,)
            .then(res => {
                setSeriesData(res.data.series.filter((item, i) => i !== 0))
                setTop(res.data.series[0])

                //   color = res.data.series[0].genres[0].split(" ").join("").toLowerCase()
                // console.log(res.data.series[0]);
            })
    }
    const genersBar = (

        <nav className="user-account-nav my-5">
            <ul className="flex-row-box">

                <li className="nav-item">
                    <a className="nav-link" href="#" onClick={handleGenre}>Romance</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#" onClick={handleGenre}>Comedy</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#" onClick={handleGenre}>Fantasy</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#" onClick={handleGenre}>slice of life</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#" onClick={handleGenre}>Action</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#" onClick={handleGenre}>Drama</a>
                </li>

            </ul>

        </nav>
    )
    //     function setBg(e){
    //               e.target.style.backgroundColor = color
    //               console.log( e.target.style.backgroundColor,color);
    //     }
    //     function removeBg(e){
    //         e.target.style.backgroundColor = "transparent"
    // }
    const otherSeries = seriesData.map((item, i) => {

        return (
            <div style={{ backgroundColor: hexToRgba(color) }}>
                <NavLink to={`/series/${item._id}`} style={{ marginBottom: "10px", backgroundColor: "transparent" }} className="d-flex flex-wrap gap-3 b-border-gray p-2 popular-hover" key={i}>
                    <div className="photo">
                        <img src={process.env.REACT_APP_IMG_PATH + item.img} alt="" className="img-fluid" />
                        {/* <div className="mt-1 ms-2 new">
<p id="new">NEW</p>
</div> */}
                    </div>

                    <div className=" num d-flex justify-content-center align-items-center">
                        <p>{i + 2}</p>
                    </div>

                    <div className="d-flex flex-column  gap-2">
                        <div className="category">{item?.genres.join(' / ')}</div>
                        <div className="title">{item.name}</div>
                        <div className="author mt-1">{item.author?.name}</div>
                    </div>
                </NavLink>
            </div>

        )
    }
    )
    return (
        <>
            <Page pageName="top pick by genre">
                {console.log(top)}
                {genersBar}
                <div id="trend" className="row"   >
                    <div id="collection" className="d-flex justify-content-between mt-2 row">
                        {top ? (
                            <>
                                {console.log(top)}
                                <NavLink to={`/series/${top._id}`} id="coll-left" className=" col-lg-5" style={{ backgroundColor: color, padding: "20px", color: "white" }}>
                                    <div id="first" className=" position-relative">
                                        <center> <img src={process.env.REACT_APP_IMG_PATH + top.img} className="w-100 img-fluid" alt="" /></center>
                                        <h1 className="position-absolute top-0 m-5" style={{ color: color }}>1</h1>
                                    </div>
                                    <div id="info" className="my-2">
                                        <p className="category">{top?.genres?.join(" / ")}</p>
                                        <h3 className="name mb-2">{top.name}</h3>
                                        <p className="author">{top.author?.name}</p>
                                        <p className="summary">
                                            {top.description}
                                        </p>
                                        {/* <div className="mt-3 mb-3">
                            <p id="new">NEW</p>
                        </div> */}
                                    </div>
                                </NavLink>
                            </>
                        ) : null}
                        <div id="coll-right" className="col-lg-7 ">
                            {
                                top ? otherSeries : null
                            }
                        </div>
                    </div>
                </div>

            </Page>
        </>
    )
}
export default Popular