import React from 'react';
import { Routes, BrowserRouter, Route, Navigate } from 'react-router-dom'
import Login from './pages/general/login/Login'
import ForgotPassword from './pages/general/forgot-password/ForgotPassword';
import Register from './pages/general/register/Register';
import Homepage from './pages/general/homepage/Homepage';
import Page404 from './pages/general/error/NotFound';
import { Button } from '@windmill/react-ui'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
