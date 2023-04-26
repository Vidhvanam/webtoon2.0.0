import React, { useState, useContext } from 'react'
import axios from 'axios';
import { NavLink, useNavigate, useParams } from "react-router-dom"
// import { GoogleRegistration } from 'react-google-Registration';
// import { gapi } from 'gapi-script';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Page from "./Page"
import { userContext } from './UserContext';


const Registration = ({ setRegistrationUser }) => {
    const { user, setUser } = useContext(userContext)

    const { id } = useParams()
    const [userDetails, setuserDetails] = useState({

        password: "",
        conformPass: ""
    })
    const [error, setError] = useState({

        errPass: '',
        errConformPass: ''
    })
    const navigation = useNavigate()

    const formValidation = e => {
        e.preventDefault();
        const { name, value } = e.target;
        const newError = error
        switch (name) {

            case "password":
                newError.errPass =
                    value.length < 6 ? "Atleast 6 characaters required" : "";
                newError.errConformPass =
                    value !== userDetails.conformPass ? "Password does not match" : "";
                break;
            case "conformPass":
                newError.errConformPass =
                    value !== userDetails.password ? "Password does not match" : "";
                break;
            default:
                break;
        }
        setError(newError);
        setuserDetails(prevData => {
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
        Object.values(userDetails).forEach(val => {
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
            const { password } = userDetails

            axios.post(`${process.env.REACT_APP_API}api/auth/resetPassword`, { id, password })
                .then(res => {
                    // alert(res.data.type)
                    toast[res.data.type](res.data.message);
                    setTimeout(() => {
                        if (res.data.type === "success") {
                            setUser(null)
                            localStorage.removeItem("userDetails")
                            navigation("/login")
                        }
                    }
                        , 2500)

                })
            // console.log('this.state :>> ', this.state);
        } else {
            console.log('invalid form');
            toast.info("Please fill the form correctly");
            // console.log('this.state :>> ', this.state);
        }

    }
    return (
        <Page pageName="Reset password">

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
                                <p className="lead fw-normal mb-0 me-3">Enter new password</p>

                            </div>


                            <div className="form-outline mt-5 mb-3">
                                <input type="password" className="form-control form-control-lg"
                                    name='password'
                                    placeholder="Enter password"
                                    onChange={formValidation} />
                                {error.errPass.length > 0 && <small className='invalid-feedback d-block'>{error.errPass}</small>}

                            </div>
                            <div className="form-outline mb-3">
                                <input type="password" id="form3Example4" className="form-control form-control-lg"
                                    name='conformPass'
                                    placeholder="Conform Password"
                                    onChange={formValidation} />
                                {error.errConformPass.length > 0 && <small className='invalid-feedback d-block'>{error.errConformPass}</small>}
                            </div>

                            {/* <div className="d-flex justify-content-between align-items-center">

                <a href="#!" className="text-body">Forgot password?</a>
              </div> */}

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button type="submit" className="btn  btn-lg main-btn">Reset Password</button>
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
export default Registration