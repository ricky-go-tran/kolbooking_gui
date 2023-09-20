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
import { LockIcon } from '../../icons';
import { ITableJob } from '../../utils/global_table_admin';
import axios from 'axios';
import { getProxy } from '../../utils/PathUtil';
import { fetchToITableJob } from '../../utils/FetchData';
import { Alert } from '@windmill/react-ui'


const Bookmark = () => {
  const { state: auth_state } = useContext(AuthContext);
  const [data, setData] = useState<ITableJob[]>([]);
  const [pageTable, setPageTable] = useState(1)
  const [dataTable, setDataTable] = useState<ITableJob[]>([])
  const [totalResults, setTotalResults] = useState(0);
  const [alert, setAlert] = useState("");


  const resultsPerPage = 10;





  function onPageChangeTable(p: number) {
    setPageTable(p)
  }

  function lock(job: ITableJob) {
    if (job.status === 'cancle') {
      setAlert("Job is already unlocked")
    } else {
      axios.put(getProxy(`/api/v1/admin/jobs/${job.id}/cancle`), {}, {
        headers: {
          Authorization: auth_state.auth_token,
        },
      }).then((response) => {
        let handle_data: ITableJob[] = data.map((item) => {
          if (item.id === job.id) {
            let rs: ITableJob = {
              ...item,
              status: 'cancle',
              status_color: 'danger'
            }
            return rs
          } else {
            return item
          }
        })
        setData(handle_data)
      }).catch((error) => {
        console.log(error)
      })
    }
  }

  useEffect(() => {
    setDataTable(data.slice((pageTable - 1) * resultsPerPage, pageTable * resultsPerPage))
  }, [pageTable, data])

  return (
    <>
      <PageTitle>BookMarks</PageTitle>
      {alert !== "" && <Alert type="danger" className="my-5" onClose={() => { setAlert("") }}>
        {alert}
      </Alert>}
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Owner</TableCell>
              <TableCell>KOL</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable.map((job, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Avatar className="hidden mr-3 md:block" src={job.avatar_owner} alt="User avatar" />
                    <div>
                      <p className="font-semibold">{job.fullname_owner}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{job.email_owner}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Avatar className="hidden mr-3 md:block" src={job.avatar_kol} alt="User avatar" />
                    <div>
                      <p className="font-semibold">{job.fullname_kol}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{job.email_kol}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge type={job.status_color}>{job.status}</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{new Date(job.create_at).toLocaleDateString()}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="small" aria-label="Edit" onClick={(e) => { lock(job) }}>
                      <LockIcon className="w-5 h-5" aria-hidden="true" />
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
  );
}

export default Bookmark;
