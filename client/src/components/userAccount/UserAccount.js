import { useEffect  ,useContext } from "react"
import {  NavLink, useNavigate ,Outlet } from "react-router-dom"
import { userContext } from '../UserContext';

export default function UserAccount(){
    const {user , setUser} = useContext(userContext)
    let links
    if(user?.roll === "admin"){
      links =  <ul className="flex-row-box">
     <li>
        <a  href="#" onClick={()=>{
          setUser(null)    
          localStorage.removeItem('user')
          navigate('/')
          }}>Log Out</a>
      </li>
    </ul>
    }else{
      links =  <ul className="flex-row-box">
      <li>
        <NavLink  to="subscribes">Subscribes</NavLink>
      </li>
      <li>
        <NavLink  to="reviwes">Reviwes</NavLink>
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
    }
    const navigate = useNavigate()
    useEffect(()=>{
     if(!user){
        navigate('/')
     }
      
    },[user])
    return(
        <>
        <nav className="user-account-nav">
         {links}
      </nav>
      <Outlet/>
        </>
    )
}