import { Pagination } from "@windmill/react-ui"
import BussinessCard from "../../../components/general/bussiness/BussinessCard"
import BussinessSearch from "../../../components/general/bussiness/BussinessSearch"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { getProxy } from "../../../utils/PathUtil"
import { HandleResponseError } from "../../../utils/ErrorHandleUtil"
import { ErrorContext } from "../../../contexts/ErrorContext"
import { ToastContext } from "../../../contexts/ToastContext"

const Bussiness = () => {
  const [bussinesses, setBussinesses] = useState<any[]>([])
  const [totalResults, setTotalResults] = useState(0)
  const [resultsPerPage, setResultPerPage] = useState(0)
  const [search, setSearch] = useState("")
  const [pageTable, setPageTable] = useState(1)
  const [loading, setLoading] = useState(false)
  const { setErrorCode } = useContext(ErrorContext)
  const { state: toast_state, dispatch: toast_dispatch } =
    useContext(ToastContext)
  const [submitEvent, setSubmitEvent] = useState("")
  const [filter, setFilter] = useState("")

  function onPageChangeTable(p: number) {
    setPageTable(p)
  }

  useEffect(() => {
    let config: any = {
      params: {
        page: {
          number: pageTable,
          size: 8,
        },
        search: search,
        filter: filter,
      },
    }
    axios
      .get(getProxy("/api/v1/bussiness"), config)
      .then((response) => {
        setBussinesses(response.data.data)
        let meta = response.data.meta
        setResultPerPage(meta.items)
        setTotalResults(meta.count)
        setLoading(true)
      })
      .catch((error) => {
        HandleResponseError(error, setErrorCode, toast_dispatch)
      })
  }, [pageTable, submitEvent])

  return (
    <>
      <BussinessSearch
        search={search}
        onSearch={setSearch}
        filter={filter}
        onFilter={setFilter}
        onSubmit={setSubmitEvent}
      />
      <div className="container mx-auto">
        <div className="flex flex-wrap -mx-4">
          {bussinesses.length === 0 && (
            <ul id="gallery" className="flex flex-1 flex-wrap -m-1 mt-16">
              <li
                id="empty"
                className="h-full w-full text-center flex flex-col items-center justify-center"
              >
                <img
                  className="mx-auto w-28"
                  src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png"
                  alt="no data"
                />
                <span className="text-small text-gray-500">No Items</span>
              </li>
            </ul>
          )}
          {bussinesses.length > 0 &&
            bussinesses.map((item: any) => {
              return <BussinessCard bussiness={item.attributes} key={item.id} />
            })}
        </div>
        <div className="my-5 px-4 py-3 border-t dark:border-gray-700 bg-gray-50 text-gray-500 dark:text-gray-400 dark:bg-gray-800">
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable}
            label="Page navigation"
          />
        </div>
      </div>
    </>
  )
}
export default Bussiness
