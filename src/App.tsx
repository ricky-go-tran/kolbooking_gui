import React, { lazy, useEffect, useContext } from 'react';
import { ProfileContext } from './contexts/ProfileContext';
import { AuthContext } from './contexts/AuthContext';
import { Routes, BrowserRouter, Route, Navigate } from 'react-router-dom'
import { getProxy, getCDNImage } from './utils/PathUtil';
import { Button } from '@windmill/react-ui'
import { ProfileType } from './utils/global_type';
import axios from 'axios';

const HomePage = lazy(() => import('./pages/general/newfeed/HomePage'));
const ForgotPassword = lazy(() => import('./pages/general/forgot-password/ForgotPassword'));
const Login = lazy(() => import('./pages/general/login/Login'));
const Register = lazy(() => import('./pages/general/register/Register'));
const Homepage = lazy(() => import('./pages/general/homepage/Homepage'));
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

function App() {
  const { state: auth_state, dispatch: auth_dispatch } = useContext(AuthContext);
  const { state: profile_state, dispatch: profile_dispatch } = useContext(ProfileContext);


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

  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<NewfeedLayout><HomePage /></NewfeedLayout>} />
        <Route path="/jobs" element={<NewfeedLayout><Jobs /></NewfeedLayout>} />
        <Route path="/kols" element={<NewfeedLayout><KOL /></NewfeedLayout>} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/register' element={<Register />} />
        <Route path='/setup' element={<SetupProfile />} />
        <Route path='/admin/dashboard' element={<AdminLayout> <Dashboard /> </AdminLayout>} />
        <Route path='/admin/reports' element={<AdminLayout> <Report /> </AdminLayout>} />
        <Route path='/admin/jobs' element={<AdminLayout> <Job /> </AdminLayout>} />
        <Route path='/admin/users' element={<AdminLayout> <User /> </AdminLayout>} />
        <Route path='/admin/crontab' element={<AdminLayout> <Crontab /> </AdminLayout>} />
        <Route path='/admin/profile' element={<AdminLayout><AdminProfile /></AdminLayout>} />
        <Route path='/kol/setup' element={<SetupKolProfile />} />
        <Route path='/admin/password/edit' element={<AdminLayout><AdminChangePassword /></AdminLayout>} />
        <Route path='*' element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
