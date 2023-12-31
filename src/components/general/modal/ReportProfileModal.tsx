import { useState } from "react"
import { WarningIcon } from "../../../icons"
import { Label, Input, Textarea } from "@windmill/react-ui"
import { ReportType } from "../../../global_variable/global_type"
import { useContext } from "react"
import axios from "axios"
import { getProxy } from "../../../utils/PathUtil"
import { AuthContext } from "../../../contexts/AuthContext"
import { ReportProfileGeneralContext } from "../../../contexts/ReportProfileGeneralContext"
import { ToastContext } from "../../../contexts/ToastContext"
import { generalMessage, generalWarning } from "../../../utils/ToastUtil"
import { ErrorContext } from "../../../contexts/ErrorContext"
import { HandleResponseError } from "../../../utils/ErrorHandleUtil"
import { checkValid } from "../../../validates/general/ReportValidate"

const ReportProfileModal = () => {
  const { state: report_profile_state, dispatch: report_profile_dispatch } =
    useContext(ReportProfileGeneralContext)
  const { state: auth_state } = useContext(AuthContext)
  const { dispatch: toast_dispatch } = useContext(ToastContext)
  const { setErrorCode } = useContext(ErrorContext)

  const [reported, setReported] = useState<ReportType>({
    title: "",
    description: "",
    reportable_type: "Profile",
    reportable_id: report_profile_state.id_profile,
    profile_id: report_profile_state.id_reporter,
  })

  const submitReport = () => {
    const data = {
      report: {
        ...reported,
      },
    }
    const config = {
      headers: {
        Authorization: auth_state.auth_token,
      },
    }
    axios
      .post(getProxy("/api/v1/reports"), data, config)
      .then(() => {
        generalMessage({
          message: "Success report",
          toast_dispatch: toast_dispatch,
        })
        report_profile_dispatch({ type: "CLEAR" })
      })
      .catch((error) => {
        HandleResponseError(error, setErrorCode, toast_dispatch)
      })
  }
  const createSubmit = () => {
    const valid = checkValid({
      report: reported,
    })
    if (valid.status === true) {
      submitReport()
    } else {
      generalWarning({
        message: valid.message,
        toast_dispatch: toast_dispatch,
      })
    }
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-11/12 lg:w-1/2 my-3 mx-auto max-w-7xl h-5/6">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col h-full w-full bg-white outline-none focus:outline-none dark:bg-gray-600">
            {/*header*/}
            <div className="flex items-center justify-start px-5 py-2 border-b border-solid border-slate-200 rounded-t">
              <span className="w-5 h-5 text-orange-400">
                <WarningIcon />
              </span>
              <h3 className="text-lg font-semibold ml-3">Report</h3>
            </div>
            {/*body*/}
            <div className="relative p-3 flex-auto  h-10/12 overflow-y-scroll">
              <div className="mx-5 my-2 flex flex-col items-center justify-center text-base font-medium">
                <div className="flex flex-col justify-center items-center">
                  <div className="p-4 rounded-full bg-orange-100">
                    <svg className="w-10 h-10 text-orange-300 ">
                      <WarningIcon />
                    </svg>
                  </div>
                  <h6 className="font-semibold text-base mt-2">
                    Report This Job
                  </h6>
                  <p className="text-sm text-gray-500">
                    Are you sure you will denounce the kol name '
                    {report_profile_state.name_profile}'?
                  </p>
                </div>
                <div className="w-9/12">
                  <Label className="mt-4">
                    <span>Title</span>
                    <Input
                      crossOrigin=""
                      css=""
                      className="mt-1"
                      type="text"
                      placeholder="Title Report"
                      required
                      onChange={(event) =>
                        setReported({
                          ...reported,
                          title: event.target.value,
                        })
                      }
                      value={reported.title}
                    />
                  </Label>
                  <Label className="mt-4">
                    <span>Description</span>
                    <Textarea
                      css=""
                      className="mt-1"
                      rows={3}
                      placeholder="Enter some description..."
                      style={{ resize: "none" }}
                      onChange={(event) =>
                        setReported({
                          ...reported,
                          description: event.target.value,
                        })
                      }
                      value={reported.description}
                    />
                  </Label>
                </div>
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-4 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  report_profile_dispatch({ type: "CLEAR" })
                }}
              >
                Close
              </button>
              <button
                className="bg-green-400 text-white hover:bg-green-500 active:bg-green-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  createSubmit()
                }}
              >
                Report
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black bg-opacity-60 backdrop-blur-sm"></div>
    </>
  )
}

export default ReportProfileModal
