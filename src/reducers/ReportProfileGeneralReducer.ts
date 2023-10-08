import { ReportProfileType } from "../global_variable/global_type"

export const ReportProfileGeneralReducer = (
  state: ReportProfileType,
  action: any
) => {
  switch (action.type) {
    case "FETCH": {
      return {
        id_profile: action.payload.id_profile,
        name_profile: action.payload.name_profile,
        id_reporter: action.payload.id_reporter,
      }
    }
    case "CLEAR":
      return {
        id_profile: "",
        name_profile: "",
        id_reporter: "",
      }
    default: {
      return state
    }
  }
}
