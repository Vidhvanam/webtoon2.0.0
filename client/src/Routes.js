import { Route, Routes, Navigate, Outlet } from "react-router-dom"
import { useState, useEffect } from 'react';
import { userContext } from './components/UserContext'

import Registration from './components/registration/Regitration';

import Login from './components/login/Login'
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

import CreateSeries from "./components/admin/CreateSeries";
import CreateSeriesNav from "./components/admin/CreateSeriesNav";
import AddEpisode from "./components/admin/AddEpisode"
import SeriesInfoAdmin from "./components/admin/SeriesInfoAdmin";
import EditSeries from "./components/admin/editSeries/EditSeries"

export default function MainRoutes({ user }) {
  let routes = (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />

        <Route path="/episode/:file" element={<EpisodeView />} />
        <Route path="/series/:id" element={<SeriesInfo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
  if (user) {
    if (user?.roll === "admin") {
      // console.log("admin");
      routes = <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/createSeries" element={<Outlet />}>
          <Route index element={<Navigate to="first" />} />
          <Route path="first" element={<CreateSeries />} />
          <Route path="second/:id" element={<AddEpisode />} />
        </Route>
        <Route path="/episode/:file" element={<EpisodeView />} />
        <Route path="/series/admin/:id" element={<SeriesInfoAdmin />} />
        <Route path="/editSeries" element={<EditSeries />} />

        <Route path="/account" element={<UserAccount />}>


        </Route>

      </Routes >
    } else {
      routes = <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/account" element={<UserAccount />}>
          <Route index element={<Navigate to="subscribes" />} />
          <Route path="subscribes" element={<Subscribes />} replace />
          <Route path="reviwes" element={<UserReviws />} />
        </Route>
        <Route path="/episode/:file" element={<EpisodeView />} />
        <Route path="/series/:id" element={<SeriesInfo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    }
  }

  return routes
}