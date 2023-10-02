/*Basic*/
export const LOGIN_URL = "/login";
export const REGISTER_URL = "/signup";
export const PROFILE_URL = "/api/v1/profiles";
export const LOGOUT_URL = "/logout";

/*Kol*/

export const KOL_STATISTICALS_URL = "/api/v1/kol/statistical";
export const KOL_JOB_DETAIL_URL = (job_id: string | number) => {
  return "/api/v1/kol/jobs/" + job_id;
};

/*Admin Job*/

export const ADMIN_JOB_DETAIL_URL = (job_id: string | number) => {
  return "/api/v1/admin/jobs/" + job_id;
};

/*Industry*/

export const INDUSTRY_URL = "/api/v1/industries";
