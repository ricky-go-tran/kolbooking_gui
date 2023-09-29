import { ReportJobType } from "../utils/global_type";

export const ReportJobGeneralReducer = (state: ReportJobType, action: any) => {
  switch (action.type) {
    case "FETCH": {
      return {
        id_job: action.payload.id,
        title: action.payload.fullname,
        description: action.payload.avatar,
        id_reporter: action.payload.role,
      };
    }
    case "CLEAR":
      return {
        id_job: "",
        title: "",
        description: "",
        id_reporter: "",
      };
    default: {
      return state;
    }
  }
};
