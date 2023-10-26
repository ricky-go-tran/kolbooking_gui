import { DEFAULT_AVATAR } from "../../../global_variable/global_constant"
import { CommentOutlineIcon, JobOutlineIcon } from "../../../icons"
import { getCDNImage, getProxy } from "../../../utils/PathUtil"
import "react-quill/dist/quill.snow.css"
import parse from "html-react-parser"

const BussinessCard = ({ bussiness }: { bussiness: any }) => {
  return (
    <div className="w-full sm:w-1/2 md:w-1/2 xl:w-1/4 p-4">
      <a
        href={`/bussiness/${bussiness.profile.data.attributes.id}`}
        className="c-card block bg-white shadow-md hover:shadow-xl rounded-lg overflow-hidden"
      >
        <div className="relative pb-48 overflow-hidden">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src={
              bussiness.avatar === "null"
                ? getCDNImage(DEFAULT_AVATAR)
                : getProxy(bussiness.avatar)
            }
            alt=""
          />
        </div>
        <div className="p-4">
          {bussiness.bussiness.type_profile === "bussiness" && (
            <span className="inline-block px-2 py-1 leading-none bg-orange-200 text-orange-800 rounded-full font-semibold uppercase tracking-wide text-xs">
              Bussiness
            </span>
          )}
          {bussiness.bussiness.type_profile === "personal" && (
            <span className="inline-block px-2 py-1 leading-none bg-blue-200 text-blue-800 rounded-full font-semibold uppercase tracking-wide text-xs">
              Personal
            </span>
          )}
          <h2 className="mt-2 mb-2  font-bold">
            {bussiness.profile.data.attributes.fullname}
          </h2>
          <div className="text-sm h-24 overflow-y-hidden -m-4">
            <main className="ql-snow">
              <div className="ql-editor">
                {parse(`${bussiness.bussiness.overview}`)}
              </div>
            </main>
          </div>
        </div>
        <div className="p-4 border-t border-b text-xs text-gray-700">
          <span className="flex items-center mb-1">
            <label className="h-7 y-7">
              <JobOutlineIcon />
            </label>
            <span className="ml-3">{bussiness.job_num} Jobs</span>
          </span>
          <span className="flex items-center mt-2">
            <label className="h-7 y-7">
              <CommentOutlineIcon />
            </label>
            <span className="ml-3">{bussiness.review_num} Reviews</span>
          </span>
        </div>
      </a>
    </div>
  )
}

export default BussinessCard
