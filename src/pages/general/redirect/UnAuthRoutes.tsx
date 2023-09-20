import { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const UnAuthRoutes = ({ children }: { children: React.ReactNode }) => {
  const { state: auth_state } = useContext(AuthContext);

  if (auth_state.auth_token !== "null" && auth_state.auth_token !== null && auth_state.auth_token !== "") {
    return <Navigate to="/redirect/roles" />;
  }
  return <>{children}</>;
};
export default UnAuthRoutes;
