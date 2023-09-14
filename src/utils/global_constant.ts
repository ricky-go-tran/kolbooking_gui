import { TokenStorage, ProfileStorage } from "../utils/LocalStorageUtil";
import { AuthType } from "../utils/global_type";

export const MIN_PASSWORD_LENGTH = 6
export const MAX_PASSWORD_LENGTH = 64
export const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
export const PROXY_SERVER = "http://localhost:3000"

export const INITIAL_STATE: AuthType = {
  auth_token: TokenStorage,
  profile: ProfileStorage,
  message: "",
  loading: false
}
