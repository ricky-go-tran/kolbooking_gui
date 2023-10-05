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
import { EditIcon, FollowIcon, LockIcon } from "../../icons"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../contexts/AuthContext"
import { ITableFollow } from "../../global_variable/global_table_admin"
import axios from "axios"
import { getProxy } from "../../utils/PathUtil"
import { fetchToITableFollow } from "../../utils/FetchDataTable"
import { useNavigate } from "react-router-dom"
import { ToastContext } from "../../contexts/ToastContext"
import { generalMessage } from "../../utils/ToastUtil"

const Follow = () => {
  const { state: auth_state } = useContext(AuthContext)
  const [resultsPerPage, setResultPerPage] = useState(0)
  const [totalResults, setTotalResults] = useState(0)
  const [dataTable, setDataTable] = useState<ITableFollow[]>([])
  const [pageTable, setPageTable] = useState(1)
  const navigate = useNavigate()
  const { dispatch: toast_dispatch } = useContext(ToastContext)

  function onPageChange(p: number) {
    setPageTable(p)
  }

  useEffect(() => {
    const config = {
      headers: {
        Authorization: auth_state.auth_token,
      },
    }
    axios
      .get(getProxy("/api/v1/base/followers"), config)
      .then((res) => {
        let handle_data = fetchToITableFollow(res.data.data)
        let meta = res.data.meta
        setResultPerPage(meta.items)
        setTotalResults(meta.count)
        setDataTable(handle_data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [pageTable, resultsPerPage])

  const unfollow = (followed: ITableFollow) => {
    const config = {
      headers: {
        Authorization: auth_state.auth_token,
      },
    }
    axios
      .delete(
        getProxy(`/api/v1/base/followers/${followed.id}/unfollow`),
        config
      )
      .then((res) => {
        setResultPerPage(resultsPerPage - 1)
        generalMessage({
          message: `Unfollow ${followed.fullname_followed} successfully`,
          toast_dispatch: toast_dispatch,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <PageTitle>Follows</PageTitle>
      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Followed</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>View</TableCell>
              <TableCell>Unfollow</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable.map((follower, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Avatar
                      className="hidden mr-3 md:block"
                      src={follower.avatar_followed}
                      alt="Job image"
                    />
                    <div>
                      <p className="font-semibold">
                        {follower.fullname_followed}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {new Date(follower.create_at).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      navigate(`/kols/${follower.id_followed}`)
                    }}
                  >
                    View
                  </Button>
                </TableCell>
                <TableCell>
                  <button
                    className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-red-400 border border-transparent active:bg-red-400 hover:bg-red-500 focus:ring focus:ring-red-200"
                    onClick={() => {
                      unfollow(follower)
                    }}
                  >
                    Unfollow
                  </button>
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
export default Follow
