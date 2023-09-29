import axios from "axios";
import AuthenticationUtil from "../../../utils/AuthenticationUtil";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

import ImageLight from "../../../assets/images/login-office.jpeg";
import ImageDark from "../../../assets/images/login-office-dark.jpeg";
import { GithubIcon } from "../../../icons";
import { Alert, Label, Input, Button } from "@windmill/react-ui";
import { getProxy, getCDNImage } from "../../../utils/PathUtil";
import { ProfileContext } from "../../../contexts/ProfileContext";
import { ProfileType } from "../../../global_variable/global_type";
import {
  CredentialResponse,
  GoogleLogin,
  useGoogleLogin,
} from "@react-oauth/google";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState({
    success: "",
    message: "",
  });

  const { state, dispatch } = useContext(AuthContext);
  const { dispatch: profile_dispatch } = useContext(ProfileContext);
  const navigate = useNavigate();

  const handleLoginGoogle = (responseGoogle: CredentialResponse) => {
    console.log(responseGoogle);
    axios
      .post(getProxy("/auth/google_oauth2/callback"), responseGoogle)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const clickGoogleLogin = useGoogleLogin({
    onSuccess: (response) => {
      console.log(response);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      if (AuthenticationUtil.emailFormat(credentials.email)) {
        const data = {
          user: {
            email: credentials.email,
            password: credentials.password,
          },
        };
        axios.post(getProxy("/login"), data).then((res) => {
          let response = {
            token: res.headers.authorization,
            profile: res.data.status.data.user,
          };
          dispatch({ type: "LOGIN_SUCCESS", payload: response });
          axios
            .get(getProxy("/api/v1/profiles"), {
              headers: {
                Authorization: response.token,
              },
            })
            .then((res) => {
              let data = res.data.data.attributes;
              let profileData: ProfileType = {
                id: data.id,
                fullname: data.fullname,
                avatar:
                  data.avatar === "null"
                    ? getCDNImage(
                        "/image/upload/v1695013387/xqipgdlevshas5fjqtzx.jpg"
                      )
                    : getProxy(data.avatar),
                role: data.role,
              };
              profile_dispatch({ type: "FETCH", payload: profileData });

              navigate("/redirect/roles");
            })
            .catch((err) => {
              dispatch({ type: "LOGOUT", payload: null });
              profile_dispatch({ type: "CLEAR", payload: null });
            });
        });
      } else {
        setMessage({
          success: "Fail",
          message: "Invalid email format! Login fail",
        });
      }
    } catch (error: any) {
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
      setMessage({
        success: "Fail",
        message: "Interval server error! Login fail",
      });
    }
  };

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
                disabled={state.loading}
              >
                Log in
              </Button>

              <hr className="my-8" />

              <GoogleLogin
                onSuccess={handleLoginGoogle}
                theme="filled_blue"
                shape="circle"
                onError={() => {
                  console.log("Login Failed");
                }}
              />

              {/* <Button block layout="outline" disabled={state.loading} onClick={clickGoogleLogin}>
                <GithubIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                Google
              </Button> */}

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
  );
};

export default Login;
