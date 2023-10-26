import { useContext, useEffect, useState } from "react"
import { ErrorRedirectIcon, SuccessRedirectIcon } from "../../../icons"
import { Loading } from "../../../components/general/loading/Loading"
import axios from "axios"
import { getFEHost, getProxy } from "../../../utils/PathUtil"
import { AuthContext } from "../../../contexts/AuthContext"

const IntergrateRedirect = () => {
  const [loading, setLoading] = useState<"load" | "success" | "error">("load")
  const search = window.location.search
  const params = new URLSearchParams(search)
  const { state: auth_state } = useContext(AuthContext)

  useEffect(() => {
    if (loading === "load") {
      axios
        .post(
          getProxy("/google_integrates"),
          {
            google_auth: {
              code: params.get("code"),
              scope: params.get("scope"),
              authuser: params.get("authuser"),
              prompt: params.get("prompt"),
            },
          },
          {
            headers: {
              Authorization: auth_state.auth_token,
            },
          }
        )
        .then(() => {
          setLoading("success")
        })
        .catch((err) => {
          setLoading("error")
          console.log(err)
        })
    }
  }, [])
  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <div className="flex flex-col items-center space-y-2">
          {loading === "load" && <Loading />}
          {loading === "error" && (
            <>
              <ErrorRedirectIcon />
              <h1 className="text-4xl font-bold">
                Error connect to google account!
              </h1>
            </>
          )}
          {loading === "success" && (
            <>
              <SuccessRedirectIcon />
              <h1 className="text-4xl font-bold">
                Success! Connection to google account
              </h1>
            </>
          )}

          {loading !== "load" && (
            <>
              <p>
                Thank you for your interest! Click below button to redirect
                homepage
              </p>
              <a
                href={getFEHost("/")}
                className="inline-flex items-center px-4 py-2 text-white bg-indigo-600 border border-indigo-600 rounded-full hover:bg-indigo-700 focus:outline-none focus:ring"
              >
                <span className="text-sm font-medium">Home</span>
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
export default IntergrateRedirect
