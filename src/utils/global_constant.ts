import { TokenStorage, ProfileStorage } from "../utils/LocalStorageUtil";
import { AuthType, ProfileType, ReportJobType } from "../utils/global_type";

export const MIN_PASSWORD_LENGTH = 6;
export const MAX_PASSWORD_LENGTH = 64;
export const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const PROXY_SERVER = "http://localhost:3000";
export const CDN_SERVER = "https://res.cloudinary.com/daipfonbx";
export const DEFAULT_IMAGE =
  "/image/upload/v1695613812/mowxzej1idnfvuwuket3.jpg";
export const DEFAULT_AVATAR =
  "/image/upload/v1695013387/xqipgdlevshas5fjqtzx.jpg";

export const INITIAL_STATE: AuthType = {
  auth_token: TokenStorage(),
  message: "",
  loading: false,
};
export const PROFILE_INIT_STATE: ProfileType = ProfileStorage();
export const REPORT_JOB_INIT_STATE: ReportJobType = {
  id_job: "",
  title: "",
  description: "",
  id_reporter: "",
};

// export const PROFILE_INIT_STATE: ProfileType = {
//   fullname: "",
//   avatar: "",
//   role: ""
// }
