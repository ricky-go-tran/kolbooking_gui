import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { SearchAdminContext } from "../../contexts/SearchAdminContext"
import {
  IPaymentJob,
  ITableJob,
} from "../../global_variable/global_table_admin"
import { getProxy } from "../../utils/PathUtil"
import axios from "axios"
import {
  fetchToIPaymentJob,
  fetchToISheetJob,
  fetchToITableJob,
} from "../../utils/FetchDataTable"
import PageTitle from "../../components/admin/typography/PageTitle"
import {
  Avatar,
  Badge,
  Button,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  TableRow,
} from "@windmill/react-ui"
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer"
import InvoicePdf from "./InvoicePdf"
import { useNavigate } from "react-router-dom"
import { ErrorContext } from "../../contexts/ErrorContext"
import { ToastContext } from "../../contexts/ToastContext"
import { HandleResponseError } from "../../utils/ErrorHandleUtil"

const Invoices = () => {
  const { state: auth_state } = useContext(AuthContext)
  const { search } = useContext(SearchAdminContext)
  const [pageTable, setPageTable] = useState(1)
  const [dataTable, setDataTable] = useState<IPaymentJob[]>([])
  const [resultsPerPage, setResultPerPage] = useState(0)
  const [totalResults, setTotalResults] = useState(0)
  const [tab, setTab] = useState<string>("payment")
  const navigate = useNavigate()
  const { state: toast_state, dispatch: toast_dispatch } =
    useContext(ToastContext)
  const { setErrorCode } = useContext(ErrorContext)

  function onPageChange(p: number) {
    setPageTable(p)
  }
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
      .get(getProxy("/api/v1/base/invoices"), config)
      .then((response) => {
        console.log(response.data.data)
        let handle_data = fetchToIPaymentJob(response.data.data)
        let meta = response.data.meta
        setResultPerPage(meta.items)
        setTotalResults(meta.count)
        setDataTable(handle_data)
      })
      .catch((error) => {
        HandleResponseError(error, setErrorCode, toast_dispatch)
      })
  }, [pageTable, search, tab])
  return (
    <>
      <PageTitle>Jobs</PageTitle>
      <div className="w-full flex justify-between py-5">
        <ul className="w-1/2 max-w-2xl grid grid-flow-col text-center text-gray-500 bg-gray-100 rounded-lg p-1 text-xs">
          <li>
            <div
              className={`flex justify-center py-2 cursor-pointer ${
                tab === "payment"
                  ? "bg-white rounded-lg shadow text-indigo-900"
                  : ""
              }`}
              onClick={() => setTab("payment")}
            >
              Payment
            </div>
          </li>
          <li>
            <div
              className={`flex justify-center py-2 cursor-pointer ${
                tab === "finish"
                  ? "bg-white rounded-lg shadow text-indigo-900"
                  : ""
              }`}
              onClick={() => setTab("finish")}
            >
              Finish
            </div>
          </li>
        </ul>
      </div>
      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Job</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Pdf</TableCell>
              <TableCell>Payment</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable.map((job, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Avatar
                      className="hidden mr-3 md:block"
                      src={job.job_image}
                      alt="Job image"
                    />
                    <div>
                      <p className="font-semibold">{job.job_title}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge type={job.status_color}>{job.status}</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {new Date(job.create_at).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell>
                  <PDFDownloadLink
                    document={<InvoicePdf job={job} />}
                    fileName={`Invoice-${Date.now()}`}
                  >
                    <Button className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-red-600 border border-transparent active:bg-red-600 hover:bg-red-700 focus:ring focus:ring-red-300">
                      Export Pdf
                    </Button>
                  </PDFDownloadLink>
                </TableCell>
                <TableCell>
                  {job.status === "payment" && (
                    <a href={`/base/payment/${job.id}`}>Payment</a>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            label="Table navigation"
            onChange={onPageChange}
          />
        </TableFooter>
      </TableContainer>
    </>
  )
}

export default Invoices
