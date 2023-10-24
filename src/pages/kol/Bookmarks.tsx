import React, { useState, useEffect, useContext } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Avatar,
  Button,
  Pagination,
} from "@windmill/react-ui"
import PageTitle from "../../components/admin/typography/PageTitle"
import { LockIcon } from "../../icons"
import {
  ISheetBookmark,
  ITableBookmark,
} from "../../global_variable/global_table_admin"
import axios from "axios"
import { getProxy } from "../../utils/PathUtil"
import {
  fetchToISheetBookmark,
  fetchToITableBookmark,
} from "../../utils/FetchDataTable"
import { Alert } from "@windmill/react-ui"
import { HandleResponseError } from "../../utils/ErrorHandleUtil"
import { Link, useNavigate } from "react-router-dom"
import JobDetail from "../../components/admin/modal/job/JobDetail"
import { utils, writeFile } from "xlsx"
import { ToastContext } from "../../contexts/ToastContext"
import { generalMessage } from "../../utils/ToastUtil"
import { ErrorContext } from "../../contexts/ErrorContext"

const Bookmark = () => {
  const { state: auth_state } = useContext(AuthContext)
  const [pageTable, setPageTable] = useState(1)
  const [dataTable, setDataTable] = useState<ITableBookmark[]>([])
  const [totalResults, setTotalResults] = useState(0)
  const [alert, setAlert] = useState("")
  const [resultsPerPage, setResultPerPage] = useState(0)
  const [detail, setDetail] = useState<number | string>(-1)
  const [tab, setTab] = useState<string>("all")
  const [sheetData, setSheetData] = useState<ISheetBookmark[]>([])
  const { dispatch: toast_dispatch } = useContext(ToastContext)
  const { setErrorCode } = useContext(ErrorContext)

  useEffect(() => {
    const config = {
      headers: {
        Authorization: auth_state.auth_token,
      },
      params: {
        tab: tab,
        page: {
          number: pageTable,
        },
      },
    }
    axios
      .get(getProxy("/api/v1/kol/bookmarks"), config)
      .then((response) => {
        let handle_data = fetchToITableBookmark(response.data.data)
        let meta = response.data.meta
        let sheet = fetchToISheetBookmark(response.data.data)
        setResultPerPage(meta.items)
        setTotalResults(meta.count)
        setDataTable(handle_data)
        setSheetData(sheet)
      })
      .catch((error) => {
        HandleResponseError(error, setErrorCode, toast_dispatch)
        // HandleResponseError(error, navigate)
      })
  }, [pageTable, tab, resultsPerPage])

  function onPageChangeTable(p: number) {
    setPageTable(p)
  }

  function viewJob(job: string | number) {
    setDetail(job)
  }

  const handleExportSheet = () => {
    const heading = [
      [
        "Id",
        "Status Bookmark",
        "Title",
        "Description",
        "Requirement",
        "Status",
        "Created at",
      ],
    ]
    const wb = utils.book_new()
    const ws = utils.json_to_sheet([])
    utils.sheet_add_aoa(ws, heading)
    utils.sheet_add_json(ws, sheetData, { origin: "A2", skipHeader: true })
    utils.book_append_sheet(wb, ws, `Bookmark with ${tab}`)
    writeFile(wb, `Bookmark-${Date.now()}.xlsx`)
  }

  function handleAction(
    event: React.ChangeEvent<HTMLSelectElement>,
    job: ITableBookmark
  ) {
    let action = event.target.value
    if (action === "unmark") {
      axios
        .delete(getProxy(`/api/v1/kol/bookmarks/${job.id_job}/unmark`), {
          headers: {
            Authorization: auth_state.auth_token,
          },
        })
        .then((response) => {
          generalMessage({
            message: "Change status successfully",
            toast_dispatch: toast_dispatch,
          })
          setResultPerPage(resultsPerPage - 1)
        })
        .catch((error) => {
          HandleResponseError(error, setErrorCode, toast_dispatch)
        })
    } else {
      axios
        .post(
          getProxy(`/api/v1/kol/bookmarks/${job.id_job}/mark`),
          { bookmark: { job_id: job.id_job, status: action } },
          {
            headers: {
              Authorization: auth_state.auth_token,
            },
          }
        )
        .then((response) => {
          generalMessage({
            message: "Change status successfully",
            toast_dispatch: toast_dispatch,
          })
          setTab(action)
        })
        .catch((error) => {
          HandleResponseError(error, setErrorCode, toast_dispatch)
        })
    }
  }

  return (
    <>
      <PageTitle>BookMarks</PageTitle>
      {alert !== "" && (
        <Alert
          type="danger"
          className="my-5"
          onClose={() => {
            setAlert("")
          }}
        >
          {alert}
        </Alert>
      )}
      {detail !== -1 && <JobDetail job_id={detail} onClose={setDetail} />}
      <div className="w-full flex  flex-col lg:flex-row justify-between py-5">
        <ul className="w-full lg:w-1/2 max-w-2xl grid grid-flow-col text-center text-gray-500 bg-gray-100 rounded-lg p-1 text-xs">
          <li>
            <div
              className={`flex justify-center py-2 cursor-pointer ${
                tab === "all"
                  ? "bg-white rounded-lg shadow text-indigo-900"
                  : ""
              }`}
              onClick={() => setTab("all")}
            >
              All
            </div>
          </li>
          <li>
            <div
              className={`flex justify-center py-2 cursor-pointer ${
                tab === "care"
                  ? "bg-white rounded-lg shadow text-indigo-900"
                  : ""
              }`}
              onClick={() => setTab("care")}
            >
              Care
            </div>
          </li>
          <li>
            <div
              className={`flex justify-center py-2  cursor-pointer ${
                tab === "attention"
                  ? "bg-white rounded-lg shadow text-indigo-900"
                  : ""
              }`}
              onClick={() => setTab("attention")}
            >
              Attention
            </div>
          </li>
          <li>
            <div
              className={`flex justify-center py-2 cursor-pointer ${
                tab === "extremely"
                  ? "bg-white rounded-lg shadow text-indigo-900"
                  : ""
              }`}
              onClick={() => setTab("extremely")}
            >
              Extremely
            </div>
          </li>
        </ul>

        <ul className="flex mt-5 lg:mt-0">
          <li className="mx-2">
            <button
              type="submit"
              className="inline-flex items-center justify-center space-x-2 py-1 px-6 border border-transparent text-sm font-medium rounded text-green-600 hover:text-green-700 bg-green-200 hover:bg-green-300 transition-colors"
              onClick={() => {
                handleExportSheet()
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 30 30"
                fill="currentColor"
              >
                <path d="M 15 3 A 2 2 0 0 0 14.599609 3.0429688 L 14.597656 3.0410156 L 4.6289062 5.0351562 L 4.6269531 5.0371094 A 2 2 0 0 0 3 7 L 3 23 A 2 2 0 0 0 4.6289062 24.964844 L 14.597656 26.958984 A 2 2 0 0 0 15 27 A 2 2 0 0 0 17 25 L 17 5 A 2 2 0 0 0 15 3 z M 19 5 L 19 8 L 21 8 L 21 10 L 19 10 L 19 12 L 21 12 L 21 14 L 19 14 L 19 16 L 21 16 L 21 18 L 19 18 L 19 20 L 21 20 L 21 22 L 19 22 L 19 25 L 25 25 C 26.105 25 27 24.105 27 23 L 27 7 C 27 5.895 26.105 5 25 5 L 19 5 z M 23 8 L 24 8 C 24.552 8 25 8.448 25 9 C 25 9.552 24.552 10 24 10 L 23 10 L 23 8 z M 6.1855469 10 L 8.5878906 10 L 9.8320312 12.990234 C 9.9330313 13.234234 10.013797 13.516891 10.091797 13.837891 L 10.125 13.837891 C 10.17 13.644891 10.258531 13.351797 10.394531 12.966797 L 11.785156 10 L 13.972656 10 L 11.359375 14.955078 L 14.050781 19.998047 L 11.716797 19.998047 L 10.212891 16.740234 C 10.155891 16.625234 10.089203 16.393266 10.033203 16.072266 L 10.011719 16.072266 C 9.9777187 16.226266 9.9105937 16.458578 9.8085938 16.767578 L 8.2949219 20 L 5.9492188 20 L 8.7324219 14.994141 L 6.1855469 10 z M 23 12 L 24 12 C 24.552 12 25 12.448 25 13 C 25 13.552 24.552 14 24 14 L 23 14 L 23 12 z M 23 16 L 24 16 C 24.552 16 25 16.448 25 17 C 25 17.552 24.552 18 24 18 L 23 18 L 23 16 z M 23 20 L 24 20 C 24.552 20 25 20.448 25 21 C 25 21.552 24.552 22 24 22 L 23 22 L 23 20 z"></path>
              </svg>
              <div>Export excel</div>
            </button>
          </li>
        </ul>
      </div>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Job</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Detail</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable.map((bookmark, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Avatar
                      className="hidden mr-3 md:block"
                      src={bookmark.image_job}
                      alt="User avatar"
                    />
                    <div>
                      <p className="font-semibold">{bookmark.name_job}</p>
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <Badge type={bookmark.status_color}>{bookmark.status}</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {new Date(bookmark.created_at).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell>
                  <Link
                    to={`/jobs/${bookmark.id_job}`}
                    className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-xs text-white bg-purple-600 border border-transparent active:bg-purple-600 hover:bg-purple-700 focus:ring focus:ring-purple-300"
                  >
                    View
                  </Link>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <select
                      id="countries"
                      onChange={(event) => handleAction(event, bookmark)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option selected disabled>
                        Action
                      </option>
                      {bookmark.status !== "care" && (
                        <option value="care">Care</option>
                      )}
                      {bookmark.status !== "attention" && (
                        <option value="attention">Attention</option>
                      )}
                      {bookmark.status !== "extremely" && (
                        <option value="extremely">Extremely</option>
                      )}
                      <option value="unmark">Unmark</option>
                    </select>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
    </>
  )
}

export default Bookmark
