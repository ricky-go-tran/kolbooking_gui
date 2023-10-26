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
  Alert,
} from "@windmill/react-ui"
import PageTitle from "../../components/admin/typography/PageTitle"
import SectionTitle from "../../components/admin/typography/SectionTitle"
import { CancelIcon, SuccessIcon, InformationIcon, PlayIcon } from "../../icons"
import {
  ISheetReport,
  ITableReport,
} from "../../global_variable/global_table_admin"
import { getProxy } from "../../utils/PathUtil"
import axios from "axios"
import {
  fetchToISheetReport,
  fetchToITableReport,
} from "../../utils/FetchDataTable"
import ReportDetail from "../../components/admin/modal/report/ReportDetail"
import { utils, writeFile } from "xlsx"
import { SearchAdminContext } from "../../contexts/SearchAdminContext"
import { ToastContext } from "../../contexts/ToastContext"
import { ErrorContext } from "../../contexts/ErrorContext"
import { HandleResponseError } from "../../utils/ErrorHandleUtil"

const Report = () => {
  const { state: auth_state } = useContext(AuthContext)
  const [pageTable, setPageTable] = useState(1)
  const [dataTable, setDataTable] = useState<ITableReport[]>([])
  const [totalResults, setTotalResults] = useState(0)
  const [alert, setAlert] = useState("")
  const [resultsPerPage, setResultPerPage] = useState(0)
  const [detail, setDetail] = useState<number | string>(-1)
  const [tab, setTab] = useState<string>("all")
  const [sheetData, setSheetData] = useState<ISheetReport[]>([])
  const { search } = useContext(SearchAdminContext)
  const { dispatch: toast_dispatch } = useContext(ToastContext)
  const { setErrorCode } = useContext(ErrorContext)

  useEffect(() => {
    const config = {
      headers: {
        Authorization: auth_state.auth_token,
      },
      params: {
        tab: tab,
        search: search,
        page: {
          number: pageTable,
        },
      },
    }
    axios
      .get(getProxy("/api/v1/admin/reports"), config)
      .then((response) => {
        const handle_data = fetchToITableReport(response.data.data)
        const meta = response.data.meta
        const sheet = fetchToISheetReport(response.data.data)
        setResultPerPage(meta.items)
        setTotalResults(meta.count)
        setDataTable(handle_data)
        setSheetData(sheet)
      })
      .catch((error) => {
        HandleResponseError(error, setErrorCode, toast_dispatch)
      })
  }, [pageTable, tab, search])

  function onPageChangeTable(p: number) {
    setPageTable(p)
  }

  function proccess(report: ITableReport) {
    if (report.status !== "pending") {
      setAlert("Report must be in pending status")
    } else {
      axios
        .put(
          getProxy(`/api/v1/admin/reports/${report.id}/proccess`),
          {},
          {
            headers: {
              Authorization: auth_state.auth_token,
            },
          }
        )
        .then(() => {
          const handle_data: ITableReport[] = dataTable.map((item) => {
            if (item.id === report.id) {
              const rs: ITableReport = {
                ...item,
                status: "proccess",
                status_color: "primary",
              }
              return rs
            } else {
              return item
            }
          })
          setDataTable(handle_data)
        })
        .catch((error) => {
          setAlert("Proccess is failed")
          HandleResponseError(error, setErrorCode, toast_dispatch)
        })
    }
  }

  function sovled(report: ITableReport) {
    if (report.status !== "proccess") {
      setAlert("Report must be in process status")
    } else {
      axios
        .put(
          getProxy(`/api/v1/admin/reports/${report.id}/sovled`),
          {},
          {
            headers: {
              Authorization: auth_state.auth_token,
            },
          }
        )
        .then(() => {
          const handle_data: ITableReport[] = dataTable.map((item) => {
            if (item.id === report.id) {
              const rs: ITableReport = {
                ...item,
                status: "sovled",
                status_color: "success",
              }
              return rs
            } else {
              return item
            }
          })
          setDataTable(handle_data)
        })
        .catch((error) => {
          setAlert("Proccess is failed")
          HandleResponseError(error, setErrorCode, toast_dispatch)
        })
    }
  }

  function rejected(report: ITableReport) {
    if (report.status !== "proccess") {
      setAlert("Report must be in process status")
    } else {
      axios
        .put(
          getProxy(`/api/v1/admin/reports/${report.id}/rejected`),
          {},
          {
            headers: {
              Authorization: auth_state.auth_token,
            },
          }
        )
        .then(() => {
          const handle_data: ITableReport[] = dataTable.map((item) => {
            if (item.id === report.id) {
              const rs: ITableReport = {
                ...item,
                status: "rejected",
                status_color: "danger",
              }
              return rs
            } else {
              return item
            }
          })
          setDataTable(handle_data)
        })
        .catch((error) => {
          setAlert("Proccess is failed")
          HandleResponseError(error, setErrorCode, toast_dispatch)
        })
    }
  }
  function viewReport(report: string | number) {
    setDetail(report)
  }

  const handleExportSheet = () => {
    const heading = [["Id", "Title", "Description", "Status", "Created at"]]
    const wb = utils.book_new()
    const ws = utils.json_to_sheet([])
    utils.sheet_add_aoa(ws, heading)
    utils.sheet_add_json(ws, sheetData, { origin: "A2", skipHeader: true })
    utils.book_append_sheet(wb, ws, `Report with ${tab}`)
    writeFile(wb, `Report-${Date.now()}.xlsx`)
  }

  return (
    <>
      <PageTitle>Report Management</PageTitle>
      <SectionTitle>Reports Table</SectionTitle>
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
      <div className="w-full flex flex-col lg:flex-row justify-between py-5">
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
                tab === "pending"
                  ? "bg-white rounded-lg shadow text-indigo-900"
                  : ""
              }`}
              onClick={() => setTab("pending")}
            >
              Pending
            </div>
          </li>
          <li>
            <div
              className={`flex justify-center py-2  cursor-pointer ${
                tab === "proccessing"
                  ? "bg-white rounded-lg shadow text-indigo-900"
                  : ""
              }`}
              onClick={() => setTab("proccessing")}
            >
              Proccessing
            </div>
          </li>
          <li>
            <div
              className={`flex justify-center py-2 cursor-pointer ${
                tab === "resovled"
                  ? "bg-white rounded-lg shadow text-indigo-900"
                  : ""
              }`}
              onClick={() => setTab("resovled")}
            >
              Resovled
            </div>
          </li>
          <li>
            <div
              className={`flex justify-center py-2  cursor-pointer ${
                tab === "rejected"
                  ? "bg-white rounded-lg shadow text-indigo-900"
                  : ""
              }`}
              onClick={() => setTab("rejected")}
            >
              Rejected
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
      {detail !== -1 && <ReportDetail report_id={detail} onClose={setDetail} />}
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Reporter</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable.map((report, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Avatar
                      className="hidden mr-3 md:block"
                      src={report.avatar_reporter}
                      alt="User avatar"
                    />
                    <div>
                      <p className="font-semibold">
                        {report.fullname_reporter}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {report.email_reporter}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge type={report.status_color}>{report.status}</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {new Date(report.created_at).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button
                      layout="link"
                      size="small"
                      aria-label="Edit"
                      onClick={() => {
                        viewReport(report.id)
                      }}
                    >
                      <InformationIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button
                      layout="link"
                      size="small"
                      aria-label="Edit"
                      onClick={() => {
                        proccess(report)
                      }}
                    >
                      <PlayIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button
                      layout="link"
                      size="small"
                      aria-label="Edit"
                      onClick={() => {
                        sovled(report)
                      }}
                    >
                      <SuccessIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button
                      layout="link"
                      size="small"
                      aria-label="Delete"
                      onClick={() => {
                        rejected(report)
                      }}
                    >
                      <CancelIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
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

export default Report
