import React, { useContext, useEffect, useState } from "react"
import SectionTitle from "../../admin/typography/SectionTitle"
import { getProxy } from "../../../utils/PathUtil"
import { INDUSTRY_URL } from "../../../global_variable/global_uri_backend"
import axios from "axios"
import { SearchJobHomepageContext } from "../../../contexts/SearchJobGeneralContext"
import { FilterJobGeneralContext } from "../../../contexts/FilterJobGeneralContext"
import { ErrorContext } from "../../../contexts/ErrorContext"
import { HandleResponseError } from "../../../utils/ErrorHandleUtil"
import { ToastContext } from "../../../contexts/ToastContext"

const JobFilter = () => {
  const [industries, setIndustries] = useState<any[]>([])
  const [tempSearch, setTempSearch] = useState<string>()
  const [tempFilter, setTempFilter] = useState<string[]>([])
  const { setJobSearch } = useContext(SearchJobHomepageContext)
  const { setJobFilter } = useContext(FilterJobGeneralContext)
  const { setErrorCode } = useContext(ErrorContext)
  const { state: toast_state, dispatch: toast_dispatch } =
    useContext(ToastContext)

  useEffect(() => {
    axios
      .get(getProxy(INDUSTRY_URL))
      .then((response) => {
        setIndustries(response.data.data)
      })
      .catch((error) => {
        HandleResponseError(error, setErrorCode, toast_dispatch)
      })
  }, [])

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const id = event.target.value
    if (event.target.checked) {
      setTempFilter([...tempFilter, id])
    } else {
      setTempFilter(
        tempFilter.filter((item) => {
          item !== id
        })
      )
    }
  }

  const submitFilter = () => {
    setJobSearch(tempSearch)
    setJobFilter(tempFilter)
  }

  return (
    <div className="hidden w-1/4 lg:flex items-start justify-center mt-5">
      <div className="w-11/12 rounded bg-white p-3 dark:bg-gray-700">
        <div className="py-5 px-3">
          <h6 className="text-lg text-gray-800 dark:text-gray-600 font-semibold mb-3">
            Search & Filter Jobs
          </h6>
          <hr className="bg-gray-700 dark:bg-gray-500 my-2" />
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search by title jobs..."
              onChange={(e) => setTempSearch(e.target.value)}
              value={tempSearch}
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => {
                submitFilter()
              }}
            >
              Search
            </button>
          </div>
          <hr className="bg-gray-700 dark:bg-gray-500 mt-7 mb-3" />
          <h6 className="text-base text-gray-800 dark:text-gray-600 font-semibold mb-3">
            Filter by industry
          </h6>
          <ul
            className="h-auto px-3 pb-3  text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownSearchButton"
          >
            {industries.map((industry) => {
              return (
                <li key={industry?.attributes?.id}>
                  <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <input
                      id="checkbox-item-11"
                      type="checkbox"
                      value={industry?.attributes?.id}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      onChange={handleCheckboxChange}
                    />
                    <label
                      htmlFor="checkbox-item-11"
                      className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                    >
                      {industry?.attributes?.name}
                    </label>
                  </div>
                </li>
              )
            })}
          </ul>
          <button
            className="text-white bg-blue-600 px-10 rounded-md py-3 mt-5"
            onClick={() => {
              submitFilter()
            }}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}

export default JobFilter
