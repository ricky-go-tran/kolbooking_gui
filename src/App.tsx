import React, { lazy } from 'react';

import { Routes, BrowserRouter, Route, Navigate } from 'react-router-dom'
import { Button } from '@windmill/react-ui'

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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
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
