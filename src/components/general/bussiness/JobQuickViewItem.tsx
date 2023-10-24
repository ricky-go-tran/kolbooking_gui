import {
  LikeOuletIcon,
  LikeIcon,
  UnlikeOutletIcon,
  UnlikeIcon,
  WarningOutlineIcon,
  BookMarkIcon,
  BookMarkOutlineIcon,
} from "../../../icons"
import { useContext, useState, useEffect } from "react"
import { getCDNImage, getProxy } from "../../../utils/PathUtil"
import {
  DEFAULT_IMAGE,
  DEFAULT_AVATAR,
} from "../../../global_variable/global_constant"
import { limitString } from "../../../utils/StringUtil"
import { formatDate } from "../../../utils/DateUtil"
import { AuthContext } from "../../../contexts/AuthContext"
import { ProfileContext } from "../../../contexts/ProfileContext"
import axios from "axios"
import { Link } from "react-router-dom"
import { isAuth } from "../../../utils/AuthUtil"
import { ReportJobGeneralContext } from "../../../contexts/ReportJobGeneralContext"
import { ReportJobType } from "../../../global_variable/global_type"
import { ToastContext } from "../../../contexts/ToastContext"
import { ToastComponentType } from "../../../global_variable/global_component_type"
import { generalError } from "../../../utils/ToastUtil"
import { ErrorContext } from "../../../contexts/ErrorContext"
import { HandleResponseError } from "../../../utils/ErrorHandleUtil"
import "react-quill/dist/quill.snow.css"
import parse from "html-react-parser"

const JobQuickViewItem = ({ job }: { job: any }) => {
  const { state: auth_state } = useContext(AuthContext)
  const { state: toast_state, dispatch: toast_dispatch } =
    useContext(ToastContext)
  const { setErrorCode } = useContext(ErrorContext)

  return (
    <div className="my-4 w-full lg:flex shadow-lg">
      {job.image === "null" && (
        <div
          className="h-56 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
          style={{
            backgroundImage: `url(${getCDNImage(DEFAULT_IMAGE)})`,
          }}
          title="Job image"
        ></div>
      )}

      {job.image !== "null" && (
        <div
          className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
          style={{
            backgroundImage: `url(${getProxy(job.image)})`,
          }}
          title="Job image"
        ></div>
      )}
      <div className="border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white dark:bg-gray-800 dark:border-gray-800 rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal flex-grow">
        <div>
          <Link to={`/jobs/${job.id}`}>
            <div className="text-black font-bold text-xl">{job.title}</div>
          </Link>
        </div>
        <div className="max-w-lg  mb-5 2xl:max-w-2xl">
          {job?.industry?.data.map((industry: any) => {
            return (
              <span className="inline-block m-2 bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                {industry.attributes.name}
              </span>
            )
          })}
          {job?.industry?.data.length === 0 && (
            <span className="inline-block m-2 bg-red-100 text-red-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">
              Not Industry
            </span>
          )}
          <div className="text-grey-darker text-base w-11/12 truncate">
            <main className="ql-snow">
              <div className="ql-editor">{parse(`${job.description}`)}</div>
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}
export default JobQuickViewItem
