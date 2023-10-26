import { getCDNImage, getProxy } from "../../../utils/PathUtil"
import { DEFAULT_IMAGE } from "../../../global_variable/global_constant"
import { Link } from "react-router-dom"
import "react-quill/dist/quill.snow.css"
import parse from "html-react-parser"

const JobQuickViewItem = ({ job }: { job: any }) => {
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
        <img
          className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
          src={getProxy(job.image)}
          alt=""
        />
      )}
      <div className="border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white dark:bg-gray-800 dark:border-gray-800 rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal flex-grow flex-1">
        <div>
          <Link to={`/jobs/${job.id}`}>
            <div className="text-black font-bold text-xl">{job.title}</div>
          </Link>
        </div>
        <div className="w-full  mb-5 ">
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
          <div className="text-grey-darker text-base w-full truncate max-h-24">
            <main className="ql-snow w-full">
              <div className="ql-editor w-full">
                {parse(`${job.description}`)}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  )
}
export default JobQuickViewItem
