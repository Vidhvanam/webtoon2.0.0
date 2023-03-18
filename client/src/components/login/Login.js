import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios';
import { NavLink, useNavigate } from "react-router-dom"
// import { GoogleLogin } from 'react-google-login';
// import { gapi } from 'gapi-script';
import { userContext } from '../UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Page from "../Page"
const Login = () => {
  const navigation = useNavigate()
  const { user, setUser } = useContext(userContext)
  const [logUser, setLogUser] = useState({
    email: "",
    password: "",

  })
  useEffect(() => {
    if (user) {

      console.log(user)
      localStorage.setItem('user', JSON.stringify(user))
      setTimeout(() => {
        if (user?.roll == "admin") {
          navigation("/")
        } else {

          navigation(-1)
        }
      }, 2000)
      // sessionStorage.setItem('user',user)
    }
  }, [user])

  const formValidation = (e) => {
    const { name, value } = e.target

    setLogUser({ ...logUser, [name]: value })
  }

  const onSubmit = () => {

    axios.post("http://localhost:6969/api/auth/login", logUser)
      .then(res => {
        // alert(res.data.message)
        toast[res.data.type](res.data.message);
        if (res.data.user) {
          console.log(res.data.user)
          setUser(res.data.user._doc)
          localStorage.setItem('user', JSON.stringify(res.data.user._doc))
          if (res.data.user._doc?.roll == "admin") {
            navigation("/")
          }
        }
      })

  }
  return (
    <section className="main-container">
      <Page pageName="LOGIN TO WEBTOON">
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBa={false}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={true}
          theme="light"
        />
        <div className="container-fluid h-custom pd-y-40">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                className="img-fluid" alt="Sample image" />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form >
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                  <p className="lead fw-normal mb-0 me-3">Login Using your Email</p>

                </div>

                <div className="form-outline mt-5 mb-3">
                  <input type="email" id="form3Example3" className=" form-control form-control-lg"
                    name='email'
                    placeholder="Enter a valid email address"
                    onChange={formValidation} />
                </div>

                <div className="form-outline mb-5">
                  <input type="password" id="form3Example4" className="form-control form-control-lg"
                    name='password'
                    placeholder="Enter password"
                    onChange={formValidation} />

                </div>

                <div className="d-flex justify-content-between align-items-center">
                  {/* <div className="form-check mb-0">
                  <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                  <label className="form-check-label" htmlFor="form2Example3">
                    Remember me
                  </label>
                </div> */}
                  {/* <a href="#!" className="text-body">Forgot password?</a> */}
                </div>

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button type="button" className="btn  btn-lg main-btn" onClick={onSubmit}>Login</button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <NavLink to="/registration"
                    className="link-danger">Register</NavLink></p>
                </div>

              </form>
            </div>
          </div>
        </div>
      </Page>
    </section>
  )

}
export default Login