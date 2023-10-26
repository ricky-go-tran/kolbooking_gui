import JobFilter from "./JobFilter"
import Jobs from "./Jobs"
import axios, { AxiosResponse } from "axios"
import { useEffect, useState, useContext } from "react"
import { getProxy } from "../../../utils/PathUtil"
import { AuthContext } from "../../../contexts/AuthContext"
import { isAuth } from "../../../utils/AuthUtil"
import { SearchJobHomepageContext } from "../../../contexts/SearchJobGeneralContext"
import { FilterJobGeneralContext } from "../../../contexts/FilterJobGeneralContext"
import { Loading } from "../loading/Loading"
import { HandleResponseError } from "../../../utils/ErrorHandleUtil"
import { ErrorContext } from "../../../contexts/ErrorContext"
import { ToastContext } from "../../../contexts/ToastContext"

const JobContent = () => {
  const [jobs, setJobs] = useState<any[]>([])
  const { state: auth_state } = useContext(AuthContext)
  const [totalResults, setTotalResults] = useState(0)
  const [resultsPerPage, setResultPerPage] = useState(0)
  const [pageTable, setPageTable] = useState(1)
  const { dispatch: toast_dispatch } = useContext(ToastContext)
  const { jobSearch } = useContext(SearchJobHomepageContext)
  const { jobFilter } = useContext(FilterJobGeneralContext)
  const [loading, setLoading] = useState(false)
  const { setErrorCode } = useContext(ErrorContext)

  const fetchData = (response: AxiosResponse<any, any>) => {
    setJobs(response.data.data)
    const meta = response.data.meta
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
        filter: jobFilter,
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
        setLoading(true)
      })
      .catch((error) => {
        HandleResponseError(error, setErrorCode, toast_dispatch)
      })
  }, [auth_state, pageTable, jobSearch, jobFilter])

  return (
    <div className="w-full min-h-full flex bg-gray-100 pt-3 dark:bg-gray-600">
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <JobFilter />
      {loading === false && (
        <div className="w-9/12">
          <Loading />
        </div>
      )}
      {loading === true && (
        <Jobs
          jobs={jobs}
          resultsPerPage={resultsPerPage}
          totalResults={totalResults}
          setPageTable={setPageTable}
        />
      )}
    </div>
  )
}
export default JobContent
