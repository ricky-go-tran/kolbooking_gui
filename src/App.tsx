import { lazy, useEffect, useContext, useState } from "react"
import { ProfileContext } from "./contexts/ProfileContext"
import { AuthContext } from "./contexts/AuthContext"
import { Routes, BrowserRouter, Route, Navigate } from "react-router-dom"
import { getProxy, getCDNImage } from "./utils/PathUtil"
import { ProfileType } from "./global_variable/global_type"
import axios from "axios"
import { PROFILE_URL } from "./global_variable/global_uri_backend"
import ActionCable from "actioncable"
import ToastPanel from "./components/general/message/ToastPanel"
import { ToastContext } from "./contexts/ToastContext"
import { generalMessage } from "./utils/ToastUtil"
import { StatusLoginContext } from "./contexts/StatusLoginContext"
import KolProtectRoute from "./components/auth/KolProtectRoute"
import BaseProtectRoute from "./components/auth/BaseProtectRoute"
import AdminProtectRoute from "./components/auth/AdminProtectRoute"
import { ErrorContext } from "./contexts/ErrorContext"
import AuthRoutes from "./components/auth/AuthRoute"
import HomePage from "./pages/general/newfeed/HomePage"
import Logout from "./components/general/logout/Logout"
import BussinessProfile from "./pages/base/BussinessProfile"
import Statistics from "./pages/base/Statistical"
const UnAuthRoutes = lazy(() => import("./pages/general/redirect/UnAuthRoutes"))
const RedirectByRole = lazy(
  () => import("./pages/general/redirect/RedirectByRole")
)
const ForgotPassword = lazy(
  () => import("./pages/general/forgot-password/ForgotPassword")
)

const Login = lazy(() => import("./pages/general/login/Login"))
const Register = lazy(() => import("./pages/general/register/Register"))
const Page404 = lazy(() => import("./pages/general/error/NotFound"))
const Page500 = lazy(() => import("./pages/general/error/ServerError"))
const AdminLayout = lazy(() => import("./containers/AdminLayout"))
const Dashboard = lazy(() => import("./pages/admin/Dashboard"))
const Report = lazy(() => import("./pages/admin/Report"))
const Job = lazy(() => import("./pages/admin/Job"))
const User = lazy(() => import("./pages/admin/User"))
const SetupProfile = lazy(
  () => import("./pages/general/first-login/SetupProfile")
)
const SetupKolProfile = lazy(() => import("./pages/kol/setup/SetupKolProfile"))
const AdminProfile = lazy(() => import("./pages/admin/Profile"))
const AdminChangePassword = lazy(() => import("./pages/admin/ChangePassword"))
const NewfeedLayout = lazy(() => import("./containers/NewfeedLayout"))
const Jobs = lazy(() => import("./pages/general/jobs/Job"))
const KOL = lazy(() => import("./pages/general/kols/KOL"))
const KolJobs = lazy(() => import("./pages/kol/Jobs"))
const KolBookmark = lazy(() => import("./pages/kol/Bookmarks"))
const Schedule = lazy(() => import("./pages/kol/Schedule"))
const KolStatistics = lazy(() => import("./pages/kol/Statistics"))
const ErrorNetwork = lazy(() => import("./pages/general/error/NetworkError"))
const KolDetail = lazy(() => import("./pages/general/kols/Detail"))
const JobDetail = lazy(() => import("./pages/general/jobs/Detail"))
const BaseJobs = lazy(() => import("./pages/base/Jobs"))
const Follow = lazy(() => import("./pages/base/Follow"))
const Emoji = lazy(() => import("./pages/general/emojis/Emojis"))
const KolProfile = lazy(() => import("./pages/kol/KolProfile"))
const Invoices = lazy(() => import("./pages/base/Invoices"))
const Payment = lazy(() => import("./pages/base/Payment"))
const PaymentComplete = lazy(() => import("./pages/base/PaymentComplete"))
const InvalidAccount = lazy(() => import("./pages/general/error/NotRole"))
const Empty = lazy(() => import("./components/general/empty/Empty"))
const Bussiness = lazy(() => import("./pages/general/bussiness/Bussiness"))
const BussinessDetail = lazy(() => import("./pages/general/bussiness/Detail"))

