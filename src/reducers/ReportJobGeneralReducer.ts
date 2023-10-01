import { ReportJobType } from "../global_variable/global_type";

export const ReportJobGeneralReducer = (state: ReportJobType, action: any) => {
  switch (action.type) {
    case "FETCH": {
      return {
        id_job: action.payload.id_job,
        title_job: action.payload.title_job,
        name_onwer: action.payload.name_onwer,
        id_reporter: action.payload.id_reporter,
      };
    }
    case "CLEAR":
      return {
        id_job: "",
        title_job: "",
        name_onwer: "",
        id_reporter: "",
      };
    default: {
      return state;
    }
  }
};
