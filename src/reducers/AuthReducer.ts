import { useReducer } from "react";
import { AuthType } from "../utils/global_type";
import { INITIAL_STATE } from "../utils/global_constant";
import { TokenStorage, ProfileStorage } from "../utils/LocalStorageUtil";

export const AuthReducer = (state: AuthType, action: any) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        auth_token: "",
        profile: {},
        message: "",
        loading: true
      }
    case "LOGIN_SUCCESS":
      return {
        auth_token: action.payload.token,
        profile: action.payload.profile,
        message: "Login successly",
        loading: false
      }
    case "LOGIN_FAIL":
      return {
        auth_token: "",
        profile: {},
        message: action.payload.error,
        loading: false
      }
    case "PROFILE_CHANGE":
      return {
        ...state,
        profile: action.payload.profile,
        loading: false
      }
    case "LOGOUT":
      return {
        auth_token: "",
        profile: {},
        message: "",
        loading: false
      }
    default:
      return {
        auth_token: TokenStorage,
        profile: ProfileStorage,
        message: "",
        loading: false
      }
  }
}
