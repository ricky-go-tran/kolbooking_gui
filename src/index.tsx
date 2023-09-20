import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/taiwind.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import GeneralLoading from "./pages/general/loading/GeneralLoading";
import { AuthContextProvider } from "./contexts/AuthContext";
import { ProfileContextProvider } from "./contexts/ProfileContext";
import { Windmill } from '@windmill/react-ui'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Suspense fallback={<GeneralLoading />}>
      <AuthContextProvider>
        <ProfileContextProvider>
          <Windmill usePreferences>
            <App />
          </Windmill>
        </ProfileContextProvider>
      </AuthContextProvider>
    </Suspense>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
