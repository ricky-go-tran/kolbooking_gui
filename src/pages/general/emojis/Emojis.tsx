import SectionTitle from "../../../components/admin/typography/SectionTitle"
import React, { useState, useEffect, useContext } from "react"
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
  Pagination,
  Button,
} from "@windmill/react-ui"
import { AuthContext } from "../../../contexts/AuthContext"
import { ITableEmoji } from "../../../global_variable/global_table_admin"
import axios from "axios"
import { getProxy } from "../../../utils/PathUtil"
import { fetchToITableEmoji } from "../../../utils/FetchDataTable"
import { Link } from "react-router-dom"
import { CancelIcon, LikeIcon, UnlikeIcon } from "../../../icons"
import { ErrorContext } from "../../../contexts/ErrorContext"
import { ToastContext } from "../../../contexts/ToastContext"
import { HandleResponseError } from "../../../utils/ErrorHandleUtil"

const Emojis = () => {
  const { state: auth_state } = useContext(AuthContext)
  const [pageTable, setPageTable] = useState(1)
  const [dataTable, setDataTable] = useState<ITableEmoji[]>([])
  const [totalResults, setTotalResults] = useState(0)
  const [resultsPerPage, setResultPerPage] = useState(0)
  const [tab, setTab] = useState<string>("job")
  const { setErrorCode } = useContext(ErrorContext)
  const { dispatch: toast_dispatch } = useContext(ToastContext)

  function onPageChangeTable(p: number) {
    setPageTable(p)
  }
  useEffect(() => {
    const config = {
      headers: {
        Authorization: auth_state.auth_token,
      },
      params: {
        page: {
          number: pageTable,
        },
      },
    }
    let url = "/api/v1/emoji_jobs"
    if (tab === "profile") {
      url = "/api/v1/emoji_profiles"
    }
    axios
      .get(getProxy(url), config)
      .then((response) => {
        const handle_data = fetchToITableEmoji(response.data.data)
        const meta = response.data.meta
        setResultPerPage(meta.items)
        setTotalResults(meta.count)
        setDataTable(handle_data)
      })
      .catch((error) => {
        HandleResponseError(error, setErrorCode, toast_dispatch)
      })
  }, [pageTable, tab, resultsPerPage])

  const like = (emoji: ITableEmoji) => {
    const config = {
      headers: {
        Authorization: auth_state.auth_token,
      },
    }
    let url = `/api/v1/emoji_jobs/${emoji.id_object}/like`
    if (emoji.type_object === "Profile") {
      url = `/api/v1/emoji_profiles/${emoji.id_object}/like`
    }
    axios
      .post(getProxy(url), {}, config)
      .then(() => {
        setDataTable(
          dataTable.map((item) => {
            if (item.id === emoji.id) {
              item.status = "like"
              item.status_color = "primary"
            }
            return item
          })
        )
      })
      .catch((error) => {
        HandleResponseError(error, setErrorCode, toast_dispatch)
      })
  }

  const unlike = (emoji: ITableEmoji) => {
    const config = {
      headers: {
        Authorization: auth_state.auth_token,
      },
    }
    let url = `/api/v1/emoji_jobs/${emoji.id_object}/unlike`
    if (emoji.type_object === "Profile") {
      url = `/api/v1/emoji_profiles/${emoji.id_object}/unlike`
    }
    axios
      .post(getProxy(url), {}, config)
      .then(() => {
        setDataTable(
          dataTable.map((item) => {
            if (item.id === emoji.id) {
              item.status = "unlike"
              item.status_color = "danger"
            }
            return item
          })
        )
      })
      .catch((error) => {
        HandleResponseError(error, setErrorCode, toast_dispatch)
      })
  }

  const cancle = (emoji: ITableEmoji) => {
    const config = {
      headers: {
        Authorization: auth_state.auth_token,
      },
    }
    let url = `/api/v1/emoji_jobs/${emoji.id_object}/`
    if (emoji.type_object === "Profile") {
      url = `/api/v1/emoji_profiles/${emoji.id_object}/`
    }
    axios
      .delete(getProxy(url), config)
      .then(() => {
        setResultPerPage(resultsPerPage - 1)
      })
      .catch((error) => {
        HandleResponseError(error, setErrorCode, toast_dispatch)
      })
  }

  return (
    <>
      <SectionTitle>Interaction</SectionTitle>
      <div className="w-full flex justify-between py-5">
        <ul className="w-1/2 max-w-2xl grid grid-flow-col text-center text-gray-500 bg-gray-100 rounded-lg p-1 text-xs">
          <li>
            <div
              className={`flex justify-center py-2 cursor-pointer ${
                tab === "job"
                  ? "bg-white rounded-lg shadow text-indigo-900"
                  : ""
              }`}
              onClick={() => setTab("job")}
            >
              Jobs
            </div>
          </li>
          <li>
            <div
              className={`flex justify-center py-2 cursor-pointer ${
                tab === "profile"
                  ? "bg-white rounded-lg shadow text-indigo-900"
                  : ""
              }`}
              onClick={() => setTab("profile")}
            >
              Profile
            </div>
          </li>
        </ul>
      </div>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Emoji</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Detail</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable.map((emoji, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Avatar
                      className="hidden mr-3 md:block"
                      src={emoji.avatar_object}
                      alt="Job image"
                    />
                    <div>
                      <p className="font-semibold">{emoji.title_object}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge type={emoji.type_object_color}>
                    {emoji.type_object}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge type={emoji.status_color}>{emoji.status}</Badge>
                </TableCell>
                <TableCell>
                  {emoji.type_object === "Job" && (
                    <Link
                      to={`/jobs/${emoji.id_object}`}
                      className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-xs text-white bg-purple-600 border border-transparent active:bg-purple-600 hover:bg-purple-700 focus:ring focus:ring-purple-300"
                    >
                      View
                    </Link>
                  )}
                  {emoji.type_object === "Profile" && (
                    <Link
                      to={`/kols/${emoji.id_object}`}
                      className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-3 py-1 rounded-md text-xs text-white bg-purple-600 border border-transparent active:bg-purple-600 hover:bg-purple-700 focus:ring focus:ring-purple-300"
                    >
                      View
                    </Link>
                  )}
                </TableCell>
                <TableCell>
                  {emoji.status === "like" && (
                    <Button
                      layout="link"
                      size="small"
                      aria-label="Edit"
                      onClick={() => unlike(emoji)}
                    >
                      <UnlikeIcon />
                    </Button>
                  )}

                  {emoji.status === "unlike" && (
                    <Button
                      layout="link"
                      size="small"
                      aria-label="Edit"
                      onClick={() => like(emoji)}
                    >
                      <LikeIcon />
                    </Button>
                  )}
                  <Button
                    layout="link"
                    size="small"
                    aria-label="Edit"
                    onClick={() => cancle(emoji)}
                  >
                    <CancelIcon />
                  </Button>
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

export default Emojis
