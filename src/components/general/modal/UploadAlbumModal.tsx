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
import {
  CloudArrowUpIcon,
  PhotoIcon,
  VideoCameraIcon,
} from "@heroicons/react/24/solid"

const UploadAlbumModal = ({
  profile_id,
  onClose,
}: {
  profile_id: string
  onClose: React.Dispatch<React.SetStateAction<number>>
}) => {
  const [album, setAlbum] = useState<File[]>([])
  const [message, setMessage] = useState("")

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) {
      setMessage("Album not found")
      return
    }

    const selectedFiles = Array.from(event.target.files)

    const invalidFiles = selectedFiles.filter((file) => {
      const type = file.type.split("/")[1]
      const max_size_support = 1000000 // 1MB
      const supportFile = ["jpeg", "png"]

      if (!supportFile.includes(type)) {
        setMessage("Support type jpg only")
        return true
      } else if (file.size > max_size_support) {
        setMessage("Upload file under 1MB")
        return true
      }

      return false
    })

    if (invalidFiles.length === 0) {
      setAlbum([...album, ...selectedFiles])
      setMessage("")
    } else {
      setAlbum([])
    }
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-11/12 my-3 mx-auto max-w-7xl h-5/6 lg:w-1/2">
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
                  <h6 className="font-semibold text-base mt-2">Upload Album</h6>
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
                  <label className="w-64 my-5 flex justify-center items-center px-4 py-2 bg-blue-500 text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue-400 text-white">
                    <svg
                      className="w-8 h-8 "
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                    </svg>
                    <span className="ml-3 text-base leading-normal">
                      Select a file
                    </span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      multiple
                      onChange={(e) => {
                        handleFileInputChange(e)
                      }}
                    />
                  </label>
                  <hr className="w-full border-t mx-10 border-gray-300" />
                  <h3 className="text-left w-full mt-5">File</h3>
                  <div className="flex w-full justify-start mt-2">
                    <div className="flex flex-col w-11/12">
                      {album.length === 0 && (
                        <ul
                          id="gallery"
                          className="flex flex-1 flex-wrap -m-1 mt-16"
                        >
                          <li
                            id="empty"
                            className="h-full w-full text-center flex flex-col items-center justify-center"
                          >
                            <img
                              className="mx-auto w-28"
                              src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                              alt="no data"
                            />
                            <span className="text-small text-gray-500">
                              No files selected
                            </span>
                          </li>
                        </ul>
                      )}
                      {album.length > 0 &&
                        album.map((image) => {
                          return (
                            <div className="flex justify-start items-center relative">
                              <span className="w-5 h-5 text-blue-400">
                                <PhotoIcon />
                              </span>
                              <p className="font-light truncate text-gray-400 ml-4 w-1/3 overflow-hidden">
                                {image.name}
                              </p>
                              <p className="absolute -right-6 top-0 font-normal text-gray-400">
                                {image.size / 1000000} MB
                              </p>
                            </div>
                          )
                        })}
                    </div>
                  </div>
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
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black bg-opacity-60 backdrop-blur-sm"></div>
    </>
  )
}

export default UploadAlbumModal
