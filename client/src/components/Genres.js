import { useEffect, useState } from "react"
import Card from "./Card"
import axios from "axios"
function Genres() {
    const [series, setSeries] = useState([])
    const [filteredData, setfilteredData] = useState([])
    const [filters ,setFilters] = useState({gener: "all" ,order:"ratting" ,status :""})
    useEffect(() => {
        axios.get(`http://localhost:6969/api/series/filter/all`)
            .then(res => {
                setSeries(res.data.series)
                setfilteredData(res.data.series.sort((a, b) => b.ratting - a.ratting))
            })

    }, [])
    useEffect(() =>{
        console.log(filters);
        let newFilteredData = filters.gener !=="all" ? series.filter(item => item.genres.includes(filters.gener)) : series
        newFilteredData =  filters.status ? newFilteredData.filter(item => {
            if(filters.status === "completed"){
                return item.completed  
            }else{
                return !item.completed
            }
          })  : newFilteredData
          
           if(filters.order === "ratting" ){
            console.log("ratting");
          
            newFilteredData =   newFilteredData.sort((a,b) => b.ratting - a.ratting )
           }else if(filters.order === "old"){
            console.log("old");
            newFilteredData =   newFilteredData.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime() )
         
           }else{
            // console.log(newFilteredData);
            console.log("new");

            newFilteredData =   newFilteredData.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime() )
            console.log(newFilteredData);
           }
          
           console.log(newFilteredData);
        
        setfilteredData(newFilteredData)
    },[filters])
    const  handleFilter = (e) =>{
        setFilters({...filters,[e.target.name]:e.target.value})
       
    }
  
    return (
        <div className="main-container">
            {/* {console.log(series)} */}
            <div className="subscribes-container mt-3">
                <div className="flex-row-box js-space-bet ">

                    <select defaultValue="all" className="form-select form-select-sm mb-3 select-box" name="gener" aria-label=".form-select-lg example" onChange={handleFilter}>
                        <option  value="all">All Genres</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Romance">Romance</option>
                        <option value="Fantasy">Fantasy</option>
                    </select>

                    <select defaultValue="" className="form-select form-select-sm mb-3 select-box" name="status" aria-label=".form-select-lg example"onChange={handleFilter}>
                        <option  value="">Status</option>
                        <option value="completed">Completed</option>
                        <option value="onging">Onging</option>
                        
                    </select>


                    <select defaultValue="ratting" className="form-select form-select-sm mb-3 select-box" name="order" aria-label=".form-select-lg example"onChange={handleFilter}>
                        <option  value="ratting">By Ratting</option>
                        <option value="new">By Date (New First)</option>
                        <option value="old">By Date (Old First)</option>
                        {/* <option value="3">Three</option> */}
                    </select>

                </div>
                <div className="flex-box">
                    {filteredData.map(item => <Card key={item._id}series={item} />)}
                </div>
            </div>
        </div>
    )
}
export default Genres