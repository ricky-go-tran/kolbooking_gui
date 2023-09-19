import React, { useContext, Suspense, useEffect, lazy } from 'react';
import { BrowserRouter, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import routes from '../routes/admin/index';
import Sidebar from '../components/admin/sidebar/index';
import Header from '../components/admin/Header';
import Main from './Main';
import GeneralLoading from '../pages/general/loading/GeneralLoading';

const Page404 = lazy(() => import('../pages/general/error/NotFound'));

const AdminLayout = ({ children }: { children: React.ReactNode }) => {

  let location = useLocation();
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
