import { createContext, useEffect, useReducer, ReactNode } from "react";
import { INITIAL_STATE } from "../utils/global_constant";
import { AuthReducer } from "../reducers/AuthReducer";


export const AuthContext: any = createContext(INITIAL_STATE);


export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(state.auth_token));
  }, [state.auth_token]);

  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(state.profile));
  }, [state.profile]);

  return (
    <AuthContext.Provider
      value={{
        auth_token: state.auth_token,
        profile: state.profile,
        message: state.message,
        dispatch
      }} >
      {children}
    </AuthContext.Provider>
  );
};
