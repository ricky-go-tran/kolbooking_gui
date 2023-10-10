import JobFilter from "./JobFilter"
import Jobs from "./Jobs"
import axios, { AxiosResponse } from "axios"
import { useEffect, useState, useContext } from "react"
import { getProxy } from "../../../utils/PathUtil"
import { AuthContext } from "../../../contexts/AuthContext"
import { isAuth } from "../../../utils/AuthUtil"
import ReportModal from "../modal/ReportModal"
import { ReportJobGeneralContextProvider } from "../../../contexts/ReportJobGeneralContext"
import { ReportJobGeneralContext } from "../../../contexts/ReportJobGeneralContext"
import { SearchJobHomepageContext } from "../../../contexts/SearchJobGeneralContext"
import { FilterJobGeneralContext } from "../../../contexts/FilterJobGeneralContext"

const JobContent = () => {
  const [jobs, setJobs] = useState<any[]>([])
  const { state: auth_state } = useContext(AuthContext)
  const [totalResults, setTotalResults] = useState(0)
  const [resultsPerPage, setResultPerPage] = useState(0)
  const [pageTable, setPageTable] = useState(1)
  const { state: report_job_state, dispatch: report_job_dispatch } = useContext(
    ReportJobGeneralContext
  )
  const { jobSearch } = useContext(SearchJobHomepageContext)
  const { jobFilter } = useContext(FilterJobGeneralContext)

  const fetchData = (response: AxiosResponse<any, any>) => {
    setJobs(response.data.data)
    let meta = response.data.meta
    setResultPerPage(meta.items)
    setTotalResults(meta.count)
  }

  useEffect(() => {
    let config: any = {
      params: {
        page: {
          number: pageTable,
        },
        search: jobSearch,
      },
    }
    if (isAuth(auth_state)) {
      config = {
        headers: {
          Authorization: auth_state.auth_token,
        },
        params: {
          page: {
            number: pageTable,
          },
          search: jobSearch,
          filter: jobFilter,
        },
      }
    }
    axios
      .get(getProxy("/api/v1/jobs"), config)
      .then((response) => {
        fetchData(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [auth_state, pageTable, jobSearch, jobFilter])

  return (
    <div className="w-full min-h-full flex bg-gray-100 pt-3 dark:bg-gray-600">
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <JobFilter />
      <Jobs
        jobs={jobs}
        resultsPerPage={resultsPerPage}
        totalResults={totalResults}
        setPageTable={setPageTable}
      />
    </div>
  )
}
export default JobContent
