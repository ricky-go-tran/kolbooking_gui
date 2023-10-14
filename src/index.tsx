import React, { Suspense } from "react"
import ReactDOM from "react-dom/client"
import "./assets/css/taiwind.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import GeneralLoading from "./pages/general/loading/GeneralLoading"
import { AuthContextProvider } from "./contexts/AuthContext"
import { ProfileContextProvider } from "./contexts/ProfileContext"
import { Windmill } from "@windmill/react-ui"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { ToastContextProvider } from "./contexts/ToastContext"
import { SearchKolHomepageProvider } from "./contexts/SearchKolHomepageContext"
import { ReportJobGeneralContextProvider } from "./contexts/ReportJobGeneralContext"
import {
  ReportProfileGeneralContext,
  ReportProfileGeneralContextProvider,
} from "./contexts/ReportProfileGeneralContext"
import { StatusLoginContextProvider } from "./contexts/StatusLoginContext"
import { ErrorContextProvider } from "./contexts/ErrorContext"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <GoogleOAuthProvider clientId="345818639852-npt2v8lmrrsj8vs4lovm5aou37i4pfji.apps.googleusercontent.com">
    <Suspense fallback={<GeneralLoading />}>
      <ErrorContextProvider>
        <ReportJobGeneralContextProvider>
          <ReportProfileGeneralContextProvider>
            <ToastContextProvider>
              <AuthContextProvider>
                <ProfileContextProvider>
                  <StatusLoginContextProvider>
                    <SearchKolHomepageProvider>
                      <Windmill usePreferences>
                        <App />
                      </Windmill>
                    </SearchKolHomepageProvider>
                  </StatusLoginContextProvider>
                </ProfileContextProvider>
              </AuthContextProvider>
            </ToastContextProvider>
          </ReportProfileGeneralContextProvider>
        </ReportJobGeneralContextProvider>
      </ErrorContextProvider>
    </Suspense>
  </GoogleOAuthProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
