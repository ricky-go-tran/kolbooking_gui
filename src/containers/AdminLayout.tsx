import React, { useContext, Suspense, useEffect, lazy } from 'react';
import { BrowserRouter, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import routes from '../routes/admin/index';
import Sidebar from '../components/admin/sidebar/index';
import Header from '../components/admin/Header';
import Main from './Main';
import GeneralLoading from '../pages/general/loading/GeneralLoading';
import { AuthContext } from '../contexts/AuthContext';

const Page404 = lazy(() => import('../pages/general/error/NotFound'));

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { state: auth_state, dispatch: auth_dispatch } = useContext(AuthContext);


  if (auth_state.auth_token === "" || auth_state.auth_token === "null") {
    console.log(auth_state.auth_token);
    return (<Navigate to="/login" />)
  }

  return (
    <div
      className={`flex h-screen bg-gray-50 dark:bg-gray-900 `}
    >
      <Sidebar />
      <div className="flex flex-col flex-1 w-full">
        <Header />
        <Main>
          {children}
        </Main>
      </div>
    </div>
  );
}

export default AdminLayout;
