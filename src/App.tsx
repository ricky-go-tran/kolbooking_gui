import React from 'react';
import { Routes, BrowserRouter, Route, Navigate } from 'react-router-dom'
import Login from './pages/general/login/Login'
import { Button } from '@windmill/react-ui'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
