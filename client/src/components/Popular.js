import { useEffect, useState } from "react"
import axios from "axios"
import { NavLink } from "react-router-dom"
function Popular() {
    const [seriesData, setSeriesData] = useState([])
    const [top, setTop] = useState({})

    const colors = { thriller: "#c00355", romance: "#fd337f", action: "#006afa", fantasy: "#8b00e9", sliceoflife: "#9ab710", comedy: "#eea800", supernatural: "#7a41e9" }
    let color
    useEffect(() => {
        axios.get('http://localhost:6969/api/series/filter/popularByGenre/romance',)
            .then(res => {
                setSeriesData(res.data.series.filter((item, i) => i !== 0))
                setTop(res.data.series[0])

                color = res.data.series[0].genres[0].split(" ").join("").toLowerCase()
                // console.log(res.data.series[0]);
            })
    }, [])
    const handleGenre=(e)=>{
          e.preventDefault()
          const gener = e.target.textContent.toLowerCase()
          console.log();
          axios.get(`http://localhost:6969/api/series/filter/popularByGenre/${gener}`,)
          .then(res => {
              setSeriesData(res.data.series.filter((item, i) => i !== 0))
              setTop(res.data.series[0])

              color = res.data.series[0].genres[0].split(" ").join("").toLowerCase()
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
    const otherSeries =seriesData.map((item, i) => {

        return (
            
                <NavLink to={`/series/${item._id}`} className="d-flex gap-3 b-border-gray py-2" key={i}>
                    <div className="photo">
                        <img src={process.env.REACT_APP_IMG_PATH + item.img} alt="" className="img-fluid" />
                        {/* <div className="mt-1 ms-2 new">
<p id="new">NEW</p>
</div> */}
                    </div>

                    <div className=" num d-flex justify-content-center align-items-center">
                        <p>{i+2}</p>
                    </div>

                    <div className="d-flex flex-column  gap-2">
                        <div className="category">{item?.genres.join(' / ')}</div>
                        <div className="title">{item.name}</div>
                        <div className="author mt-1">{item.author}</div>
                    </div>
                </NavLink>

        
        )
    }
    )
    return (
        <>
            <div className="subscribes-container">
                {console.log(top)}
                <h1 className="my-3">Top Picks by Genres</h1>
                {genersBar}
                <div id="trend" className="row"   >
                    <div id="collection" className="d-flex justify-content-between mt-2 row">
                        {top ? (
                            <>
                            {console.log(top)}
                                <NavLink  to={`/series/${top._id}`} id="coll-left" className=" col-lg-4">
                                    <div id="first" className=" position-relative">
                                        <img src={process.env.REACT_APP_IMG_PATH + top.img} className="w-100 img-fluid" alt="" />
                                        <h1 className="position-absolute top-0 m-5">1</h1>
                                    </div>
                                    <div id="info" className="my-2">
                                        <p className="category">{top?.genres?.join(" / ")}</p>
                                        <h3 className="name mb-2">{top.name}</h3>
                                        <p className="author">{top.author}</p>
                                        <p className="summary" style={{ color: colors[color] }}>
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

            </div>
        </>
    )
}
export default Popular