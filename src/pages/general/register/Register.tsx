import axios from "axios";
import { Link } from "react-router-dom";
import { useState } from "react";
import AuthenticationUtil from "../../../utils/AuthenticationUtil";

import ImageLight from "../../../assets/images/create-account-office.jpeg";
import ImageDark from "../../../assets/images/create-account-office-dark.jpeg";
import { GithubIcon, TwitterIcon } from "../../../icons";
import { Alert, Input, Label, Button } from "@windmill/react-ui";
import { getProxy } from "../../../utils/PathUtil";


function Register() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    repassword: ""
  });

  const [message, setMessage] = useState({
    success: "",
    message: ""
  });

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      if (AuthenticationUtil.confirmPassword(credentials.password, credentials.repassword)) {
        const data = {
          user: {
            email: credentials.email,
            password: credentials.password
          }
        }
        axios.post(getProxy("/signup"), data).then((response) => { setMessage({ success: "success", message: "Signup successly" }) });

      } else {
        setMessage({ success: "fail", message: "Invalid password or re-password" })
      }
    } catch (error: any) {
      setMessage({ success: "fail", message: "Interval sever error! Can't signup" })
    }
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
                Register
              </h1>
              {message.success == "success" && <Alert type="success">{message.message}</Alert>}
              {message.success == "fail" && <Alert type="danger">{message.message}</Alert>}
              <Label>
                <span>Email</span>
                <Input crossOrigin="" css="" className="mt-1" type="email" placeholder="your@email.com"
                  onChange={(event) => setCredentials({ ...credentials, email: event.target.value })} value={credentials.email} />
              </Label>
              <Label className="mt-4">
                <span>Password</span>
                <Input crossOrigin="" css="" className="mt-1" placeholder="***************" type="password"
                  onChange={(event) => setCredentials({ ...credentials, password: event.target.value })} value={credentials.password} />
              </Label>
              <Label className="mt-4">
                <span>Confirm password</span>
                <Input crossOrigin="" css="" className="mt-1" placeholder="***************" type="password"
                  onChange={(event) => setCredentials({ ...credentials, repassword: event.target.value })} value={credentials.repassword} />
              </Label>

              <Label className="mt-6" check>
                <Input crossOrigin="" css="" type="checkbox" />
                <span className="ml-2">
                  I agree to the <span className="underline">privacy policy</span>
                </span>
              </Label>

              <Button block className="mt-4" onClick={handleRegister}>
                Create account
              </Button>

              <hr className="my-8" />

              <Button block layout="outline">
                <GithubIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                Google
              </Button>

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline"
                  to="/login"
                >
                  Already have an account? Login
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Register
