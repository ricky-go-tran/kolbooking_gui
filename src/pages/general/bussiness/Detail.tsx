import { Badge, Button, Pagination } from "@windmill/react-ui"
import ReviewItem from "../../../components/general/review/ReviewItem"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { useCallback, useContext, useEffect, useState } from "react"
import {
  CommentOutlineIcon,
  FollowOutlineIcon,
  JobOutlineIcon,
  PeopleIcon,
} from "../../../icons"
import { HeartIcon, UserIcon } from "@heroicons/react/24/outline"
import { AuthContext } from "../../../contexts/AuthContext"
import { isAuth } from "../../../utils/AuthUtil"
import axios from "axios"
import { useParams } from "react-router-dom"
import { HandleResponseError } from "../../../utils/ErrorHandleUtil"
import { ErrorContext } from "../../../contexts/ErrorContext"
import { ToastContext } from "../../../contexts/ToastContext"
import { getCDNImage, getProxy } from "../../../utils/PathUtil"
import { DEFAULT_AVATAR } from "../../../global_variable/global_constant"
import JobQuickViewItem from "../../../components/general/bussiness/JobQuickViewItem"
import {
  generalError,
  generalMessage,
  generalWarning,
} from "../../../utils/ToastUtil"
import { ProfileContext } from "../../../contexts/ProfileContext"
import "react-quill/dist/quill.snow.css"
import parse from "html-react-parser"

