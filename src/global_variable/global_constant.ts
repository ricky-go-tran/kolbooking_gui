import {
  TokenStorage,
  ProfileStorage,
  StatusStorage,
} from "../utils/LocalStorageUtil"
import {
  AuthType,
  ProfileType,
  ReportJobType,
  ReportProfileType,
  StatusLoginType,
} from "./global_type"

export const MIN_PASSWORD_LENGTH = 6
export const MAX_PASSWORD_LENGTH = 64
export const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
export const PROXY_SERVER = "http://localhost:3000"
export const CDN_SERVER = "https://res.cloudinary.com/daipfonbx"
export const DEFAULT_IMAGE =
  "/image/upload/v1695613812/mowxzej1idnfvuwuket3.jpg"
export const DEFAULT_AVATAR =
  "/image/upload/v1695013387/xqipgdlevshas5fjqtzx.jpg"
export const DEFAULT_VIDEO =
  "/video/upload/v1698028006/ojf5jlvffa7d6q7glwb1.mp4"

export const INITIAL_STATE: AuthType = {
  auth_token: TokenStorage(),
  message: "",
  loading: false,
}
export const INITIAL_STATUS_LOGIN_STATE: StatusLoginType = StatusStorage()
export const PROFILE_INIT_STATE: ProfileType = ProfileStorage()
export const REPORT_JOB_INIT_STATE: ReportJobType = {
  id_job: "",
  title_job: "",
  name_onwer: "",
  id_reporter: "",
}

export const REPORT_PROFILE_INIT_STATE: ReportProfileType = {
  id_profile: "",
  name_profile: "",
  id_reporter: "",
}
export const APP_URL = "http://localhost:3000"
export const FE_URL = "http://tdphatdev.xyz"
export const APP_CABLE_URL = "ws://14.225.206.62:3000/cable"
