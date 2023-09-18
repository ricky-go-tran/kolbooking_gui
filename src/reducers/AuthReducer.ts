import { useReducer } from "react";
import { AuthType } from "../utils/global_type";
import { INITIAL_STATE } from "../utils/global_constant";
import { TokenStorage, ProfileStorage } from "../utils/LocalStorageUtil";

export const AuthReducer = (state: AuthType, action: any) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        auth_token: "",
        message: "",
        loading: true
      }
    case "LOGIN_SUCCESS":
      return {
        auth_token: action.payload.token,
        message: "Login successly",
        loading: false
      }
    case "LOGIN_FAIL":
      return {
        auth_token: "",
        message: action.payload.error,
        loading: false
      }
    case "PROFILE_CHANGE":
      return {
        ...state,
        loading: false
      }
    case "LOGOUT":
      return {
        auth_token: "",
        message: "",
        loading: false
      }
    default:
      return {
        auth_token: TokenStorage(),
        message: "",
        loading: false
      }
  }
}
