import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
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
} from '@windmill/react-ui';
import PageTitle from '../../components/admin/typography/PageTitle';
import SectionTitle from '../../components/admin/typography/SectionTitle';
import { LockIcon, UnlockIcon } from '../../icons';
import { ITabelUser } from '../../utils/global_table_admin';
import { fetchToITableUser } from '../../utils/FetchData';
import { getProxy } from '../../utils/PathUtil';
import axios from 'axios';
import { Alert } from '@windmill/react-ui'

const User = () => {
  const { state: auth_state } = useContext(AuthContext);
  const [pageTable, setPageTable] = useState(1)
  const [dataTable, setDataTable] = useState<ITabelUser[]>([])
  const [alert, setAlert] = useState("");

  const [totalResults, setTotalResults] = useState(0);
  const [resultsPerPage, setResultPerPage] = useState(0)

  useEffect(() => {
    axios.get(getProxy('/api/v1/admin/users'), {
      headers: {
        Authorization: auth_state.auth_token,
      },
    }).then((response) => {
      let handle_data = fetchToITableUser(response.data.data)
      let meta = response.data.meta;
      setResultPerPage(meta.items)
      setTotalResults(meta.count);
      setDataTable(handle_data)
    }).catch((error) => {
      console.log(error)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function onPageChangeTable(p: number) {
    setPageTable(p)
  }

  function unlock(user: ITabelUser) {
    if (user.status !== 'lock') {
      setAlert("User is already unlocked")
    } else {
      axios.put(getProxy(`/api/v1/admin/users/${user.id}/unlock`), {}, {
        headers: {
          Authorization: auth_state.auth_token,
        },
      }).then((response) => {
        let handle_data: ITabelUser[] = dataTable.map((item) => {
          if (item.id === user.id) {
            let rs: ITabelUser = {
              ...item,
              status: 'valid',
              status_color: 'success'
            }
            return rs
          } else {
            return item
          }
        })
        setDataTable(handle_data)
      }).catch((error) => { setAlert("Unlock is failed") })
    }
  }

  function lock(user: ITabelUser) {
    if (user.status === 'lock') {
      setAlert("User is already unlocked")
    } else {
      axios.put(getProxy(`/api/v1/admin/users/${user.id}/lock`), {}, {
        headers: {
          Authorization: auth_state.auth_token,
        },
      }).then((response) => {
        let handle_data: ITabelUser[] = dataTable.map((item) => {
          if (item.id === user.id) {
            let rs: ITabelUser = {
              ...item,
              status: 'lock',
              status_color: 'danger'
            }
            return rs
          } else {
            return item
          }
        })
        setDataTable(handle_data)
      }).catch((error) => {
        console.log(error)
      })
    }
  }

  useEffect(() => {
    axios.get(getProxy('/api/v1/admin/users'), {
      headers: {
        Authorization: auth_state.auth_token,
      },
      params: {
        page: {
          number: pageTable
        }
      }
    }).then((response) => {
      let handle_data = fetchToITableUser(response.data.data)
      let meta = response.data.meta;
      setResultPerPage(meta.items);
      setTotalResults(meta.count);
      setDataTable(handle_data);
    }).catch((error) => {
      console.log(error)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageTable])

  return (
    <>
      <PageTitle>Job Managements</PageTitle>
      <SectionTitle>Jobs Table</SectionTitle>
      {alert !== "" && <Alert type="danger" className="my-5" onClose={() => { setAlert("") }}>
        {alert}
      </Alert>}
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>User</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable.map((user, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Avatar className="hidden mr-3 md:block" src={user.avatar} alt="User avatar" />
                    <div>
                      <p className="font-semibold">{user.fullname}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{user.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge type={user.role_color}>{user.role}</Badge>
                </TableCell>
                <TableCell>
                  <Badge type={user.status_color}>{user.status}</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{new Date(user.birthday).toLocaleDateString()}</span>
                </TableCell>
                <TableCell>
                  {user.status !== 'invalid' && <div className="flex items-center space-x-4">
                    <Button layout="link" size="small" aria-label="Edit" onClick={(e) => { unlock(user) }}>
                      <UnlockIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="small" aria-label="Edit" onClick={() => { lock(user) }}>
                      <LockIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </div>}
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
  );
}

export default User;
