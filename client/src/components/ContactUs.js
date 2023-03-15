import Page from './Page'
function ContactUs() {
    return (
        <div className="main-container">

            <Page pageName="contact us">
                <div className="text-center">
                    <h3 className="text-primary">How Can We Help You?</h3>
                    <p className="lead">Tell us your query so we can help you</p>
                </div>
                <div className=" d-flex align-items-center justify-content-center">
                    <div className="bg-white col-md-8">
                        <form className="p-4 rounded shadow-md">
                            <div>
                                <label for="name" className="form-label">Your Name</label>
                                <input type="text" name="name" className="form-control" placeholder="Your Name" required />
                            </div>
                            <div className="mt-3">
                                <label for="email" className="form-label">Your Email</label>
                                <input type="email" name="email" className="form-control" placeholder="Your Email" required />
                            </div>
                            <div className="mt-3">
                                <label for="subject" className="form-label">Subject</label>
                                <input type="text" name="subject" className="form-control" placeholder="Subject" required />
                            </div>
                            <div className="mt-3 mb-3">
                                <label for="message" className="form-label">Message</label>
                                <textarea name="message" cols="20" rows="6" className="form-control"
                                    placeholder="message"></textarea>
                            </div>
                            <button className="btn btn-primary">
                                Submit Form
                            </button>
                        </form>
                    </div>
                </div>
            </Page>

        </div>
    )
}
export default ContactUs