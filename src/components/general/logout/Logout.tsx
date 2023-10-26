import { useContext, useEffect, useState } from "react"
import { Loading } from "../loading/Loading"
import { AuthContext } from "../../../contexts/AuthContext"
import { ProfileContext } from "../../../contexts/ProfileContext"
import axios from "axios"
import { getProxy } from "../../../utils/PathUtil"
import { LOGOUT_URL } from "../../../global_variable/global_uri_backend"
import { StatusLoginContext } from "../../../contexts/StatusLoginContext"
import { ErrorContext } from "../../../contexts/ErrorContext"

const Logout = () => {
  const { state: auth_state, dispatch: auth_dispatch } = useContext(AuthContext)
  const { dispatch: profile_dispatch } = useContext(ProfileContext)
  const { dispatch: status_dispatch } = useContext(StatusLoginContext)
  const { setErrorCode } = useContext(ErrorContext)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    axios
      .delete(getProxy(LOGOUT_URL), {
        headers: {
          Authorization: auth_state.auth_token,
        },
      })
      .then(() => {
        auth_dispatch({
          type: "LOGOUT",
        })
        setErrorCode("")
        profile_dispatch({ type: "CLEAR" })
        status_dispatch({ type: "CLEAR" })
        setLoading(true)
      })
      .catch(() => {
        auth_dispatch({
          type: "LOGOUT",
        })
        setErrorCode("")
        status_dispatch({ type: "CLEAR" })
        profile_dispatch({ type: "CLEAR" })
        setLoading(true)
      })
  }, [])

  useEffect(() => {
    if (loading === true) {
      window.location.href = "/login"
    }
  }, [loading])

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h6 className="text-sm font-semibold">Logout</h6>
      <Loading />
    </div>
  )
}
export default Logout
