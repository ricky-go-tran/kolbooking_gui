import { StatusLoginType } from "../global_variable/global_type"
import { StatusStorage } from "../utils/LocalStorageUtil"

export const StatusLoginReducer = (state: StatusLoginType, action: any) => {
  switch (action.type) {
    case "INVALID":
      return {
        status: "invalid",
      }
    case "VALID":
      console.log("done")
      return {
        status: "valid",
      }
    case "LOCKED":
      return {
        status: "lock",
      }
    case "CLEAR":
      return {
        status: "",
      }
    default:
      return StatusStorage()
  }
}
