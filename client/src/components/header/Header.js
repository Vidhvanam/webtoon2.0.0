import logo from './logo3.png'
import './header.css'
import { NavLink } from 'react-router-dom'
import { useContext ,useEffect } from 'react'
import { userContext } from '../UserContext'
import { FaUserAlt } from 'react-icons/fa'
function Header() {
  
  
  const {user} = useContext(userContext)
  // useEffect(()=>{
  //     if(localStorage.getItem('user')){
  //         setUser(JSON.parse(localStorage.getItem('user')))
  //         console.log();
  //     }
  //     console.log(user);
  // },[])
  const Links = () =>{
    let links
   if(user?.roll === "admin"){
    links = <>
    <li className="nav-item me-3">
    <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
  </li>
  <li className="nav-item me-3">
    <NavLink className="nav-link" to="/createSeries">Create Series</NavLink>
  </li>
  <li className="nav-item me-3">
    <NavLink className="nav-link" to="/editSeries">Edit Series</NavLink>
  </li>

    </>
   } else{
    links = <>
     <li className="nav-item me-3">
    <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
  </li>
  <li className="nav-item me-3">
    <NavLink className="nav-link" to="/genres">Genres</NavLink>
  </li>

  <li className="nav-item me-3">
    <NavLink className="nav-link" to='/popular'>Popular</NavLink>
  </li>
  <li className="nav-item me-3">
    <NavLink className="nav-link" to='/contact'>Contact us</NavLink>
  </li>
  <li className="nav-item me-3">
    <NavLink className="nav-link" to='/about'>About</NavLink>
  </li>
    </>
   }
   return links
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <img className='logo me-5' src={logo} alt="webtoon" />
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <Links/>
            </ul>
            {/* <button type="button" className="btn btn-dark me-2">Publish</button> */}
            {user ? (<>
             <NavLink to={`/account`} className='nav-link user-account login-btn'> <FaUserAlt /> {user.userName?.substring(0, 6)}</NavLink>
            </>
            )
              :<NavLink to='/login' className='nav-link login-btn'>login</NavLink>

            }
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            </form>

          </div>
        </div>
      </nav>
    </>


  )
}
export default Header

