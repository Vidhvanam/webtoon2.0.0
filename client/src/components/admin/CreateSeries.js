import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, NavLink } from "react-router-dom"
import 'react-toastify/dist/ReactToastify.css';

export default function CreateSeries() {
  const navigetor = useNavigate()
  const [authors, setAuthors] = useState([])
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
  useEffect(() => {
    axios.get(`http://localhost:6969/api/author/filter/all`)
      .then(res => {
        setAuthors(res.data.authors.filter(author => author?.status !== "removed"))
      })
  }, [])
  const addData = (e) => {
    const { name, value } = e.target;
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
      setError((prev) => ({ ...prev, author: "Select Author" }))
      flag = false
    } else {
      setError(prev => ({ ...prev, author: "" }))
    }
    if (!newSeries.img) {
      setError((prev) => ({ ...prev, img: "Select valid image" }))

      flag = false

    } else if (!newSeries.img.name.match(/\.(jpg|jpeg|png)$/)) {
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
      console.log("valid");
      const formData = new FormData();
      formData.append('name', newSeries.name);
      formData.append('completed', newSeries.completed);
      formData.append('genres', newSeries.genres);
      formData.append('description', newSeries.description);
      formData.append('ratting', newSeries.ratting);
      formData.append('date', newSeries.date);
      formData.append('img', newSeries.img);
      formData.append('author', newSeries.author);
      formData.append('subscribers', newSeries.subscribers);


      axios.post('http://localhost:6969/api/series/admin/add', formData)
        .then(res => {
          toast[res.data.type](res.data.message);
          // console.log(res);
          // <Navigate to={`createSeries/second/${res.data.newSeries._id}`} />
          navigetor(`/createSeries/second/${res.data.newSeries._id}`)
        })
        .catch(err => {
          // console.log(err);
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
            <NavLink to="/createSeries/first">1. Create Series</NavLink>
          </li>
          <li>
            <NavLink to="/createSeries/second" className="disabled-link">2. Add Episode</NavLink>
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
      {console.log(newSeries)}
      <div className="subscribes-container">
        <h1>Create Series</h1>

        <form className="row g-3" onSubmit={onSubmit} encType='multipart/form-data'>
          <div className="col-md-4">
            <label htmlFor="inputState" className="form-label fs-5">Genre</label>
            <select id="inputState" defaultValue="" className="form-select" name="genre1" onChange={addData}>
              <option value="">Select</option>
              <option>Comady</option>
              <option>Fantasy</option>
              <option>Romance</option>
              <option>Slice of Life</option>
              <option>SCI-FI</option>
              <option>Drama</option>
              <option>Action</option>
            </select>
          </div>

          {error.genres.length > 0 && <small className='invalid-feedback d-block'>{error.genres}</small>}

          <div className="col-12 inp">
            <label htmlFor="inputtitle" className="form-label fs-5">Series title</label>
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
          <div className="col-md-4">
            <label htmlFor="inputAuthor" className="form-label fs-5">Series author</label>
            <select
              className="form-select"
              id="inputAuthor"
              name="author"
              onChange={addData}
            >
              <option value="">select author  </option>
              {authors.map(author => <option key={author._id} value={author._id}>{author.name}</option>)}
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
            ></textarea>
            {error.description.length > 0 && <small className='invalid-feedback d-block'>{error.description}</small>}

          </div>
          <div className="col-12 inp">
            <label htmlFor="inputtitle" className="form-label fs-5">Series Img</label>
            <input
              type="file"
              className="form-control"
              name="img"
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
              Create Series
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}