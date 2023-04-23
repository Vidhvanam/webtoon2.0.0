import React, { useState } from 'react'
import axios from 'axios';
import { NavLink, useNavigate } from "react-router-dom"
// import { GoogleForgotPassword } from 'react-google-ForgotPassword';
// import { gapi } from 'gapi-script';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Page from "./Page"

const emailRegex = /^[A-Za-z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
const ForgotPassword = ({ setForgotPasswordUser }) => {
    const [user, setUser] = useState({
        email: "",
    })
    const [error, setError] = useState({
        errEmail: '',
    })
    const navigation = useNavigate()

    const formValidation = e => {
        e.preventDefault();
        const { name, value } = e.target;
        const newError = error
        switch (name) {

            case "email":
                newError.errEmail = emailRegex.test(value)
                    ? ""
                    : "Email address is invalid";
                console.log(error.errEmail)
                break;

            default:
                break;
        }
        setError(newError);
        setUser(prevData => {
            return { ...prevData, [name]: value }
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
    const onSubmit = (e) => {
        e.preventDefault()
        if (formValid()) {
            console.log('valid form');

            axios.post(`${process.env.REACT_APP_API}api/auth/forgotPassword`, user)
                .then(res => {
                    // alert(res.data.type)
                    toast[res.data.type](res.data.message);


                })
            // console.log('this.state :>> ', this.state);
        } else {
            console.log('invalid form');
            toast.info("Please fill the form correctly");
            // console.log('this.state :>> ', this.state);
        }

    }
    return (
        <Page pageName="reset password">

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
                        <form onSubmit={onSubmit}>
                            <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                <p className="lead fw-normal mb-0 me-3">Enter your registered email to get reset link</p>

                            </div>

                            <div className="form-outline mt-3 mb-3">
                                <input type="email" id="form3Example3" className=" form-control form-control-lg"
                                    name='email'
                                    placeholder="Enter a valid email address"
                                    onChange={formValidation} />
                                {error.errEmail.length > 0 && <small className='invalid-feedback d-block'>{error.errEmail}</small>}
                            </div>




                            {/* <div className="d-flex justify-content-between align-items-center">

                <a href="#!" className="text-body">Forgot password?</a>
              </div> */}

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="submit" className="btn  btn-lg main-btn">Get Reset Link</button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">Have an account? <NavLink to="/login"
                                    className="link-danger">LOGIN</NavLink></p>
                            </div>

                        </form>
                    </div>
                </div>
            </div>

        </Page>
    )

}
export default ForgotPassword