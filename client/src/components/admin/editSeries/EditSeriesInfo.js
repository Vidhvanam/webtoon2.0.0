import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, NavLink, useParams } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';
import Page from "../../Page"
import Swal from 'sweetalert2'

export default function CreateSeries() {
    const { id } = useParams()
    const [authors, setAuthors] = useState([])

    const navigetor = useNavigate()
    const [newSeries, setNewSeries] = useState({
        name: "",
        completed: false,
        genres: [],
        description: "",
        ratting: 0,
        date: new Date(),
        img: "",
        author: "",
        subscribers: 0,
    })
    const [error, setError] = useState({
        name: "",
        description: "",
        img: "",
        author: "",
        genres: ""
    })
    const requestes = async () => {
        let authorid = ""
        await axios
            .get(`http://localhost:6969/api/series/${id}`)
            .then((series) => {
                console.log(series.data);
                authorid = series.data.seriesInfo.author._id
                setNewSeries({ ...series.data.seriesInfo, author: authorid });
            })
            .catch((err) => console.log(err));
        await axios.get(`http://localhost:6969/api/author/filter/all`)
            .then(res => {
                setAuthors(res.data.authors.filter(author => {
                    console.log((author?.status !== "removed" || author._id === authorid));
                    return (author?.status !== "removed" || author._id === authorid)
                }))
            })
    }
    useEffect(() => {
        requestes()
    }, [id])
    const addData = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        if (name == "genre1") {
            setNewSeries({ ...newSeries, genres: [value] })

        } else {

            setNewSeries({ ...newSeries, [name]: value })
        }
    }
    const handlePhoto = (e) => {
        setNewSeries({ ...newSeries, img: e.target.files[0] });
    }
    const formValidation = async () => {
        // console.log(newSeries);
        let flag = true
        if (newSeries.name.length === 0 || newSeries.genres[0] === "") {
            setError(prev => ({ ...prev, genres: "select genre of series" }))
            flag = false
        } else {
            setError(prev => ({ ...prev, genres: "" }))

        }
        if (newSeries.name.length > 50 || newSeries.name.length === 0) {
            setError(prev => ({ ...prev, name: "Title should be less than 50 character" }))
            flag = false
        } else {
            setError(prev => ({ ...prev, name: "" }))

        }
        if (newSeries.description === "" || newSeries.description.length > 400 || newSeries.description.length < 50) {
            setError(prev => ({ ...prev, description: "Description  should be between 50 to 400 character" }))
            flag = false
        } else {
            setError(prev => ({ ...prev, description: "" }))
        }
        if (newSeries.author === "") {
            setError((prev) => ({ ...prev, author: "Select author for the series" }))
            flag = false
        } else {
            setError(prev => ({ ...prev, author: "" }))
        }
        if (!newSeries.img) {
            setError((prev) => ({ ...prev, img: "Select valid image" }))

            flag = false

        } else if (Object.keys(newSeries.img).includes("name") && !newSeries.img.name.match(/\.(jpg|jpeg|png)$/)) {
            setError((prev) => ({ ...prev, img: "Not valid formate noly JPG , PNG , JPEG allowed." }))
            flag = false
        } else if (newSeries.img.size > 512000) {
            setError((prev) => ({ ...prev, img: "Image size should be less than 500kb" }))
            flag = false
        } else {

            try {
                let res = await validateImage(newSeries.img);
                setError(prev => ({ ...prev, img: "" }))
                //  console.log(res);
            } catch (error) {
                // console.log(error);
                setError((prev) => ({ ...prev, img: "Image is not 510 * 510" }))
                flag = false

            }

        }


        return flag

    };


    const validateImage = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    console.log(img.width, img.height);
                    if (img.width == 510 && img.height == 510) {
                        resolve(true)
                    } else {
                        reject(false)
                    }
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        })
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const flag = await formValidation()
        if (flag) {

            Swal.fire({
                title: `Are you sure you want to update "${newSeries.name}"?`,
                showConfirmButton: true,
                showCancelButton: true,
                confirmButtonText: "Yes",
                showCancelButton: "Cancel",
                icon: 'warning'
            }
            ).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    console.log("valid");
                    const formData = new FormData();
                    formData.append('_id', newSeries._id);
                    formData.append('name', newSeries.name);
                    formData.append('completed', newSeries.completed);
                    formData.append('genres', newSeries.genres);
                    formData.append('description', newSeries.description);
                    formData.append('ratting', newSeries.ratting);
                    formData.append('date', newSeries.date);
                    formData.append('img', newSeries.img);
                    formData.append('author', newSeries.author);
                    formData.append('subscribers', newSeries.subscribers);


                    axios.post('http://localhost:6969/api/series/admin/update', formData)
                        .then(res => {
                            Swal.fire(res.data.message, '', res.data.type);
                            // console.log(res);
                            // <Navigate to={`createSeries/second/${res.data.newSeries._id}`} />
                            navigetor(-1)
                        })
                        .catch(err => {
                            // console.log(err);
                            toast[err.data.type](err.data.message);

                        });


                } else
                    Swal.fire(' Cancelled', '', 'error')

            })

        } else {
            console.log("not valid");
        }
    }
    return (
        <Page pageName="Edit series information">
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBa={false}
                closeOnClick={true}
                pauseOnHover={true}
                draggable={true}
                theme="light"
            />
            {console.log(newSeries)}

            <form className="row g-3" onSubmit={onSubmit} encType='multipart/form-data'>
                <div className="col-md-4">
                    <label htmlFor="inputState" className="form-label fs-5">Genre 1</label>
                    <select id="inputState" value={newSeries.genres[0]} className="form-select" name="genre1" onChange={addData}>
                        <option value="">Select</option>
                        <option value="Comady">Comady</option>
                        <option value="Sports">Sports</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Romance">Romance</option>
                        <option value="Slice of life">Slice of Life</option>
                        <option value="SCI-FI">SCI-FI</option>
                        <option value="Drama">Drama</option>
                        <option value="Action">Action</option>
                        <option value="Horror">Horror</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Supernatural">Supernatural</option>

                    </select>
                    {error.genres.length > 0 && <small className='invalid-feedback d-block'>{error.genres}</small>}
                </div>

                <div className="col-md-4">
                    <label htmlFor="inputStatus" className="form-label fs-5">Status</label>
                    <select id="inputStatus" value={newSeries.completed} className="form-select" name="completed" onChange={addData}>
                        <option value={true}>Completed</option>
                        <option value={false}>On going</option>


                    </select>
                </div>



                <div className="col-12 inp">
                    <label htmlFor="inputtitle" className="form-label fs-5">Series title</label>
                    <input
                        type="text"
                        value={newSeries.name}
                        className="form-control"
                        id="inputtitle"
                        placeholder="Less than 50 characters"
                        name="name"
                        onChange={addData}
                    />
                    {error.name.length > 0 && <small className='invalid-feedback d-block'>{error.name}</small>}

                </div>
                <div className="col-12 inp">
                    <label htmlFor="inputAuthor" className="form-label fs-5">Series author</label>
                    <select
                        className="form-select"
                        id="inputAuthor"
                        name="author"
                        onChange={addData}
                    >
                        <option value="">select author  </option>
                        {authors.map(author => <option key={author._id} selected={author._id === newSeries.author && true} value={author._id}>{author.name}</option>)}
                    </select>
                    {error.author.length > 0 && <small className='invalid-feedback d-block'>{error.author}</small>}

                </div>

                <div className="mb-3 inp">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label fs-5" >Summary</label >
                    <textarea
                        className="form-control"
                        id="exampleFormControlTextarea1"
                        rows="9"
                        placeholder="between 50 to 400 characters"
                        name="description"
                        onChange={addData}
                        value={newSeries.description}
                    />
                    {error.description.length > 0 && <small className='invalid-feedback d-block'>{error.description}</small>}

                </div>
                <div className="col-12 inp">
                    <label htmlFor="img" className="form-label fs-5">Series Img</label>
                    <input
                        type="file"
                        className="form-control"
                        name="img"
                        id="img"
                        onChange={handlePhoto}
                        accept=".png, .jpeg , .jpg"
                    />
                    {error.img.length > 0 && <small className='invalid-feedback d-block'>{error.img}</small>}

                    <div className="mt-3 d-flex">
                        <i className="fa-solid fa-check fs-5 trueicon mt-1 mb-1"></i>
                        <p className="agree ms-3 mt-2">
                            Image size should be less than 500kb and Image must be of 510*510
                        </p>
                    </div>
                </div>
                <div className="mt-4">
                    <button className="btn btn-success">
                        Update Series
                    </button>
                </div>
            </form>
        </Page>
    )
}