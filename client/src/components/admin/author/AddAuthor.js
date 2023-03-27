import Page from "../../Page"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from "react"
export default function AddAuthor() {
    const [newAuthor, setNewAuthor] = useState({
        name: "",
        email: "",
        phone: "",
        introduction: '',
    })
    const [error, setError] = useState({
        name: "",
        email: "",
        phone: "",
        introduction: ""
    })
    const formValidation = () => {
        let flag = true
        if (newAuthor.name.length < 2) {
            setError(prev => ({ ...prev, name: "Enter proper name" }))
            flag = false
        } else {
            setError(prev => ({ ...prev, name: "" }))
        }
        const emailRegex = /^[A-Za-z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
        if (!emailRegex.test(newAuthor.email)) {
            setError(prev => ({ ...prev, email: "Enter valid email" }))
            flag = false

        } else {
            setError(prev => ({ ...prev, email: "" }))
        }
        const phoneRegex = /^[0-9]{10}$/

        if (!phoneRegex.test(newAuthor.phone)) {
            setError(prev => ({ ...prev, phone: "Enter valid phone number" }))
            flag = false

        } else {
            setError(prev => ({ ...prev, phone: "" }))
        }
        if (newAuthor.introduction.length > 100 || newAuthor.introduction.length < 20) {
            setError(prev => ({ ...prev, introduction: "introduction should be between 20 to 100 character" }))
            flag = false

        } else {
            setError(prev => ({ ...prev, introduction: "" }))
        }
        return flag
    }
    const onSubmit = (e) => {
        e.preventDefault();
        const flag = formValidation()
        if (flag) {
            axios.post("http://localhost:6969/api/author/addAuthor", newAuthor)
                .then(res => {
                    // alert(res.data.type)
                    toast[res.data.type](res.data.message);
                    setNewAuthor({
                        name: "",
                        email: "",
                        phone: "",
                        introduction: ""
                    })

                })
        } else {
            console.log('invalid form');
            toast.info("Please fill the form correctly");
        }


    }
    const addData = (e) => {
        const { name, value } = e.target;
        setNewAuthor(prev => ({ ...prev, [name]: value }))
    }
    return (
        <Page pageName="Add Author">
            {console.log(newAuthor)}
            <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBa={false}
                closeOnClick={true}
                pauseOnHover={true}
                draggable={true}
                theme="light"
            />
            <div className=" d-flex align-items-center justify-content-center">
                <div className="bg-white col-md-8">
                    <form className="p-4 rounded shadow-md" onSubmit={onSubmit}>
                        <div>
                            <label htmlFor="name" className="form-label">Your Name</label>
                            <input type="text" value={newAuthor.name} name="name" className="form-control" placeholder="Author Name" onChange={addData} />
                            {error.name.length > 0 && <small className='invalid-feedback d-block'>{error.name}</small>}

                        </div>
                        <div className="mt-3">
                            <label htmlFor="email" className="form-label">Your Email</label>
                            <input type="email" value={newAuthor.email} name="email" className="form-control" placeholder="Author's Email" onChange={addData} />
                            {error.email.length > 0 && <small className='invalid-feedback d-block'>{error.email}</small>}

                        </div>
                        <div className="mt-3">
                            <label htmlFor="phone" className="form-label">
                                Phone Number
                            </label>
                            <input type="number" value={newAuthor.phone} name="phone" className="form-control" placeholder="Auhtor's phone number" onChange={addData} />
                            {error.phone.length > 0 && <small className='invalid-feedback d-block'>{error.phone}</small>}

                        </div>
                        <div className="mt-3 mb-3">
                            <label htmlFor="introduction" className="form-label">Introductoin</label>
                            <textarea name="introduction" value={newAuthor.introduction} cols="20" rows="6" className="form-control"
                                placeholder="Introduction of Author" onChange={addData}></textarea>
                            {error.introduction.length > 0 && <small className='invalid-feedback d-block'>{error.introduction}</small>}
                        </div>

                        <button className="btn btn-primary">
                            Add Author
                        </button>
                    </form>
                </div>
            </div>
        </Page>
    )
}