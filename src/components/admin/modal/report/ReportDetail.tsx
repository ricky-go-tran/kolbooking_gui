import { getCDNImage } from "../../../../utils/PathUtil"
import { DEFAULT_AVATAR } from "../../../../global_variable/global_constant"
import { Loading } from "../../../general/loading/Loading"
import axios from "axios"
import { AuthContext } from "../../../../contexts/AuthContext"
import { getProxy } from "../../../../utils/PathUtil"
import { ProfileContext } from "../../../../contexts/ProfileContext"
import React, { SetStateAction, useState, useEffect, useContext } from "react"
import { ErrorContext } from "../../../../contexts/ErrorContext"
import { ToastContext } from "../../../../contexts/ToastContext"
import { HandleResponseError } from "../../../../utils/ErrorHandleUtil"
import "react-quill/dist/quill.snow.css"
import parse from "html-react-parser"

const ReportDetail = ({
  report_id,
  onClose,
}: {
  report_id: string | number
  onClose: React.Dispatch<SetStateAction<string | number>>
}) => {
  const [data, setData] = useState<any>(null)
  const { state: auth_state } = useContext(AuthContext)
  const { state: profile_state } = useContext(ProfileContext)
  const { state: toast_state, dispatch: toast_dispatch } =
    useContext(ToastContext)
  const { setErrorCode } = useContext(ErrorContext)

  useEffect(() => {
    const config = { headers: { Authorization: auth_state.auth_token } }
    let url = "/api/v1/kol/reports/"
    if (profile_state.role === "admin") {
      url = "/api/v1/admin/reports/"
    }

    axios
      .get(getProxy(url + report_id), config)
      .then((response) => {
        console.log(response)
        setData(response.data.data.attributes)
      })
      .catch((error) => {
        HandleResponseError(error, setErrorCode, toast_dispatch)
      })
  }, [])

  return (
    <>
      <div className="justify-center items-center  flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-10/12 my-6 mx-auto max-w-7xl h-5/6">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col h-full w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-2 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-xl font-semibold ml-5">Report Detail</h3>
              <button
                className="p-1 ml-auto border-0 text-red-300  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => {
                  onClose(-1)
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 30 30"
                  fill="currentColor"
                >
                  <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z"></path>{" "}
                </svg>
              </button>
            </div>
            {/*body*/}
            <div className="relative p-2 flex-auto h-10/12 overflow-y-scroll">
              <div className="mx-5 my-2">
                {data === null && <Loading />}
                {data !== null && (
                  <>
                    <div className="w-full text-lg mb-2 mt-5 select-none rounded-l-lg border-l-4 border-blue-400 bg-blue-50 p-2 font-medium hover:border-blue-500">
                      Reporter
                    </div>
                    <div className="w-ful flex items-center justify-start">
                      <div className="photo-wrapper p-2">
                        <div className="text-center text-gray-400 text-base font-semibold mb-5"></div>
                        <img
                          className="w-32 h-32 rounded-full mx-auto"
                          src={
                            data.reporter.data.attributes.avatar === "null"
                              ? getCDNImage(DEFAULT_AVATAR)
                              : getProxy(data.reporter.data.attributes.avatar)
                          }
                          alt="Avatar default"
                        />
                        <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                          {data?.reporter?.data?.attributes?.fullname}
                        </h3>
                      </div>
                      <div className="p-2">
                        <table className="text-xs my-3">
                          <tbody>
                            <tr>
                              <td className="px-2 py-2 text-gray-500 font-semibold">
                                Address
                              </td>
                              <td className="px-2 py-2">
                                {data?.reporter?.data?.attributes?.address}
                              </td>
                            </tr>
                            <tr>
                              <td className="px-2 py-2 text-gray-500 font-semibold">
                                Phone
                              </td>
                              <td className="px-2 py-2">{`+84 ${data?.reporter?.data?.attributes?.phone}`}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="w-full mb-2 select-none rounded-l-lg border-l-4 border-yellow-400 bg-yellow-100 p-4 font-medium hover:border-yellow-500">
                      Report Detail
                    </div>
                    <h6 className="text-lg font-bold dark:text-white">
                      Report Title
                    </h6>
                    <p className="my-5 text-sm   text-gray-900 dark:text-gray-400">
                      <p className="my-5 text-sm   text-gray-900 dark:text-gray-400">
                        <main className="ql-snow">
                          {" "}
                          <div className="ql-editor">
                            {parse(`${data?.description}`)}
                          </div>{" "}
                        </main>
                      </p>
                    </p>
                    <h6 className="text-lg font-bold dark:text-white">
                      Report Description
                    </h6>
                    <p className="my-5 text-sm   text-gray-900 dark:text-gray-400">
                      {data?.description}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

export default ReportDetail
