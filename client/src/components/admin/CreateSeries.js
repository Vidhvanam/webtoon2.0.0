import { useState } from "react";
import axios from "axios";
 export default function CreateSeries(){
    const [newSeries ,setNewSeries] = useState({
        name:"",
        completed:false,
        genres :
        description:"",
        ratting:0,
        date:new Date(),
        img:"",
        author:"",
        subscribers:0,
    })
    const [error,setError] = useState({
      name : "",
      description:"",
      img:"",
      author:""
    })

    const addData = (e)=>{
      const { name, value } = e.target;
      setNewSeries({...newSeries , [name] : value})
    }
    const handlePhoto = (e) => {
      setNewSeries({...newSeries, img: e.target.files[0]});
  }
    const formValidation = () => {
      console.log(newSeries);
      let flag = true
       Object.entries(newSeries).forEach(([key ,val]) =>{
        if(key == "name"){ 
          console.log(key);
          if(val.length > 50 || val == ""){
           setError({...error,[key] : "Series name is to long"})
           flag = false
          }
        }
        if(key == "description" && (val == "" || val.length >50 )){
          setError({...error,[key] : "Description is to long"})
           flag = false
        }
       })
       
     return flag
     
      };
const onSubmit=(e)=>{
  e.preventDefault();
  if(formValidation()){
    const formData = new FormData();
    // formData.append('photo', newUser.photo);
    // formData.append('birthdate', newUser.birthdate);
    // formData.append('name', newUser.name);
    console.log("valid");

    // axios.post('http://localhost:5000/users/add/', formData)
    //      .then(res => {
    //         console.log(res);
    //      })
    //      .catch(err => {
    //         console.log(err);
    //      });
   
  }else{
    console.log("not valid");
  }
}
    return (
        <div className="main-container">
          <div className="subscribes-container">
             <h1>Create Series</h1>  

             <form className="row g-3" onSubmit={onSubmit}  encType='multipart/form-data'>
              <div className="col-md-4">
                <label for="inputState" className="form-label fs-5">Genre 1</label>
                <select id="inputState" className="form-select" onChange={addData}>
                  <option selected>Select</option>
                  <option>COMEDY</option>
                  <option>FANTASY</option>
                  <option>ROMANCE</option>
                  <option>SLICE OF LIFE</option>
                  <option>SCI-FI</option>
                  <option>DRAMA</option>
                  <option>SHORT STORY</option>
                  <option>ACTION</option>
                </select>
                {error.errEmail.length > 0 && <small className='invalid-feedback d-block'>{error.errEmail}</small>}
              </div>
              <div className="col-md-4" >
                <label for="inputState" className="form-label fs-5">Genre 2 <span className="fs-6">(optional)</span></label >
                <select id="inputState" className="form-select" onChange={addData}>
                  <option selected>Select</option>
                  <option>COMEDY</option>
                  <option>FANTASY</option>
                  <option>ROMANCE</option>
                  <option>SLICE OF LIFE</option>
                  <option>SCI-FI</option>
                  <option>DRAMA</option>
                  <option>SHORT STORY</option>
                  <option>ACTION</option>
                </select>
              </div>

              <div className="col-12 inp">
                <label for="inputtitle" className="form-label fs-5">Series title</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputtitle"
                  placeholder="Less than 50 characters"
                  name="name"
                  onChange={addData}
                />
              </div>
              <div className="col-12 inp">
                <label for="inputtitle" className="form-label fs-5">Series author</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputtitle"
                  placeholder="Author name (Less than 15 characters)"
                  name="author"
                  onChange={addData}
                />
              </div>

              <div className="mb-3 inp">
                <label for="exampleFormControlTextarea1" className="form-label fs-5" >Summary</label >
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="9"
                  placeholder="Less than 50 characters"
                  name="description"
                  onChange={addData}
                ></textarea>
              </div>
              <div className="col-12 inp">
                <label for="inputtitle" className="form-label fs-5">Series Img</label>
                <input
                  type="file"
                  className="form-control"
                  name="img"
                  onChange={handlePhoto}
                  accept="image/png, image/jpeg ,image/jpg"
                />
                 <div class="mt-3 d-flex">
              <i class="fa-solid fa-check fs-5 trueicon mt-1 mb-1"></i>
              <p class="agree ms-3 mt-2">
                Image size should be less than 500kb and Image must be of 510*510
              </p>
            </div>
              </div>
              <div class="mt-4">
              <button class="btn btn-success">
                Create Series
              </button>
            </div>
            </form>
          </div>
        </div>
    )
 }