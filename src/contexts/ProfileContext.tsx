import React, { createContext, useEffect, useReducer, ReactNode } from "react";
import { ProfileType } from "../utils/global_type";
import { PROFILE_INIT_STATE } from "../utils/global_constant";
import { ProfileReducer } from "../reducers/ProfileReducer";

export const ProfileContext = createContext<{
  state: ProfileType;
  dispatch: React.Dispatch<any>;
}>({
  state: PROFILE_INIT_STATE,
  dispatch: () => null
});

export const ProfileContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(ProfileReducer, PROFILE_INIT_STATE);

  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(state));
  }, [state]);

  return (
    <ProfileContext.Provider
      value={{ state, dispatch }} >
      {children}
    </ProfileContext.Provider>
  );
};

