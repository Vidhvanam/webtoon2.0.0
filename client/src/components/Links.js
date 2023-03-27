import { useContext, useEffect } from 'react'
import { userContext } from './UserContext'
import { NavLink } from 'react-router-dom'

const Links = () => {
  const { user } = useContext(userContext)

  let links
  if (user?.roll === "admin") {
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
      <li className="nav-item me-3">
        <NavLink className="nav-link" to="/promotions">promote Series</NavLink>
      </li>
      <li className="nav-item me-3">
        <NavLink className="nav-link" to="/addAuthor">Author</NavLink>
      </li>

    </>
  } else {
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
export default Links