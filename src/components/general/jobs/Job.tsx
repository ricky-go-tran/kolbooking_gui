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

const Job = ({ job }: { job: any }) => {
  const { state: auth_state } = useContext(AuthContext)
  const { state: profile_state } = useContext(ProfileContext)
  const [liked, setLiked] = useState(false)
  const [unliked, setUnliked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [unlikeCount, setUnlikeCount] = useState(0)
  const [bookmarked, setBookmarked] = useState(false)
  const config = { headers: { Authorization: auth_state.auth_token } }
  const { state: report_job_state, dispatch: report_job_dispatch } = useContext(
    ReportJobGeneralContext
  )
  const { state: toast_state, dispatch: toast_dispatch } =
    useContext(ToastContext)
  const { setErrorCode } = useContext(ErrorContext)

  useEffect(() => {
    setLikeCount(job.like_num)
    setUnlikeCount(job.unlike_num)
    if (job.current_user_like === null || job.current_user_like === undefined) {
      setLiked(false)
    } else {
      setLiked(true)
    }
    if (
      job.current_user_unlike === undefined ||
      job.current_user_unlike === null
    ) {
      setUnliked(false)
    } else {
      setUnliked(true)
    }

    if (
      job.current_user_bookmark === undefined ||
      job.current_user_bookmark === null
    ) {
      setBookmarked(false)
    } else {
      setBookmarked(true)
    }
  }, [])

  const like = (job: any) => {
    if (isAuth(auth_state)) {
      axios
        .post(
          getProxy(`/api/v1/emoji_jobs/${job.id}/like`),
          {},
          {
            headers: {
              Authorization: auth_state.auth_token,
            },
          }
        )
        .then((response) => {
          if (response.status !== 204) {
            setLiked(true)
            setUnliked(false)
            if (response.status === 200) {
              setLikeCount(likeCount + 1)
              setUnlikeCount(unlikeCount - 1)
            } else if (response.status === 201) {
              setLikeCount(likeCount + 1)
            }
          }
        })
        .catch((error) => {
          HandleResponseError(error, setErrorCode, toast_dispatch)
        })
    } else {
      generalError({
        message: "To perform this action you need to log in",
        toast_dispatch: toast_dispatch,
      })
    }
  }

  const unlike = (job: any) => {
    if (isAuth(auth_state)) {
      axios
        .post(
          getProxy(`/api/v1/emoji_jobs/${job.id}/unlike`),
          {},
          {
            headers: {
              Authorization: auth_state.auth_token,
            },
          }
        )
        .then((response) => {
          if (response.status !== 204) {
            setLiked(false)
            setUnliked(true)
            if (response.status === 200) {
              setLikeCount(likeCount - 1)
              setUnlikeCount(unlikeCount + 1)
            } else if (response.status === 201) {
              setUnlikeCount(unlikeCount + 1)
            }
          }
        })
        .catch((error) => {
          HandleResponseError(error, setErrorCode, toast_dispatch)
        })
    } else {
      generalError({
        message: "To perform this action you need to log in",
        toast_dispatch: toast_dispatch,
      })
    }
  }

  const mark = (job: any) => {
    const body = { bookmark: { job_id: job.id, status: "care" } }
    axios
      .post(getProxy(`/api/v1/kol/bookmarks/${job.id}/mark`), body, config)
      .then((response) => {
        setBookmarked(true)
      })
      .then((error) => {
        HandleResponseError(error, setErrorCode, toast_dispatch)
      })
  }

  const unmark = (job: any) => {
    axios
      .delete(getProxy(`/api/v1/kol/bookmarks/${job.id}/unmark`), config)
      .then((response) => {
        setBookmarked(false)
      })
      .then((error) => {
        HandleResponseError(error, setErrorCode, toast_dispatch)
      })
  }

  const bookmark = (job: any) => {
    if (bookmarked === false) {
      mark(job)
    } else {
      unmark(job)
    }
  }

  const reported = (job: any) => {
    if (isAuth(auth_state)) {
      const payload: ReportJobType = {
        id_job: job.id,
        title_job: job.title,
        name_onwer: job?.owner?.data?.attributes?.fullname || "Unknown",
        id_reporter: profile_state.id,
      }

      report_job_dispatch({ type: "FETCH", payload: payload })
    } else {
      generalError({
        message: "To perform this action you need to log in",
        toast_dispatch: toast_dispatch,
      })
    }
  }

  return (
    <div className="my-4 w-11/12 lg:flex ">
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
          <p className="text-grey-darker text-base">
            {limitString(job.description || " ")}
          </p>
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
        </div>
        <div className="flex justify-between">
          <div className="flex items-center">
            <img
              className="w-10 h-10 rounded-full mr-4"
              src={
                job?.owner?.data?.attributes?.avatar === "null"
                  ? getCDNImage(DEFAULT_AVATAR)
                  : getProxy(job?.owner?.data?.attributes?.avatar)
              }
              alt="Avatar of Owner"
            />

            <div className="text-sm">
              <p className="text-black leading-none">
                {job?.owner?.data?.attributes?.fullname || "Unknown"}
              </p>
              <p className="text-grey-dark">
                {formatDate(job?.created_at) || "Unknown"}
              </p>
            </div>
          </div>
          <ul className="flex items-center w-1/4 justify-between">
            <>
              <li
                className="flex items-center justify-center text-gray-500 cursor-pointer hover:text-gray-400"
                onClick={(e) => {
                  like(job)
                }}
              >
                {liked === false && <LikeOuletIcon />}
                {liked === true && <LikeIcon />}
                <span>{likeCount}</span>
              </li>
              <li
                className="flex items-center justify-center text-gray-500 cursor-pointer hover:text-gray-400"
                onClick={() => {
                  unlike(job)
                }}
              >
                {unliked === false && <UnlikeOutletIcon />}
                {unliked === true && <UnlikeIcon />}
                <span>{unlikeCount}</span>
              </li>
              {profile_state.role === "kol" && (
                <li
                  className="flex items-center justify-center text-gray-500 cursor-pointer hover:text-gray-400"
                  onClick={() => {
                    bookmark(job)
                  }}
                >
                  {bookmarked === false && <BookMarkOutlineIcon />}
                  {bookmarked === true && <BookMarkIcon />}
                </li>
              )}
              <li className="flex text-gray-500 cursor-pointer hover:text-gray-400">
                <WarningOutlineIcon
                  onClick={() => {
                    reported(job)
                  }}
                />
              </li>
            </>
          </ul>
        </div>
      </div>
    </div>
  )
}
export default Job
