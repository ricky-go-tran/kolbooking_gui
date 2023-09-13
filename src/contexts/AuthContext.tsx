import React, { createContext, useEffect, useReducer, ReactNode } from "react";
import { INITIAL_STATE } from "../utils/global_constant";
import { AuthReducer } from "../reducers/AuthReducer";
import { AuthType } from "../utils/global_type";


export const AuthContext = createContext<{
  state: AuthType;
  dispatch: React.Dispatch<any>;
}>({
  state: INITIAL_STATE,
  dispatch: () => null
});


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
      value={{ state, dispatch }} >
      {children}
    </AuthContext.Provider>
  );
};