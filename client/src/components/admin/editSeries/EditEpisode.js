import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2'
import Page from "../../Page"
export default function CreateSeries() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id')
    const url = searchParams.get('url')
    const name = searchParams.get('name')

    const navigetor = useNavigate()

    // useEffect(() => {
    //     if (url !== "") {

    //         axios.get(`http://localhost:6969/api/episodes/getFile/${url}`)
    //             .then(res => res.data).then(pdf => {
    //                 const converted = new Blob([pdf], { type: 'application/pdf' });


    //             })
    //             .catch(err => {
    //                 console.log("err", err);


    //             });
    //     }
    // }, [url])
    const [newEpisode, setNewEpisode] = useState({
        name,
        pdf: "",
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
            Swal.fire({
                title: `Are you sure you want to update episode ?`,
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: "Yes",
                showCancelButton: "Cancel",
                icon: 'warning'
            }
            ).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    const formData = new FormData();
                    formData.append('name', newEpisode.name)
                    formData.append('status', "published")
                    formData.append('pdf', newEpisode.pdf);
                    axios.post(`http://localhost:6969/api/episodes/updateEpisode/${id}`, formData)
                        .then(res => {
                            Swal.fire(res.data.message, '', res.data.type);
                            setTimeout(() => {
                                navigetor(-1)

                            }, 2500)

                        })
                        .catch(err => {
                            Swal.fire('Not Updated', '', 'error')


                        });

                } else
                    Swal.fire(' Cancelled', '', 'error')

            })




        } else {
            console.log("not valid");
        }
    }
    return (
        <Page pageName="Edit Episode">

            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBa={false}
                closeOnClick={true}
                pauseOnHover={true}
                draggable={true}
                theme="light"
            />
            {console.log(newEpisode, url, name, id)}
            <div className="subscribes-container">

                <form className="row g-3" onSubmit={onSubmit} encType='multipart/form-data'>


                    <div className="col-12 inp">
                        <label htmlFor="inputtitle" className="form-label fs-5">Episode title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="inputtitle"
                            placeholder="Less than 50 characters"
                            name="name"
                            value={newEpisode.name}
                            onChange={addData}
                        />
                        {error.name.length > 0 && <small className='invalid-feedback d-block'>{error.name}</small>}

                    </div>



                    <div className="col-12 inp">
                        <label htmlFor="inputtitle" className="form-label fs-5">Episode PDF</label>
                        <input
                            type="file"
                            className="form-control"
                            id="pdf"
                            name="pdf"
                            onChange={handlePdf}
                            placeholder="default pdf file is selected"
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
                            Edit Episode
                        </button>
                    </div>
                </form>
            </div>
        </Page>
    )
}