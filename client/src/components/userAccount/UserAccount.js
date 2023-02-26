import { useEffect  ,useContext } from "react"
import {  NavLink, useNavigate ,Outlet } from "react-router-dom"
import { userContext } from '../UserContext';

export default function UserAccount(){
    const {user , setUser} = useContext(userContext)
    const navigate = useNavigate()
    useEffect(()=>{
     if(!user){
        navigate('/')
     }
      
    },[user])
    return(
        <>
        <nav className="user-account-nav">
          <ul className="flex-row-box">
        <li>
          <NavLink  to="subscribes">Subscribes</NavLink>
        </li>
        <li>
          <NavLink  to="reviwes">Revies</NavLink>
        </li>
        {/* <li>
          <a  href="#"></a>
        </li> */}
        <li>
          <a  href="#" onClick={()=>{
            setUser(null)    
            localStorage.removeItem('user')
            navigate('/')
            }}>Log Out</a>
        </li>
      </ul>
      </nav>
      <Outlet/>
        </>
    )
}