import { useEffect  ,useContext } from "react"
import {  useNavigate } from "react-router-dom"
import { userContext } from './UserContext';

export default function UserAccount(){
    const {user , setUser} = useContext(userContext)
    const navigate = useNavigate()
    useEffect(()=>{
     if(!user){
        navigate('/')
     }
      
    },[])
    return(
        <>
        <nav className="user-account-nav">
          <ul className="flex-row-box">
        <li>
          <a  aria-current="page" href="#">Home</a>
        </li>
        <li>
          <a  href="#">Link</a>
        </li>
        <li>
          <a  href="#" onClick={()=>{
            setUser(null)    
            localStorage.removeItem('user')
            navigate('/')
            }}>Log Out</a>
        </li>
      </ul>
      </nav>
        </>
    )
}