const IntergateRedirect = lazy(
  () => import("./pages/general/redirect/IntergrateRedirect")
)

function App() {
  const { state: auth_state, dispatch: auth_dispatch } = useContext(AuthContext)
  const { state: profile_state, dispatch: profile_dispatch } =
    useContext(ProfileContext)
  const { dispatch: toast_dispatch } = useContext(ToastContext)
  const { state: status_state, dispatch: status_dispatch } =
    useContext(StatusLoginContext)
  const cable = ActionCable.createConsumer(`ws://14.225.206.62:3000/cable`)
  const { errorCode } = useContext(ErrorContext)

  useEffect(() => {
    cable.subscriptions.create(
      { channel: "NotificationsChannel", profile_id: Number(profile_state.id) },
      {
        connected: function () {
          console.log("You've subscribed to the  Channel")
        },
        disconnected: function () {
          console.log("You've disconnected from the  Channel")
        },
        received: (message: string) => {
          if (message) {
            generalMessage({
              message: "You have a new message. Please check your inbox",
              toast_dispatch: toast_dispatch,
            })
          }
        },
      }
    )
  }, [])

  useEffect(() => {
    if (auth_state.auth_token !== "null" && auth_state.auth_token !== "") {
      axios
        .get(getProxy(PROFILE_URL), {
          headers: {
            Authorization: auth_state.auth_token,
          },
        })
        .then((res) => {
          const data = res.data.data.attributes

          if (data.status === "invalid") {
            status_dispatch({ type: "INVALID" })
          } else if (data.status === "valid") {
            status_dispatch({ type: "VALID" })
            fetchProfile(data)
          } else if (data.status === "lock") {
            status_dispatch({ type: "LOCK" })
          }
        })
        .catch(() => {
          auth_dispatch({ type: "LOGOUT", payload: null })
          profile_dispatch({ type: "CLEAR", payload: null })
        })
    }
  }, [])

  const fetchProfile = (data: any) => {
    const profileData: ProfileType = {
      fullname: data.fullname,
      avatar:
        data.avatar === "null"
          ? getCDNImage("/image/upload/v1695013387/xqipgdlevshas5fjqtzx.jpg")
          : getProxy(data.avatar),
      role: data.role,
      id: data.id,
    }
    profile_dispatch({ type: "FETCH", payload: profileData })
  }

  return (
    <>
      {errorCode === "" && (
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <NewfeedLayout>
                  <HomePage />
                </NewfeedLayout>
              }
            />
            <Route
              path="/jobs"
              element={
                <NewfeedLayout>
                  <Jobs />
                </NewfeedLayout>
              }
            />
            <Route
              path="/logout"
              element={
                <AuthRoutes>
                  <Logout />
                </AuthRoutes>
              }
            />
            <Route
              path="/kols"
              element={
                <NewfeedLayout>
                  <KOL />
                </NewfeedLayout>
              }
            />
            <Route
              path="/bussiness"
              element={
                <NewfeedLayout>
                  <Bussiness />
                </NewfeedLayout>
              }
            />
            <Route
              path="/kols/:id"
              element={
                <NewfeedLayout>
                  <KolDetail />
                </NewfeedLayout>
              }
            />
            <Route
              path="/jobs/:id"
              element={
                <NewfeedLayout>
                  <JobDetail />
                </NewfeedLayout>
              }
            />

            <Route
              path="/bussiness/:id"
              element={
                <NewfeedLayout>
                  <BussinessDetail />
                </NewfeedLayout>
              }
            />

            <Route
              path="/login"
              element={
                <UnAuthRoutes>
                  <Login />
                </UnAuthRoutes>
              }
            />
            <Route
              path="/forgot-password"
              element={
                <UnAuthRoutes>
                  <ForgotPassword />
                </UnAuthRoutes>
              }
            />
            <Route path="/paymentComplete" element={<PaymentComplete />} />
            <Route
              path="/register"
              element={
                <UnAuthRoutes>
                  <Register />
                </UnAuthRoutes>
              }
            />
            <Route path="/setup" element={<SetupProfile />} />
            <Route
              path="/admin/dashboard"
              element={
                <AdminProtectRoute>
                  <AdminLayout>
                    <Dashboard />
                  </AdminLayout>
                </AdminProtectRoute>
              }
            />
            <Route
              path="/admin/reports"
              element={
                <AdminProtectRoute>
                  <AdminLayout>
                    <Report />
                  </AdminLayout>
                </AdminProtectRoute>
              }
            />
            <Route
              path="/admin/jobs"
              element={
                <AdminProtectRoute>
                  <AdminLayout>
                    <Job />
                  </AdminLayout>
                </AdminProtectRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <AdminProtectRoute>
                  <AdminLayout>
                    <User />
                  </AdminLayout>
                </AdminProtectRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <AuthRoutes>
                  <AdminLayout>
                    <AdminProfile />
                  </AdminLayout>
                </AuthRoutes>
              }
            />

            <Route
              path="/kol/jobs"
              element={
                <KolProtectRoute>
                  <AdminLayout>
                    <KolJobs />
                  </AdminLayout>
                </KolProtectRoute>
              }
            />
            <Route path="/base/payment/:id" element={<Payment />} />
            <Route
              path="/kol/bookmarks"
              element={
                <KolProtectRoute>
                  <AdminLayout>
                    <KolBookmark />
                  </AdminLayout>
                </KolProtectRoute>
              }
            />
            <Route
              path="/kol/schedule"
              element={
                <KolProtectRoute>
                  <AdminLayout>
                    <Schedule />
                  </AdminLayout>
                </KolProtectRoute>
              }
            />
            <Route
              path="/kol/statistics"
              element={
                <KolProtectRoute>
                  <AdminLayout>
                    <KolStatistics />
                  </AdminLayout>
                </KolProtectRoute>
              }
            />

            <Route
              path="/kol/profile"
              element={
                <KolProtectRoute>
                  <AdminLayout>
                    <KolProfile />
                  </AdminLayout>
                </KolProtectRoute>
              }
            />
            <Route
              path="/base/profile"
              element={
                <BaseProtectRoute>
                  <AdminLayout>
                    <BussinessProfile />
                  </AdminLayout>
                </BaseProtectRoute>
              }
            />

            <Route
              path="/base/follow"
              element={
                <BaseProtectRoute>
                  <AdminLayout>
                    <Follow />
                  </AdminLayout>
                </BaseProtectRoute>
              }
            />
            <Route
              path="/base/statistics"
              element={
                <BaseProtectRoute>
                  <AdminLayout>
                    <Statistics />
                  </AdminLayout>
                </BaseProtectRoute>
              }
            />
            <Route
              path="/profile/emojis"
              element={
                <AuthRoutes>
                  <AdminLayout>
                    <Emoji />
                  </AdminLayout>
                </AuthRoutes>
              }
            />
            <Route
              path="/base/invoices"
              element={
                <BaseProtectRoute>
                  <AdminLayout>
                    <Invoices />
                  </AdminLayout>
                </BaseProtectRoute>
              }
            />
            <Route path="/kol/setup" element={<SetupKolProfile />} />
            <Route path="/redirect/roles" element={<RedirectByRole />} />
            <Route path="/server/error" element={<Page500 />} />
            <Route path="/network/error" element={<ErrorNetwork />} />
            <Route path="/invalid" element={<InvalidAccount />} />
            <Route path="/redirect" element={<IntergateRedirect />} />
            <Route
              path="/base/jobs"
              element={
                <BaseProtectRoute>
                  <AdminLayout>
                    <BaseJobs />
                  </AdminLayout>
                </BaseProtectRoute>
              }
            />
            <Route path="*" element={<Page404 />} />
          </Routes>
          <ToastPanel />
        </BrowserRouter>
      )}
      {errorCode === "501" && <ErrorNetwork />}
      {errorCode === "500" && <Page500 />}
      {errorCode === "404" && <Page404 />}
      {errorCode === "401" && <Logout />}
    </>
  )
}

export default App
