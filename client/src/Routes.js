import WTLoader from "./components/WTLoader";
import { Route, Routes, Navigate, Outlet } from "react-router-dom"
import { useState, useEffect, lazy, Suspense } from 'react';
import { userContext } from './components/UserContext'


const Registration = lazy(() => import('./components/registration/Regitration'));
const Login = lazy(() => import('./components/login/Login'));


const Popular = lazy(() => import('./components/Popular'));

const ContactUs = lazy(() => import('./components/ContactUs'));

const AboutUs = lazy(() => import('./components/AboutUs'));

const NotFound = lazy(() => import('./components/NotFound'));

const SeriesInfo = lazy(() => import('./components/seriesInfoPage/SeriesInfo'));

const EpisodeView = lazy(() => import('./components/EpisodeView'));

const UserAccount = lazy(() => import('./components/userAccount/UserAccount'));

const Subscribes = lazy(() => import('./components/userAccount/Subscribes'));

const ScrollToTop = lazy(() => import('./components/ScrollToTop'));

const UserReviws = lazy(() => import('./components/userAccount/UserReviews'));


const CreateSeries = lazy(() => import('./components/admin/CreateSeries'));

const CreateSeriesNav = lazy(() => import('./components/admin/CreateSeriesNav'));

const AddEpisode = lazy(() => import('./components/admin/AddEpisode'));

const SeriesInfoAdmin = lazy(() => import('./components/admin/SeriesInfoAdmin'));

const EditSeries = lazy(() => import('./components/admin/editSeries/EditSeries'));

const ManageSeries = lazy(() => import('./components/admin/ManageSeries'));

const EditSeriesInfo = lazy(() => import('./components/admin/editSeries/EditSeriesInfo'));

const EditEpisode = lazy(() => import('./components/admin/editSeries/EditEpisode'));

const ManageAddEpisode = lazy(() => import('./components/admin/editSeries/ManageAddEpisode'));

const Promotions = lazy(() => import('./components/admin/Promotions'));

const AddAuthor = lazy(() => import('./components/admin/author/AddAuthor'));

const Genres = lazy(() => import('./components/Genres'));

const Home = lazy(() => import('./components/Home'));

const Terms = lazy(() => import('./components/Terms'));
export default function MainRoutes({ user }) {
  let routes = (
    <Suspense fallback={<WTLoader />}>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/genres" element={<Genres />} />
        <Route path="/popular" element={<Popular />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/episode/:file" element={<EpisodeView />} />
        <Route exact path="/series/:id" element={<SeriesInfo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
  if (user) {
    if (user?.roll === "admin") {
      // console.log("admin");
      routes =
        <Suspense fallback={<WTLoader />}>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/createSeries" element={<Outlet />}>
              <Route index element={<Navigate to="first" />} />
              <Route path="first" element={<CreateSeries />} />
              <Route path="second/:id" element={<AddEpisode />} />
            </Route>
            <Route path="/episode/:file" element={<EpisodeView />} />
            <Route exact path="/series/admin/:id" element={<SeriesInfoAdmin />} />
            <Route path="/editSeries" element={<EditSeries />} />
            <Route path="/EditEpisode" element={<EditEpisode />} />
            <Route path="/EditSeriesInfo/:id" element={<EditSeriesInfo />} />
            <Route path="/ManageSeries/:id" element={<ManageSeries />} />
            <Route path="/ManageSeries/addEpisode" element={<ManageAddEpisode />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/promotions" element={<Promotions />} />
            <Route path="/account" element={<UserAccount />}>

            </Route>
            <Route path="/addAuthor" element={<AddAuthor />} />

          </Routes >
        </Suspense>
    } else {
      routes = <Suspense fallback={<WTLoader />}>
        <Routes>
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
          <Route exact path="/series/:id" element={<SeriesInfo />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    }
  }

  return routes
}