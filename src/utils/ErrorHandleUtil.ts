import { useContext } from "react"
import { NavigateFunction } from "react-router-dom"
import { AuthContext } from "../contexts/AuthContext"
import { getProxy } from "./PathUtil"
import { LOGOUT_URL } from "../global_variable/global_uri_backend"
import axios from "axios"
import { ProfileContext } from "../contexts/ProfileContext"
import { ErrorContext } from "../contexts/ErrorContext"
import { AuthType } from "../global_variable/global_type"
import { ActionToastReducerType } from "../global_variable/global_type_action_reducer"
import { generalError, generalMessage } from "./ToastUtil"
import { type } from "os"

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
    console.log(error)
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
