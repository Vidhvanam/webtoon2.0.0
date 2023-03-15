import Page from "./Page"
function AboutUs() {
    return (

        <div className="main-container">
            <Page pageName="About us">
                <section className="w-100 d-flex justify-content-center">
                    <div id="about">
                        <p>
                            <strong>Meet WEBTOON™.</strong><br />
                            We started a whole new way to create stories and opened it up to
                            anyone with a story to tell.<br />
                            We're home to thousands of creator-owned content with amazing, diverse
                            visions from all over the world.<br />
                            Get in on the latest original romance, comedy, action, fantasy,
                            horror, and more from big names and<br />
                            big names to be - made just for WEBTOON.<br />
                            We're available anywhere, anytime, and always for free.
                        </p>
                        <h3 className="mb-2"><i className="fa-solid fa-envelope"></i> Contacts</h3>
                        <p>
                            <a href="mailto:webtoonip@webtoon.com">webtoonip@webtoon.com</a> for
                            IP business, rights, and licensing inquiries.<br />
                            <a href="mailto:webtoonads@webtoon.com">webtoonads@webtoon.com</a> for
                            advertising and partnership opportunities.<br />
                            <a href="mailto:webtoonpress@webtoon.com">webtoonpress@webtoon.com</a>
                            for press/media inquiries.
                        </p>
                    </div>
                </section>
            </Page>
        </div>

    )
}
export default AboutUs