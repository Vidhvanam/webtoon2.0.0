import Card from './Card'
import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import Slider from './Slider'
import WTLoader from './WTLoader'
function Home() {
    const [loading, setLoading] = useState(true)

    const [newSeriesData, setSeriesData] = useState([])
    const [trendingSeriesData, setTrandingData] = useState([])

    const NewSeries = newSeriesData.map(series => (

        <Card key={series._id} series={series} />
    ))
    const trandingSeries = trendingSeriesData.map(series => (

        <Card key={series._id} series={series} />
    ))

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API}api/series/filter/newSeries`)
            .then(res => {
                setSeriesData(res.data.series)
            })
        axios.get(`${process.env.REACT_APP_API}api/series/filter/trending`)
            .then(res => {
                setTrandingData(res.data.series)
                setLoading(false)
            })
    }, [])
    if (loading) {
        return <WTLoader />
    }
    return (

        <div className="home-container">
            {/* {console.log(seriesData)} */}
            <Slider promoSeries={[]} />

            <div className='sub-container'>
                <h2 className='txt-center'>Trending Series</h2>
                <div className="flex-box">
                    {trandingSeries}
                </div>
            </div>
            <div className='sub-container border-b-gray'>
                <h2 className='txt-center'>New Series</h2>
                <div className="flex-box">
                    {NewSeries}
                </div>
            </div>

        </div>
    )
}
export default Home