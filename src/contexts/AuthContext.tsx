import React, { createContext, useEffect, useReducer, ReactNode } from "react";
import { INITIAL_STATE } from "../global_variable/global_constant";
import { AuthReducer } from "../reducers/AuthReducer";
import { AuthType } from "../global_variable/global_type";

export const AuthContext = createContext<{
  state: AuthType;
  dispatch: React.Dispatch<any>;
}>({
  state: INITIAL_STATE,
  dispatch: () => null,
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("token", JSON.stringify(state.auth_token));
  }, [state.auth_token]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
