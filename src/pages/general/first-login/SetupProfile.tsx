import axios from "axios"
import { Link, Navigate } from "react-router-dom"
import { useContext, useState } from "react"
import AuthenticationUtil from "../../../utils/AuthenticationUtil"

import ImageLight from "../../../assets/images/setup-account.jpeg"
import ImageDark from "../../../assets/images/create-account-office-dark.jpeg"
import { GithubIcon, TwitterIcon } from "../../../icons"
import { Alert, Input, Label, Button, Textarea } from "@windmill/react-ui"
import { getProxy } from "../../../utils/PathUtil"
import BaseSetupProfile from "./BaseSetupProfile"
import KolSetupProfile from "./KolSetupProfile"
import { StatusLoginContext } from "../../../contexts/StatusLoginContext"

const SetupProfile = () => {
  const { state: status_login_state } = useContext(StatusLoginContext)
  const [tab, setTab] = useState("base")

  return (
    <>
      {status_login_state.status !== "invalid" && <Navigate to="/" replace />}
      {status_login_state.status === "invalid" && (
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
              <main className="flex items-center justify-center p-6 sm:p-9 md:w-1/2">
                <div className="w-full">
                  <div className="w-full flex justify-between py-1 mb-5">
                    <ul className="w-full max-w-2xl grid grid-flow-col text-center text-gray-500 bg-gray-100 rounded-lg p-1 text-xs">
                      <li>
                        <div
                          className={`flex justify-center py-2 cursor-pointer ${
                            tab === "base"
                              ? "bg-white rounded-lg shadow text-indigo-900"
                              : ""
                          }`}
                          onClick={() => setTab("base")}
                        >
                          Base User
                        </div>
                      </li>
                      <li>
                        <div
                          className={`flex justify-center py-2 cursor-pointer ${
                            tab === "kol"
                              ? "bg-white rounded-lg shadow text-indigo-900"
                              : ""
                          }`}
                          onClick={() => setTab("kol")}
                        >
                          Kol
                        </div>
                      </li>
                    </ul>
                  </div>
                  {tab == "base" && <BaseSetupProfile />}
                  {tab == "kol" && <KolSetupProfile />}
                </div>
              </main>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SetupProfile
