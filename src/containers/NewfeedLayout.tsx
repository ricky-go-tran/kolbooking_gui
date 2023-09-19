import React, { useContext, Suspense, useEffect, lazy } from 'react';
import Main from './Main';
import NewfeedMain from './NewfeedMain';
import Header from '../components/general/header/Header';

const NewfeedLayout = ({ children }: { children: React.ReactNode }) => {
  return (<>
    <div className="flex flex-col flex-1 w-full bg-gray-50 dark:bg-gray-900 h-screen">
      <Header />
      <NewfeedMain>
        {children}
      </NewfeedMain>
    </div>
  </>);
}

export default NewfeedLayout;
