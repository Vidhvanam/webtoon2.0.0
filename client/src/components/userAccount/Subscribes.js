import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { userContext } from "../UserContext"
import Card from "../Card"
export default function Subscriber() {
    const { user } = useContext(userContext)
    const [subsribes, setSubsribes] = useState([])
    useEffect(() => {
        async function getData() {

            if (user) {
                const userSubscribes = user.subscribes
                const res = await axios.get(`http://localhost:6969/api/series/allSubscribes/get?userSubscribes=${userSubscribes}`)
                // console.log(userSubscribes);

                if (res.data.type === "success") {
                    console.log(res.data);
                    setSubsribes(res.data.seriesInfo)
                }
            }
        }
        getData()
        // axios.get(`http://localhost:6969/api/series/allSubscribes/get?userSubscribes=${userSubscribes}`,)
        //  .then(res => {
        //     console.log(res);
        //  })

    }, [user])

    const subSeries = subsribes.map(series => (

        <Card key={series._id} series={series} />
    ))
    return (
        <div className="main-container">
            <div className="sub-container">
            <h2 className='txt-center'>Subscribes</h2>

            <div className="flex-row-box gap-4">
                
                {subSeries}
            </div>
            </div>

        </div>
    )
}