import Job from "./Job"
import { Pagination } from "@windmill/react-ui"
import { useState, useEffect } from "react"

const Jobs = ({
  jobs,
  totalResults,
  resultsPerPage,
  setPageTable,
}: {
  jobs: any
  totalResults: number
  resultsPerPage: number
  setPageTable: React.Dispatch<React.SetStateAction<number>>
}) => {
  const [alert, setAlert] = useState("")

  function onPageChangeTable(p: number) {
    setPageTable(p)
  }

  if (jobs.length !== 0) {
    return (
      <div className="flex-1 flex flex-col items-center">
        {jobs.map((job: any) => {
          return <Job key={job.id} job={job.attributes} />
        })}
        <div className="my-4 w-11/12 py-3 px-2 border-t dark:border-gray-700 bg-gray-50 text-gray-500 dark:text-gray-400 dark:bg-gray-800">
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable}
            label="Page navigation"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center h-96">
      <div
        style={{ borderTopColor: "transparent" }}
        className="w-8 h-8 border-4 border-blue-600 rounded-full animate-spin"
      ></div>
      <p className="ml-2">Loading...</p>
    </div>
  )
}
export default Jobs
