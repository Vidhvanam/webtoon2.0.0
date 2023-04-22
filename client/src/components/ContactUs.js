import { useState } from 'react'
import Page from './Page'
import axios from 'axios'
import Swal from 'sweetalert2'

function ContactUs() {
    const [mail, setMail] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setMail({ ...mail, [name]: value })
    }
    const onSubmit = (e) => {
        e.preventDefault()
        axios.post(`${process.env.REACT_APP_API}api/mail/contactUs`, mail).then(res => {
            console.log(res);

            Swal.fire(res.data.message, 'we will contact you as soon as posible', res.data.type);
            if (res.data.type === "success") {
                setMail({
                    name: "",
                    email: "",
                    subject: "",
                    message: ""
                })
            }


        })

    }
    return (
        < Page pageName="contact us" >
            <div className="text-center">
                <h3 className="text-primary">How Can We Help You?</h3>
                <p className="lead">Tell us your query so we can help you</p>
            </div>
            <div className=" d-flex align-items-center justify-content-center">
                <div className="bg-white col-md-8">
                    <form className="p-4 rounded shadow-md" onSubmit={onSubmit}>
                        <div>
                            <label htmlFor="name" className="form-label">Your Name</label>
                            <input type="text" onChange={handleChange} name="name" value={mail.name} className="form-control" placeholder="Your Name" required />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="email" className="form-label">Your Email</label>
                            <input type="email" onChange={handleChange} name="email" value={mail.email} className="form-control" placeholder="Your Email" required />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="subject" className="form-label">Subject</label>
                            <input type="text" onChange={handleChange} name="subject" value={mail.subject} className="form-control" placeholder="Subject" required />
                        </div>
                        <div className="mt-3 mb-3">
                            <label htmlFor="message" className="form-label">Message</label>
                            <textarea name="message" onChange={handleChange} cols="20" rows="6" value={mail.message} className="form-control"
                                required placeholder="message"></textarea>
                        </div>
                        <button className="btn btn-primary">
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </Page >

    )
}
export default ContactUs