const Detail = () => {
  const [review, setReview] = useState("")
  const [data, setData] = useState<any>(null)
  const [jobs, setJobs] = useState<any[]>([])
  const [reviews, setReviews] = useState<any[]>([])
  const { state: auth_state } = useContext(AuthContext)
  const { state: profile_state } = useContext(ProfileContext)
  const params = useParams()
  const { setErrorCode } = useContext(ErrorContext)
  const { state: toast_state, dispatch: toast_dispatch } =
    useContext(ToastContext)
  const [totalResults, setTotalResults] = useState(0)
  const [resultsPerPage, setResultPerPage] = useState(0)
  const [pageTable, setPageTable] = useState(1)
  const config = { headers: { Authorization: auth_state.auth_token } }
  const [load, setLoad] = useState("")
  const [follow, setFollow] = useState(0)
  const [follower, setFollower] = useState(false)

  const handleChangeReview = useCallback((value: string) => {
    if (review != value) {
      setReview(value)
    }
  }, [])

  const clearReview = () => {
    setReview("")
  }

  const followed = () => {
    const param = {
      follower: {
        follower_id: profile_state.id,
        followed_id: params.id,
      },
    }
    const config = {
      headers: {
        Authorization: auth_state.auth_token,
      },
    }
    if (isAuth(auth_state)) {
      axios
        .post(getProxy("/api/v1/base/followers/follow"), param, config)
        .then((res) => {
          setFollower(true)
          setFollow(follow + 1)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  const unfollow = () => {
    const param = {
      follower: {
        follower_id: profile_state.id,
        followed_id: params.id,
      },
    }
    const config = {
      headers: {
        Authorization: auth_state.auth_token,
      },
    }
    if (isAuth(auth_state)) {
      axios
        .delete(
          getProxy(`/api/v1/base/followers/${params.id}/unfollow`),
          config
        )
        .then((res) => {
          setFollower(false)
          setFollow(follow - 1)
        })
        .catch((error) => {
          HandleResponseError(error, setErrorCode, toast_dispatch)
        })
    }
  }

  useEffect(() => {
    let config = {}
    if (isAuth(auth_state)) {
      config = {
        headers: { Authorization: auth_state.auth_token },
      }
    }
    axios
      .get(getProxy(`/api/v1/bussiness/${params.id}`), { ...config })
      .then((response) => {
        let handle_data = response.data.data.attributes
        // console.log(handle_data)
        setData(handle_data)
        setFollow(handle_data.follow_num || 0)
        if (
          handle_data.current_user_follow === undefined ||
          handle_data.current_user_follow === null
        ) {
          setFollower(false)
        } else {
          setFollower(true)
        }
      })
      .catch((error) => {
        HandleResponseError(error, setErrorCode, toast_dispatch)
      })
  }, [])

  useEffect(() => {
    let config: any = {
      params: {
        page: {
          number: pageTable,
        },
      },
    }
    axios
      .get(getProxy(`/api/v1/jobs/${params.id}/jobs_by_owner`), config)
      .then((response) => {
        setJobs(response.data.data)
        let meta = response.data.meta
        setResultPerPage(meta.items)
        setTotalResults(meta.count)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [pageTable])

  useEffect(() => {
    axios
      .get(getProxy(`/api/v1/reviews/${params.id}/reviews_by_reviewed`))
      .then((response) => {
        setReviews(response.data.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [load])

  function onPageChangeTable(p: number) {
    setPageTable(p)
  }

  const submitComent = () => {
    if (isAuth(auth_state)) {
      const param = {
        review: {
          content: review,
          reviewed_id: params.id,
          reviewer_id: profile_state.id,
        },
      }
      axios
        .post(getProxy("/api/v1/reviews"), param, config)
        .then((response) => {
          generalMessage({
            message: "Successly reviews",
            toast_dispatch: toast_dispatch,
          })
          setLoad(`${new Date().getTime()}`)
          setReview("")
        })
        .catch((error) => {
          HandleResponseError(error, setErrorCode, toast_dispatch)
        })
    } else {
      generalWarning({
        message: "Need login to review!",
        toast_dispatch: toast_dispatch,
      })
    }
  }

  return (
    <div className="bg-gray-100 w-full">
      {data !== null && (
        <div className="w-full lg:max-w-screen-2xl mx-auto py-8">
          <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
            <div className="col-span-4 sm:col-span-3">
              <div className="bg-white shadow rounded-lg p-6">
                <div className="flex flex-col items-center">
                  <img
                    src={
                      data.avatar === "null"
                        ? getCDNImage(DEFAULT_AVATAR)
                        : getProxy(data.avatar)
                    }
                    className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                  />
                  <h1 className="text-xl font-bold"> {data.fullname}</h1>
                  {data.bussiness.data.attributes.type_profile ===
                    "bussiness" && <Badge type="success">Bussiness</Badge>}
                  {data.bussiness.data.attributes.type_profile ===
                    "personal" && <Badge type="primary">Personal</Badge>}
                  <div className="mt-6 flex flex-wrap gap-4 justify-center">
                    <a
                      href={`whatsapp://send?abid=${data.phone}&text=Hello%2C%20World!`}
                      className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                    >
                      Call me
                    </a>
                    {follower === false && (
                      <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded"
                        onClick={() => {
                          followed()
                        }}
                      >
                        Follow
                      </button>
                    )}
                    {follower === true && (
                      <button
                        className="bg-red-300 hover:bg-red-400 text-gray-50 py-2 px-4 rounded"
                        onClick={() => {
                          unfollow()
                        }}
                      >
                        Unfollow
                      </button>
                    )}
                  </div>
                </div>
                <hr className="my-6 border-t border-gray-300" />
                <div className="flex flex-col">
                  <span className="text-gray-600 uppercase font-bold tracking-wider mb-2">
                    Statistical
                  </span>
                  <div className="p-4 text-xs text-gray-700">
                    <span className="flex items-center mb-1">
                      <label className="h-7 w-7 y-7">
                        <JobOutlineIcon />
                      </label>
                      <span className="ml-3">{data?.job_num || 0} Jobs</span>
                    </span>
                    <span className="flex items-center mt-2">
                      <label className="h-7 w-7 y-7">
                        <CommentOutlineIcon />
                      </label>
                      <span className="ml-3">
                        {data?.review_num || 0} Reviews
                      </span>
                    </span>
                    <span className="flex items-center mt-2">
                      <label className="h-6 w-6 y-7">
                        <HeartIcon />
                      </label>
                      <span className="ml-3">{follow} Followers </span>
                    </span>
                  </div>
                </div>
                <hr className="my-6 border-gray-300" />
                <div className="flex flex-col">
                  <span className="text-gray-600 uppercase font-bold tracking-wider mb-2">
                    Profile Infomation
                  </span>
                  <table className="text-base font-thin my-3">
                    <tbody>
                      <tr>
                        <td className="px-2 py-2 text-gray-600 font-medium">
                          Birthday
                        </td>
                        <td className="px-2 py-2 dark:text-gray-100">
                          {data.birthday}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-2 py-2 text-gray-600 font-medium">
                          Email
                        </td>
                        <td className="px-2 py-2 dark:text-gray-100">
                          {data.email}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-2 py-2 text-gray-600 font-medium">
                          Location
                        </td>
                        <td className="px-2 py-2 dark:text-gray-100">
                          {data.address}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-2 py-2 text-gray-600 font-medium">
                          Phone
                        </td>
                        <td className="px-2 py-2 dark:text-gray-100">{`+84 ${data.phone}`}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-span-4 sm:col-span-9">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">Overview</h2>
                <div className="text-gray-700">
                  <main className="ql-snow">
                    <div className="ql-editor">
                      {parse(`${data.bussiness.data.attributes.overview}`)}
                    </div>
                  </main>
                </div>
              </div>
              <div className="bg-white shadow rounded-lg p-6 mt-6">
                <h2 className="text-xl font-bold mb-4">Recruitments </h2>
                {jobs.map((job) => {
                  return <JobQuickViewItem job={job.attributes} key={job.id} />
                })}
                <Pagination
                  totalResults={totalResults}
                  resultsPerPage={resultsPerPage}
                  onChange={onPageChangeTable}
                  label="Page navigation"
                />
              </div>
              <div className="bg-white shadow rounded-lg p-6 mt-6">
                <h2 className="text-xl font-bold mb-4"> Reviews </h2>
                <ReactQuill
                  theme="snow"
                  value={review}
                  onChange={handleChangeReview}
                  className="h-24 mb-28 lg:mb-20"
                />
                <div className="w-full flex  flex-row-reverse">
                  <Button
                    className="mx-3"
                    onClick={() => {
                      submitComent()
                    }}
                  >
                    Submit
                  </Button>
                  <Button
                    layout="outline"
                    className="mx-3"
                    onClick={() => {
                      clearReview()
                    }}
                  >
                    Clear
                  </Button>
                </div>
                <hr className="my-6 border-t border-gray-300" />
                {reviews.length > 0 &&
                  reviews.map((item) => {
                    return <ReviewItem key={item.id} review={item.attributes} />
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Detail
