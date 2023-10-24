import { DEFAULT_AVATAR } from "../../../global_variable/global_constant"
import { getCDNImage, getProxy } from "../../../utils/PathUtil"
import "react-quill/dist/quill.snow.css"
import parse from "html-react-parser"
import { memo } from "react"

const ReviewItem = ({ review }: { review: any }) => {
  console.log(review)
  return (
    <>
      <div className="flex my-3">
        <div className="flex-shrink-0 mr-3">
          <img
            className="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
            src={
              review.reviewer.data.attributes.avatar === "null"
                ? getCDNImage(DEFAULT_AVATAR)
                : getProxy(review.reviewer.data.attributes.avatar)
            }
            alt=""
          />
        </div>
        <div className="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
          <strong>{review.reviewer.data.attributes.fullname}</strong>{" "}
          <span className="text-xs ml-3 text-gray-400">
            {new Date(review.created_at).toLocaleString()}
          </span>
          <div className="text-sm">
            <main className="ql-snow">
              <div className="ql-editor">{parse(`${review?.content}`)}</div>
            </main>
          </div>
        </div>
      </div>
    </>
  )
}

export default memo(ReviewItem)
