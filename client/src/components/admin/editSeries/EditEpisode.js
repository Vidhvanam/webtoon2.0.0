import { useState } from "react";
import axios from "axios";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateSeries() {
    const { id } = useParams();
    const navigetor = useNavigate()

    const [newEpisode, setNewEpisode] = useState({
        _id: "",
        name: "",
        url: "",
        SeriesId: id,
        ep_num: 0
    })
    const [error, setError] = useState({
        name: "",
        pdf: ""
    })

    const addData = (e) => {
        const { value } = e.target;
        setNewEpisode({ ...newEpisode, name: value })

    }
    const handlePdf = (e) => {
        setNewEpisode({ ...newEpisode, pdf: e.target.files[0] });
    }
    const formValidation = () => {
        // console.log(newEpisode);
        let flag = true
        if (newEpisode.name.length > 15 || newEpisode.name.length === 0) {
            setError(prev => ({ ...prev, name: "Episode name should be less than 15 characters" }))
            flag = false
        } else {
            setError(prev => ({ ...prev, name: "" }))

        }
        if (!newEpisode.pdf) {
            setError((prev) => ({ ...prev, pdf: "Select PDF File" }))

            flag = false

        } else if (!newEpisode.pdf.name.match(/\.(pdf)$/)) {
            setError((prev) => ({ ...prev, pdf: "Not valid formate noly PDF files are allowed" }))
            flag = false
        } else if (newEpisode.pdf.size > 10485760) {
            setError((prev) => ({ ...prev, pdf: "PDF size should be less than 10mb" }))
            flag = false
        }
        else {
            setError(prev => ({ ...prev, pdf: "" }))

        }
        return flag

    };
    const onSubmit = (e) => {
        e.preventDefault();
        const flag = formValidation()
        if (flag) {
            console.log("valid");
            const formData = new FormData();
            formData.append('name', newEpisode.name)
            formData.append('SeriesId', newEpisode.SeriesId)
            formData.append('date', newEpisode.date);
            formData.append('url', newEpisode.url);
            formData.append('ep_num', newEpisode.ep_num)

            axios.post('http://localhost:6969/api/episodes/admin/update/:id', formData)
                .then(res => {
                    toast[res.data.type](res.data.message);
                    setTimeout(() => {
                        console.log(res);
                        navigetor(-1)

                    }, 2500)

                })
                .catch(err => {
                    toast[err.data.type](err.data.message);

                });

        } else {
            console.log("not valid");
        }
    }
    return (
        <div className="main-container">
            <nav className="user-account-nav">
                <ul className="flex-row-box">
                    <li>
                        <NavLink to={`/EditSeriesInfo/${newEpisode.SeriesId}`} >1. Edit Series</NavLink>
                    </li>
                    <li>
                        <NavLink to={`/EditEpisode/${newEpisode._id}`} >2. Edit Episode</NavLink>
                    </li>
                </ul>

            </nav>
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBa={false}
                closeOnClick={true}
                pauseOnHover={true}
                draggable={true}
                theme="light"
            />
            {console.log(newEpisode)}
            <div className="subscribes-container">
                <h1>Edit Episodes</h1>

                <form className="row g-3" onSubmit={onSubmit} encType='multipart/form-data'>


                    <div className="col-12 inp">
                        <label htmlFor="inputtitle" className="form-label fs-5">Episode title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputtitle"
                            placeholder="Less than 50 characters"
                            name="name"
                            onChange={addData}
                        />
                        {error.name.length > 0 && <small className='invalid-feedback d-block'>{error.name}</small>}

                    </div>



                    <div className="col-12 inp">
                        <label htmlFor="inputtitle" className="form-label fs-5">Episode PDF</label>
                        <input
                            type="file"
                            className="form-control"
                            name="pdf"
                            onChange={handlePdf}
                            accept=".pdf"
                        />
                        {error.pdf.length > 0 && <small className='invalid-feedback d-block'>{error.pdf}</small>}

                        <div className="mt-3 d-flex">
                            <i className="fa-solid fa-check fs-5 trueicon mt-1 mb-1"></i>
                            <p className="agree ms-3 mt-2">
                                PDF size must be smaller than 10mb
                            </p>
                        </div>
                    </div>
                    <div className="mt-4">
                        <button className="btn btn-success">
                            Create Series
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}