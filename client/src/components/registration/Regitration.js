import React, { useState } from 'react'
import axios from 'axios';
import { NavLink } from "react-router-dom"
// import { GoogleRegistration } from 'react-google-Registration';
// import { gapi } from 'gapi-script';


const emailRegex =/^[A-Za-z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
const Registration = ({ setRegistrationUser }) => {
  const [user,setUser] = useState({
    userName:"",
    email:"",
    phone:"",
    password: "",
    conformPass : ""
})
const [error ,setError] = useState({
    errUserName :'',
    errEmail :'',
    errPhone :'',
    errPass :'',
    errConformPass :''
})

const formValidation = e => {
  e.preventDefault();
  const { name, value } = e.target;
  const newError = error   
  switch (name) {
      case "userName":
          newError.errUserName =
              value.length < 4 ? "Atleast 4 characaters required" : "";
              // console.log(error.errName)
          break;
      case "email":
          newError.errEmail = emailRegex.test(value)
              ? ""
              : "Email address is invalid";
              console.log(error.errEmail)
          break;
      case "phone":
          newError.errPhone =
              value.length != 10 ? "Not a valid phone number" : "";
          break;
          case "password":
            newError.errPass =
                value.length < 6 ? "Atleast 6 characaters required" : "";
            break;
            case "conformPass":
              newError.errConformPass =
                  value !== user.password ? "Password does not match" : "";
              break;
      default:
          break;
  }
 setError(newError);
 setUser(prevData =>{
   return {...prevData , [name] : value}
 });
};

const formValid = () => {
  let isValid = true;
 
  Object.values(error).forEach(val => {
      if (val.length > 0) {
          isValid = false
      } 
      
  });
  Object.values(user).forEach(val => {
      if (val === '') {
          // console.log('val :>> ', val);
          isValid = false
      } 
      
  });
  return isValid
 
}
const onSubmit = (e) =>{
  e.preventDefault()
  if(formValid()){
      console.log('valid form');
      const {userName , email , phone  ,password } = user 
      const newUser ={ 
        userName,
        email,
        phone,
        password
      }
      axios.post("http://localhost:6969/api/auth/register",newUser)
      .then(res=>{alert(res.data.message)})
      // console.log('this.state :>> ', this.state);
  }else{
      console.log('invalid form');
      // console.log('this.state :>> ', this.state);
  }
 
}
  return (
    <section className="main-container">
      <div className="container-fluid h-custom pd-y-40">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid" alt="Sample image" />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={onSubmit}>
              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                <p className="lead fw-normal mb-0 me-3">Register to webtoon</p>

          </div>    
              <div className="form-outline  mt-5 mb-3">
                <input type="text" className=" form-control form-control-lg"
                  name='userName'
                  placeholder="Enter user name" 
                  onChange={formValidation}/>
                  {error.errUserName.length > 0 && <small className='invalid-feedback d-block'>{error.errUserName}</small>}
                  {console.log(error.errPass)}
              </div>
              <div className="form-outline mb-3">
                <input type="email" id="form3Example3" className=" form-control form-control-lg"
                  name='email'
                  placeholder="Enter a valid email address" 
                  onChange={formValidation}/>
                  {error.errEmail.length > 0 && <small className='invalid-feedback d-block'>{error.errEmail}</small>}
              </div>
              <div className="form-outline  mb-3">
                <input type="number" className=" form-control form-control-lg"
                  name='phone'
                  placeholder="Enter phone number" 
                  onChange={formValidation}/>
                  {error.errPhone.length > 0 && <small className='invalid-feedback d-block'>{error.errPhone}</small>}

              </div>
              <div className="form-outline mb-3">
                <input type="password"  className="form-control form-control-lg"
                  name='password'
                  placeholder="Enter password" 
                  onChange={formValidation}/>
                  {error.errPass.length > 0 && <small className='invalid-feedback d-block'>{error.errPass}</small>}

              </div>
              <div className="form-outline mb-3">
                <input type="password" id="form3Example4" className="form-control form-control-lg"
                  name='conformPass'
                  placeholder="Conform Password" 
                  onChange={formValidation}/>
                  {error.errConformPass.length > 0 && <small className='invalid-feedback d-block'>{error.errConformPass}</small>}
              </div>

              <div className="d-flex justify-content-between align-items-center">
                
                <a href="#!" className="text-body">Forgot password?</a>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button type="submit" className="btn  btn-lg main-btn">Registration</button>
                <p className="small fw-bold mt-2 pt-1 mb-0">Have an account? <NavLink to="/login"
                  className="link-danger">LOGIN</NavLink></p>
              </div>

            </form>
          </div>
        </div>
      </div>

    </section>
  )

}
export default Registration