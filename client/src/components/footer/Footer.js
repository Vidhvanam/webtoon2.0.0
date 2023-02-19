import logo from '../header/logo3.png'
import { NavLink } from 'react-router-dom'

export default function Footer() {
  return (
    <>
      <footer
        className="text-center text-lg-start text-dark bg-light "
      >

        <section className="p-10">
          <div className="container text-center text-md-start mt-5">
            <div className="row mt-3">
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">   <img className='logo me-5' src={logo} />
                </h6>

                <p>
                  Have a story to tell?
                  Share it on WEBTOON CANVAS.
                  Find everything you need to get it published.
                </p>
              </div>

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Products</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                // style="width: 60px; background-color: #7c4dff; height: 2px"
                />
                <p>
                  <a href="#!" className="text-dark">MDBootstrap</a>
                </p>
                <p>
                  <a href="#!" className="text-dark">MDWordPress</a>
                </p>
                <p>
                  <a href="#!" className="text-dark">BrandFlow</a>
                </p>
                <p>
                  <a href="#!" className="text-dark">Bootstrap Angular</a>
                </p>
              </div>

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                <h6 className="text-uppercase fw-bold">Useful links</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                // style="width: 60px; background-color: #7c4dff; height: 2px"
                />
                <p>
                  <a href="#!" className="text-dark">Your Account</a>
                </p>
                <p>
                  <a href="#!" className="text-dark">Become an Affiliate</a>
                </p>
                <p>
                  <a href="#!" className="text-dark">Shipping Rates</a>
                </p>
                <p>
                  <a href="#!" className="text-dark">Help</a>
                </p>
              </div>

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                <h6 className="text-uppercase fw-bold">Contact</h6>
                <hr
                  className="mb-4 mt-0 d-inline-block mx-auto"
                  style={{ width: '60px', backgroundColor: '#7c4dff', height: '2px' }}
                />
                <p><i className="fas fa-home mr-3"></i> New York, NY 10012, US</p>
                <p><i className="fas fa-envelope mr-3"></i> info@example.com</p>
                <p><i className="fas fa-phone mr-3"></i> + 01 234 567 88</p>
                <p><i className="fas fa-print mr-3"></i> + 01 234 567 89</p>
              </div>
            </div>
          </div>
        </section>

        <div
          className="text-center p-3"
          style={{ backgroundColor: 'var(--main-color)' }}
        >
          © 2020 Copyright:
          <NavLink className="text-dark" to="/"
          >Wbtoon.com</NavLink>
        </div>
      </footer>
    </>
  )
}