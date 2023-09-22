import React, { useContext, Suspense, useEffect, lazy } from 'react';
import Main from './Main';
import NewfeedMain from './NewfeedMain';
import Header from '../components/general/header/Header';
import Footer from '../components/general/footer/Footer';

const NewfeedLayout = ({ children }: { children: React.ReactNode }) => {
  return (<>
    <div className="flex flex-col flex-1 w-full bg-gray-50 dark:bg-gray-900 min-h-screen">
      <Header />
      <NewfeedMain>
        {children}
      </NewfeedMain>
      <Footer />
    </div>
  </>);
}

export default NewfeedLayout;
