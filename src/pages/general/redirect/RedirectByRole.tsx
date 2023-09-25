import { useContext } from "react";
import { ProfileContext } from "../../../contexts/ProfileContext";
import { Navigate } from 'react-router-dom'

const RedirectByRole = () => {
  const { state: profile_state } = useContext(ProfileContext);

  console.log(profile_state)
  if (profile_state.role === "admin") {
    return <Navigate to="/admin/dashboard" />
  } else if (profile_state.role === "kol") {
    return <Navigate to="/kol/statistics" />
  } else if (profile_state.role === "base") {
    return <Navigate to="/" />
  }
  return <Navigate to="/" />

}

export default RedirectByRole;
