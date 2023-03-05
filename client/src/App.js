import {  useState ,useEffect} from 'react';
import {userContext } from './components/UserContext'
import { Routes, Route, BrowserRouter ,Navigate} from 'react-router-dom';

import Registration from './components/registration/Regitration';
import Header from './components/header/Header'
import Login from './components/login/Login'
import Footer from './components/footer/Footer'
import Genres from './components/Genres';
import Popular from './components/Popular';
import ContactUs from './components/ContactUs';
import AboutUs from './components/AboutUs';
import NotFound from './components/NotFound';
import Home from './components/Home'
import SeriesInfo from './components/seriesInfoPage/SeriesInfo'
import EpisodeView from './components/EpisodeView'
import UserAccount from './components/userAccount/UserAccount'
import Subscribes from './components/userAccount/Subscribes';
import ScrollToTop from './components/ScrollToTop';
import UserReviws from './components/userAccount/UserReviews';
function App() {
  const [user ,setUser] = useState()
  useEffect(()=>{
    if(localStorage.getItem('user')){
        setUser(JSON.parse(localStorage.getItem('user')))
    }
},[])
// useEffect(()=>{
//   console.log(user);
// },[user])
  return (
   
    <userContext.Provider value={{user , setUser}}>
    <BrowserRouter>
        <ScrollToTop/>
        <Header />
      <Routes>
        <Route exact  path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/account" element={<UserAccount/>}>
            <Route index element={<Navigate to="subscribes" />} />
            <Route path="subscribes" element={<Subscribes/>}  replace/>
            <Route path="reviwes" element={<UserReviws/>}/>
        </Route>
        <Route path="/episode/:file" element={<EpisodeView />} />
        <Route path="/series/:id" element={<SeriesInfo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
        <Footer />
       
    </BrowserRouter>
    </userContext.Provider>
  );

}

export default App;
