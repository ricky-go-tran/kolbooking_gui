import React, { ReactNode, useContext, useEffect, useState } from "react"
import { ProfileContext } from "../../contexts/ProfileContext"
import { StatusLoginContext } from "../../contexts/StatusLoginContext"
import { Navigate } from "react-router-dom"
import { ProfileType, StatusLoginType } from "../../global_variable/global_type"
const KolProtectRoute = ({ children }: { children: React.ReactNode }) => {
  const { state: profile_state } = useContext(ProfileContext)
  const { state: status_state } = useContext(StatusLoginContext)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (profile_state && status_state) {
      setIsLoading(false)
    }
  }, [profile_state, status_state])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (status_state.status === "invalid") {
    return <Navigate to="/setup" replace />
  } else if (status_state.status === "lock") {
    return <Navigate to="/invalid" replace />
  } else if (status_state.status === "valid" && profile_state.role === "kol") {
    return <>{children}</>
  } else if (status_state.status === "valid" && profile_state.role !== "kol") {
    return <Navigate to="/" replace />
  } else {
    return <Navigate to="/login" replace />
  }
}
export default KolProtectRoute
