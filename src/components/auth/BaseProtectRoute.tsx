import React, { useContext } from "react"
import { ProfileContext } from "../../contexts/ProfileContext"
import { StatusLoginContext } from "../../contexts/StatusLoginContext"
import { Navigate } from "react-router-dom"
const BaseProtectRoute = ({ children }: { children: React.ReactNode }) => {
  const { state: profile_state } = useContext(ProfileContext)
  const { state: status_state } = useContext(StatusLoginContext)

  if (status_state.status === "invalid") {
    return <Navigate to="/setup" replace />
  } else if (status_state.status === "lock") {
    return <Navigate to="/invalid" replace />
  } else if (status_state.status === "valid" && profile_state.role === "base") {
    return <>{children}</>
  } else if (status_state.status === "valid" && profile_state.role !== "base") {
    return <Navigate to="/" replace />
  }
  return <Navigate to="/login" replace />
}
export default BaseProtectRoute
