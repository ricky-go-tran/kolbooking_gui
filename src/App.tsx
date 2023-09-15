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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/register' element={<Register />} />
        <Route path='/admin/dashboard' element={<AdminLayout> <Dashboard /> </AdminLayout>} />
        <Route path='*' element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
