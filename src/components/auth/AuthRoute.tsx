import { useContext } from "react"

import { Navigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"

const AuthRoutes = ({ children }: { children: React.ReactNode }) => {
  const { state: auth_state } = useContext(AuthContext)

  if (
    auth_state.auth_token !== "null" &&
    auth_state.auth_token !== null &&
    auth_state.auth_token !== ""
  ) {
    return <>{children}</>
  }
  return <Navigate to="/login" replace />
}
export default AuthRoutes
