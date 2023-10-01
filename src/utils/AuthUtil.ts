import { AuthType } from "../global_variable/global_type";

export const isAuth = (auth_state: AuthType): boolean => {
  return (
    auth_state.auth_token !== "" &&
    auth_state.auth_token !== null &&
    auth_state.auth_token !== "null"
  );
};
