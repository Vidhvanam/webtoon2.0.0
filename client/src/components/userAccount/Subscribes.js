import axios from "axios"
import { Fragment, useContext, useEffect, useState } from "react"
import { userContext } from "../UserContext"
import Card from "../Card"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import noImg from "../../img/noimage.png"
export default function Subscriber() {
    const { user, setUser } = useContext(userContext)
    const [subsribes, setSubsribes] = useState([])
    const [subArray, setSubArray] = useState([])
    const [mode, setMode] = useState("view")

    useEffect(() => {
        async function getData() {

            if (user) {
                const userSubscribes = user.subscribes
                const res = await axios.get(`${process.env.REACT_APP_API}api/series/allSubscribes/get?userSubscribes=${userSubscribes}`)

                if (res.data.type === "success") {
                    const resSeries = res.data.seriesInfo
                    setSubsribes(resSeries)
                    setSubArray(resSeries.map(item => item._id))
                }
            }
        }
        getData()
    }, [user])

    function handleSubArray(s_id) {
        const deleteBol = subArray.some(item => item === s_id)
        if (deleteBol)
            setSubArray(subArray.filter(item => item !== s_id))
        else
            setSubArray([...subArray, s_id])
    }

    function handelMode() {
        // setSubArray(subsribes.map(item => item._id))
        setMode(prev => prev === "view" ? "edit" : "view")
    }
    function deleteSub() {
        if (subArray.length === subSeries.length) {
            toast.info("Select series to delete");
        } else {
            const s_id = user.subscribes.filter(prev => !subArray.includes(prev))
            console.log({ s_id });
            axios.put(`${process.env.REACT_APP_API}api/user/unSubscribe/${user._id}`, { data: subArray, action: 'unSub', s_id }).then(res => {
                if (res.data.type === "success") {

                    setUser(res.data.upUser)
                    localStorage.setItem("user", JSON.stringify(res.data.upUser))
                    console.log(res.data.upUser);
                    toast[res.data.type](res.data.message);
                } else {

                    toast[res.data.type](res.data.message);
                }
            })
        }
    }


    const subSeries = subsribes.map((series, index) => (
        <Fragment key={series._id}>

            <Card label={"card" + index} series={series} mode={mode} handleSubArray={handleSubArray} />
        </Fragment>


    ))
    return (
        <div className="main-container">

            <ToastContainer position="top-center"
                autoClose={2000}
                hideProgressBa={false}
                closeOnClick={true}
                pauseOnHover={true}
                draggable={true}
                theme="light" />
            {console.log({ subArray })}
            <div className="subscribes-container">
                {

                    user && !user?.subscribes.length ? (<div className="flex-col-box color-gray">
                        <img src={noImg} />
                        <h3>No subscriptions.</h3>
                        <h5>You haven’t subscribed to any series.</h5>
                        <h5>Subscribe to your favorite series.</h5>

                    </div>) :
                        (
                            <>
                                <div className="flex-row-box js-space-bet">
                                    <h2 className=''>Subscribes</h2>
                                    <span>
                                        {mode === "view" ?
                                            <button className="btn btn-success" onClick={() => handelMode()}>Edit</button> :
                                            (<div className="flex-row-box gap-2">

                                                <button className="btn btn-danger " onClick={() => deleteSub()}>Delete</button>
                                                <button className="btn btn-success" onClick={() => handelMode()}>Cancel</button>
                                            </div>
                                            )
                                        }
                                    </span>
                                </div>

                                <div className="flex-row-box gap-4 sub  mt-3 ">

                                    {subSeries}
                                </div>
                            </>
                        )
                }

            </div>

        </div>
    )
}