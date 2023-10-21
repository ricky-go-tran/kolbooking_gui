import { Badge, Button } from "@windmill/react-ui"
import ReviewItem from "../../../components/general/review/ReviewItem"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { useState } from "react"
import {
  CommentOutlineIcon,
  FollowOutlineIcon,
  JobOutlineIcon,
  PeopleIcon,
} from "../../../icons"
import { HeartIcon, UserIcon } from "@heroicons/react/24/outline"

const Detail = () => {
  const [review, setReview] = useState("")

  const handleChangeReview = (value: string) => {
    if (review != value) {
      setReview(value)
    }
  }

  const clearReview = () => {
    setReview("")
  }

  return (
    <div className="bg-gray-100 w-full">
      <div className="w-full lg:max-w-screen-2xl mx-auto py-8">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
          <div className="col-span-4 sm:col-span-3">
            <div className="bg-white shadow rounded-lg p-6">
              <div className="flex flex-col items-center">
                <img
                  src="https://randomuser.me/api/portraits/men/94.jpg"
                  className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                />
                <h1 className="text-xl font-bold">John Doe</h1>
                <Badge type="success">Bussiness</Badge>
                <div className="mt-6 flex flex-wrap gap-4 justify-center">
                  <a
                    href="whatsapp://send?abid=0942805461&text=Hello%2C%20World!"
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                  >
                    Call me
                  </a>
                  <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded">
                    Follow
                  </button>
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
                    <span className="ml-3">3 Jobs</span>
                  </span>
                  <span className="flex items-center mt-2">
                    <label className="h-7 w-7 y-7">
                      <CommentOutlineIcon />
                    </label>
                    <span className="ml-3">3 Reviews</span>
                  </span>
                  <span className="flex items-center mt-2">
                    <label className="h-6 w-6 y-7">
                      <HeartIcon />
                    </label>
                    <span className="ml-3">3 Followers </span>
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
                        583745836458763
                      </td>
                    </tr>
                    <tr>
                      <td className="px-2 py-2 text-gray-600 font-medium">
                        Email
                      </td>
                      <td className="px-2 py-2 dark:text-gray-100">
                        583745836458763
                      </td>
                    </tr>
                    <tr>
                      <td className="px-2 py-2 text-gray-600 font-medium">
                        Location
                      </td>
                      <td className="px-2 py-2 dark:text-gray-100">
                        583745836458763
                      </td>
                    </tr>
                    <tr>
                      <td className="px-2 py-2 text-gray-600 font-medium">
                        Phone
                      </td>
                      <td className="px-2 py-2 dark:text-gray-100">{`+84 3248937534`}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="col-span-4 sm:col-span-9">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">Overview</h2>
              <p className="text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                finibus est vitae tortor ullamcorper, ut vestibulum velit
                convallis. Aenean posuere risus non velit egestas suscipit. Nunc
                finibus vel ante id euismod. Vestibulum ante ipsum primis in
                faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam
                erat volutpat. Nulla vulputate pharetra tellus, in luctus risus
                rhoncus id.
              </p>
            </div>
            <div className="bg-white shadow rounded-lg p-6 mt-6">
              <h2 className="text-xl font-bold mb-4">Recruitments </h2>
            </div>
            <div className="bg-white shadow rounded-lg p-6 mt-6">
              <h2 className="text-xl font-bold mb-4"> Reviews </h2>
              <ReactQuill
                theme="snow"
                value={review}
                onChange={handleChangeReview}
                className="h-24 mb-14"
              />
              <div className="w-full flex  flex-row-reverse">
                <Button className="mx-3">Submit</Button>
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
              <ReviewItem />
              <ReviewItem />
              <ReviewItem />
              <ReviewItem />
              <ReviewItem />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Detail
