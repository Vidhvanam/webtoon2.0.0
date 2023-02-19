import Card from './Card'
import { useEffect, useState , useContext} from 'react'
import axios from 'axios'
import Slider from './Slider'
function Home() {
   
    const [newSeriesData, setSeriesData] = useState([])
    const [trendingSeriesData, setTrandingData] = useState([])

    const NewSeries = newSeriesData.map(series => (
       
        <Card key={series._id} series={series}/>
    ))
    const trandingSeries = trendingSeriesData.map(series => (
       
        <Card key={series._id} series={series}/>
    ))

    useEffect(() => {
        axios.get('http://localhost:6969/api/series/filter/newSeries')
        .then(res=>{
            setSeriesData(res.data.series)
        })
        axios.get('http://localhost:6969/api/series/filter/trending')
        .then(res=>{
            setTrandingData(res.data.series)
        })
    }, [])
    return (

        <div className="home-container">
            {/* {console.log(seriesData)} */}
            <Slider />
            <div className='sub-container border-b-gray'>
                <h2 className='txt-center'>New Series</h2>
                <div className="flex-box">
                {NewSeries}
                </div>
            </div> 
            <div className='sub-container'>
                <h2 className='txt-center'>Trending Series</h2>
                <div className="flex-box">
                {trandingSeries}
                </div>
            </div>            
        </div>
    )
}
export default Home