import axios from "axios"
import AuthenticationUtil from "../../../utils/AuthenticationUtil"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import React, { useState, useContext } from "react"
import { AuthContext } from "../../../contexts/AuthContext"

import ImageLight from "../../../assets/images/login-office.jpeg"
import ImageDark from "../../../assets/images/login-office-dark.jpeg"
import { Alert, Label, Input, Button } from "@windmill/react-ui"
import { getProxy, getCDNImage, getProxyPath } from "../../../utils/PathUtil"
import { ProfileContext } from "../../../contexts/ProfileContext"
import { ProfileType } from "../../../global_variable/global_type"
import {
  LOGIN_URL,
  PROFILE_URL,
} from "../../../global_variable/global_uri_backend"
import { StatusLoginContext } from "../../../contexts/StatusLoginContext"
import { ErrorContext } from "../../../contexts/ErrorContext"
import { ToastContext } from "../../../contexts/ToastContext"
import { generalError } from "../../../utils/ToastUtil"

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  })

  const [message, setMessage] = useState({
    success: "",
    message: "",
  })

  const { dispatch } = useContext(AuthContext)
  const { dispatch: status_login_dispatch } = useContext(StatusLoginContext)
  const { dispatch: profile_dispatch } = useContext(ProfileContext)
  const { setErrorCode } = useContext(ErrorContext)
  const { dispatch: toast_dispatch } = useContext(ToastContext)

  const navigate = useNavigate()

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch({ type: "LOGIN_START" })

    try {
      if (
        AuthenticationUtil.emailFormat(credentials.email) &&
        credentials.password.length >= 6
      ) {
        const data = {
          user: {
            email: credentials.email,
            password: credentials.password,
          },
        }
        axios
          .post(getProxyPath(LOGIN_URL), data)
          .then((res) => {
            const response = {
              token: res.headers.authorization,
              profile: res.data.status.data.user,
            }

            dispatch({ type: "LOGIN_SUCCESS", payload: response })
            if (response.profile.status === "invalid") {
              status_login_dispatch({ type: "INVALID" })
              navigate("/setup")
            } else if (response.profile.status === "valid") {
              status_login_dispatch({ type: "VALID" })
              fetchProfile(response)
            } else if (response.profile.status === "lock") {
              status_login_dispatch({ type: "LOCK" })
            }
          })
          .catch((error) => {
            const error_status = error?.response?.status
            console.log(error_status)
            if (error_status === null || error_status === undefined) {
              setErrorCode("501")
            } else if (error_status === 500) {
              setErrorCode("500")
            } else if (error_status === 401) {
              generalError({
                message: error.response.data,
                toast_dispatch: toast_dispatch,
              })
            }
          })
      } else {
        setMessage({
          success: "Fail",
          message: "Invalid email format! Login fail",
        })
      }
    } catch (error: any) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data })
      setMessage({
        success: "Fail",
        message: "Interval server error! Login fail",
      })
    }
  }

  const fetchProfile = (response: { token: string; profile: any }) => {
    axios
      .get(getProxy(PROFILE_URL), {
        headers: {
          Authorization: response.token,
        },
      })
      .then((res) => {
        const data = res.data.data.attributes
        const profileData: ProfileType = {
          id: data.id,
          fullname: data.fullname,
          avatar:
            data.avatar === "null"
              ? getCDNImage(
                  "/image/upload/v1695013387/xqipgdlevshas5fjqtzx.jpg"
                )
              : getProxy(data.avatar),
          role: data.role,
        }
        profile_dispatch({ type: "FETCH", payload: profileData })

        navigate("/")
      })
      .catch(() => {
        dispatch({ type: "LOGOUT", payload: null })
        profile_dispatch({ type: "CLEAR", payload: null })
      })
  }

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Login
              </h1>
              {message.success === "Fail" && (
                <Alert type="danger">{message.message}</Alert>
              )}
              <Label>
                <span>Email</span>
                <Input
                  crossOrigin=""
                  css=""
                  className="mt-1"
                  type="email"
                  placeholder="your@email.com"
                  required
                  onChange={(event) =>
                    setCredentials({
                      ...credentials,
                      email: event.target.value,
                    })
                  }
                  value={credentials.email}
                />
              </Label>

              <Label className="mt-4">
                <span>Password</span>
                <Input
                  crossOrigin=""
                  css=""
                  className="mt-1"
                  type="password"
                  placeholder="***************"
                  required
                  onChange={(event) =>
                    setCredentials({
                      ...credentials,
                      password: event.target.value,
                    })
                  }
                  value={credentials.password}
                />
              </Label>

              <Button
                className="mt-4"
                block
                tag={"button"}
                onClick={handleLogin}
              >
                Log in
              </Button>

              <hr className="my-8" />

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/forgot-password"
                >
                  Forgot your password?
                </Link>
              </p>
              <p className="mt-1">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/register"
                >
                  Create account
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Login
