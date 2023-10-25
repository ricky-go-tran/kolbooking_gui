import { SetStateAction, useEffect, useState } from "react"
import { BookMarkIcon, WarningIcon } from "../../../icons"
import { Label, Input, Textarea, Alert } from "@windmill/react-ui"
import { ReportJobGeneralContext } from "../../../contexts/ReportJobGeneralContext"
import { ReportJobType, ReportType } from "../../../global_variable/global_type"
import { useContext } from "react"
import axios from "axios"
import { getProxy } from "../../../utils/PathUtil"
import { AuthContext } from "../../../contexts/AuthContext"
import { ToastContext } from "../../../contexts/ToastContext"
import { generalMessage, generalWarning } from "../../../utils/ToastUtil"
import { ErrorContext } from "../../../contexts/ErrorContext"
import { HandleResponseError } from "../../../utils/ErrorHandleUtil"
import { checkValid } from "../../../validates/general/ReportValidate"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { CloudArrowUpIcon, VideoCameraIcon } from "@heroicons/react/24/solid"

const UploadIntroductionVideo = ({
  profile_id,
  onClose,
}: {
  profile_id: string
  onClose: React.Dispatch<React.SetStateAction<number>>
}) => {
  const [video, setVideo] = useState<File | null>(null)
  const [message, setMessage] = useState("")
  const { dispatch: toast_dispatch } = useContext(ToastContext)
  const { state: auth_state, dispatch: auth_dispatch } = useContext(AuthContext)
  const { setErrorCode } = useContext(ErrorContext)
  const [loading, setLoading] = useState(false)

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) {
      setMessage("Video not found")
      return
    }
    console.log(event.target.files[0])
    const file = event.target.files[0]
    const type = file.type.split("/")[1]
    const max_size_support = 50000000 // 50 mb
    const supportFile = ["mp4"]
    const reader = new FileReader()
    if (supportFile.includes(type)) {
      if (file.size <= max_size_support) {
        setVideo(file)
        setMessage("")
      } else {
        setVideo(null)
        setMessage("Upload file under 50mb")
      }
    } else {
      setVideo(null)
      setMessage("Support type mp4 only")
    }
  }

  const handleChangeProfile = () => {
    setLoading(true)
    let formData = new FormData()
    if (video !== null) {
      formData.append("kol_profile[intro_video]", video)
      axios
        .put(
          "http://14.225.206.62:3000/api/v1/kol/kol_profiles/change_video",
          formData,
          {
            headers: {
              Authorization: auth_state.auth_token,
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          setLoading(false)
          onClose(-1)
          generalMessage({
            message: "Profile change successfully",
            toast_dispatch: toast_dispatch,
          })
        })
        .catch((error) => {
          setLoading(false)
          console.log(error)
          // HandleResponseError(error, setErrorCode, toast_dispatch)
        })
    }
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-1/2 my-3 mx-auto max-w-7xl h-5/6">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col h-full w-full bg-white outline-none focus:outline-none dark:bg-gray-600">
            {/*header*/}
            <div className="flex items-center justify-start px-5 py-2 border-b border-solid border-slate-200 rounded-t">
              <span className="w-5 h-5 text-blue-400">
                <CloudArrowUpIcon />
              </span>
              <h3 className="text-lg font-semibold ml-3">Report</h3>
            </div>
            {/*body*/}
            <div className="relative p-3 flex-auto  h-10/12 overflow-y-scroll">
              <div className="mx-5 my-2 flex flex-col items-center justify-center text-base font-medium">
                <div className="flex flex-col justify-center items-center w-full">
                  <div className="p-4 rounded-full bg-blue-100">
                    <svg className="w-10 h-10 text-blue-300 ">
                      <CloudArrowUpIcon />
                    </svg>
                  </div>
                  <h6 className="font-semibold text-base mt-2">Upload Video</h6>
                  {message !== "" && (
                    <Alert
                      type="danger"
                      className="my-5"
                      onClose={() => {
                        setMessage("")
                      }}
                    >
                      {message}
                    </Alert>
                  )}
                  {video !== null && (
                    <div className="w-full p-5 border-t border-b border-gray-200 mt-5">
                      <div className="flex justify-start items-center relative">
                        <span className="w-5 h-5 text-red-400">
                          <VideoCameraIcon />
                        </span>
                        <p className="font-light truncate text-gray-400 ml-4 w-1/3 overflow-hidden">
                          {video.name}
                        </p>
                        <p className="absolute right-2 top-0 font-normal text-gray-400">
                          {Math.round(video.size / 1000000)} MB
                        </p>
                      </div>
                    </div>
                  )}
                  {video === null && (
                    <div className="extraOutline p-4 bg-white w-max bg-whtie m-auto rounded-lg">
                      <div
                        className="file_upload p-5 relative border-4 border-dotted border-gray-300 rounded-lg"
                        style={{ width: "450px" }}
                      >
                        <svg
                          className="text-blue-400 w-24 mx-auto mb-4"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                        <div className="input_field flex flex-col w-max mx-auto text-center">
                          <label>
                            <input
                              className="text-sm cursor-pointer w-36 hidden"
                              type="file"
                              onChange={(e) => {
                                handleFileInputChange(e)
                              }}
                            />
                            <div className="text bg-blue-400 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-indigo-500">
                              Select
                            </div>
                          </label>

                          <div className="title text-blue-400 uppercase">
                            or drop files here
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-4 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  onClose(-1)
                }}
              >
                Close
              </button>
              <button
                className="bg-green-400 text-white hover:bg-green-500 active:bg-green-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  handleChangeProfile()
                }}
                disabled={loading}
              >
                {loading === false && `Upload`}
                {loading === true && (
                  <div className="flex items-center justify-center w-12">
                    <div
                      style={{ borderTopColor: "transparent" }}
                      className="w-5 h-5 border-4 border-white rounded-full animate-spin"
                    ></div>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black bg-opacity-60 backdrop-blur-sm"></div>
    </>
  )
}

export default UploadIntroductionVideo
