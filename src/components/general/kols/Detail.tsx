import axios from "axios"
import { useState, useEffect, useContext } from "react"
import { getProxy } from "../../../utils/PathUtil"
import { useParams } from "react-router-dom"
import { ErrorContext } from "../../../contexts/ErrorContext"
import { ToastContext } from "../../../contexts/ToastContext"
import { HandleResponseError } from "../../../utils/ErrorHandleUtil"

const Detail = () => {
  const params = useParams()
  const { state: toast_state, dispatch: toast_dispatch } =
    useContext(ToastContext)
  const { setErrorCode } = useContext(ErrorContext)

  useEffect(() => {
    axios
      .get(getProxy("/api/v1/kols/" + params.id))
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        HandleResponseError(error, setErrorCode, toast_dispatch)
      })
  })

  return <div className="min-h-screen w-screen bg-gray-300"></div>
}

export default Detail
