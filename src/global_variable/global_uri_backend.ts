/*Basic*/
export const LOGIN_URL = "/login"
export const REGISTER_URL = "/signup"
export const PROFILE_URL = "/api/v1/profiles"
export const LOGOUT_URL = "/logout"
export const KOL_PROFILE_URL = "/api/v1/kol/kol_profiles"
export const KOL_PROFILE_EDIT_URL = "/api/v1/kol/kol_profiles/edit_kol_profile"

/*Kol*/

export const KOL_STATISTICALS_URL = "/api/v1/kol/statistical"
export const KOL_JOB_DETAIL_URL = (job_id: string | number) => {
  return "/api/v1/kol/jobs/" + job_id
}

/*Admin Job*/

export const ADMIN_JOB_DETAIL_URL = (job_id: string | number) => {
  return "/api/v1/admin/jobs/" + job_id
}

/*Base Job*/

export const BASE_JOB_DETAIL_URL = (job_id: string | number) => {
  return "/api/v1/base/jobs/" + job_id
}

/*Industry*/

export const INDUSTRY_URL = "/api/v1/industries"
