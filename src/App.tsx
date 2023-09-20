import React, { lazy, useEffect, useContext } from 'react';
import { ProfileContext } from './contexts/ProfileContext';
import { AuthContext } from './contexts/AuthContext';
import { Routes, BrowserRouter, Route } from 'react-router-dom'
import { getProxy, getCDNImage } from './utils/PathUtil';
import { ProfileType } from './utils/global_type';
import axios from 'axios';

const HomePage = lazy(() => import('./pages/general/newfeed/HomePage'));
const UnAuthRoutes = lazy(() => import('./pages/general/redirect/UnAuthRoutes'));
const RedirectByRole = lazy(() => import('./pages/general/redirect/RedirectByRole'));
const ForgotPassword = lazy(() => import('./pages/general/forgot-password/ForgotPassword'));
const Login = lazy(() => import('./pages/general/login/Login'));
const Register = lazy(() => import('./pages/general/register/Register'));
const Page404 = lazy(() => import('./pages/general/error/NotFound'));
const AdminLayout = lazy(() => import('./containers/AdminLayout'));
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const Report = lazy(() => import('./pages/admin/Report'));
const Job = lazy(() => import('./pages/admin/Job'));
const User = lazy(() => import('./pages/admin/User'));
const Crontab = lazy(() => import('./pages/admin/Crontab'));
const SetupProfile = lazy(() => import('./pages/general/first-login/SetupProfile'));
const SetupKolProfile = lazy(() => import('./pages/kol/setup/SetupKolProfile'));
const AdminProfile = lazy(() => import('./pages/admin/Profile'));
const AdminChangePassword = lazy(() => import('./pages/admin/ChangePassword'));
const NewfeedLayout = lazy(() => import('./containers/NewfeedLayout'));
const Jobs = lazy(() => import('./pages/general/jobs/Job'));
const KOL = lazy(() => import('./pages/general/kols/KOL'));
const KolJobs = lazy(() => import('./pages/kol/Jobs'));
const KolBookmark = lazy(() => import('./pages/kol/Bookmarks'));
const Schedule = lazy(() => import('./pages/kol/Schedule'));
const KolStatistics = lazy(() => import('./pages/kol/Statistics'));

function App() {
  const { state: auth_state, dispatch: auth_dispatch } = useContext(AuthContext);
  const { dispatch: profile_dispatch } = useContext(ProfileContext);


  useEffect(() => {
    if (auth_state.auth_token !== "null" && auth_state.auth_token !== "") {
      axios.get(getProxy('/api/v1/profiles'), {
        headers: {
          Authorization: auth_state.auth_token,
        },
      })
        .then(res => {
          let data = res.data.data.attributes
          let profileData: ProfileType = {
            fullname: data.fullname,
            avatar: data.avatar === "null" ? getCDNImage("/image/upload/v1695013387/xqipgdlevshas5fjqtzx.jpg") : getProxy(data.avatar),
            role: data.role
          }
          profile_dispatch({ type: "FETCH", payload: profileData })
        })
        .catch(err => {
          auth_dispatch({ type: "LOGOUT", payload: null })
          profile_dispatch({ type: "CLEAR", payload: null })
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NewfeedLayout><HomePage /></NewfeedLayout>} />
        <Route path="/redirect/roles" element={<RedirectByRole />} />
        <Route path="/jobs" element={<NewfeedLayout><Jobs /></NewfeedLayout>} />
        <Route path="/kols" element={<NewfeedLayout><KOL /></NewfeedLayout>} />
        <Route path='/login' element={<UnAuthRoutes><Login /></UnAuthRoutes>} />
        <Route path='/forgot-password' element={<UnAuthRoutes><ForgotPassword /></UnAuthRoutes>} />
        <Route path='/register' element={<UnAuthRoutes><Register /></UnAuthRoutes>} />
        <Route path='/setup' element={<SetupProfile />} />

        <Route path='/admin/dashboard' element={<AdminLayout> <Dashboard /> </AdminLayout>} />
        <Route path='/admin/reports' element={<AdminLayout> <Report /> </AdminLayout>} />
        <Route path='/admin/jobs' element={<AdminLayout> <Job /> </AdminLayout>} />
        <Route path='/admin/users' element={<AdminLayout> <User /> </AdminLayout>} />
        <Route path='/admin/crontab' element={<AdminLayout> <Crontab /> </AdminLayout>} />
        <Route path='/admin/profile' element={<AdminLayout><AdminProfile /></AdminLayout>} />
        <Route path='/kol/setup' element={<SetupKolProfile />} />
        <Route path='/admin/password/edit' element={<AdminLayout><AdminChangePassword /></AdminLayout>} />

        <Route path='/kol/jobs' element={<AdminLayout> <KolJobs /> </AdminLayout>} />
        <Route path='/kol/bookmarks' element={<AdminLayout> <KolBookmark /> </AdminLayout>} />
        <Route path='/kol/schedule' element={<AdminLayout><Schedule /></AdminLayout>} />
        <Route path='/kol/statistics' element={<AdminLayout><KolStatistics /></AdminLayout>} />

        <Route path='*' element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
