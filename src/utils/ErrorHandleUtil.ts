import { ActionToastReducerType } from "../global_variable/global_type_action_reducer"
import { generalError } from "./ToastUtil"

function HandleResponseError(
  error: any,
  setErrorCode: React.Dispatch<any>,
  toast_dispatch: React.Dispatch<ActionToastReducerType>
) {
  const error_status = error?.response?.status
  if (error_status === null || error_status === undefined) {
    setErrorCode("501")
  } else if (error_status === 500) {
    setErrorCode("500")
  } else if (error_status === 401) {
    setErrorCode("401")
  } else if (error_status === 422) {
    const data = error.response.data.errors
    if (Array.isArray(data)) {
      data.forEach((item) => {
        generalError({ message: item, toast_dispatch: toast_dispatch })
      })
    } else if (typeof data === "string") {
      generalError({ message: data, toast_dispatch: toast_dispatch })
    }
  }
}

export { HandleResponseError }
