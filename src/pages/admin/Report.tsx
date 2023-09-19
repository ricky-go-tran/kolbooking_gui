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
import { EditIcon, TrashIcon, CancelIcon, SuccessIcon, InformationIcon } from '../../icons';
import { ITableReport } from '../../utils/global_table_admin';
import { getProxy } from '../../utils/PathUtil';
import axios from 'axios';
import { fetchToITableReport } from '../../utils/FetchData';

const Report = () => {
  const { state: auth_state, dispatch: auth_dispatch } = useContext(AuthContext);
  const [pageTable, setPageTable] = useState(1)
  const [dataTable, setDataTable] = useState<ITableReport[]>([])
  const [data, setData] = useState<ITableReport[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const resultsPerPage = 10;

  useEffect(() => {
    axios.get(getProxy('/api/v1/admin/reports'), {
      headers: {
        Authorization: auth_state.auth_token,
      },
    }).then((response) => {
      let handle_data = fetchToITableReport(response.data.data);
      setData(handle_data)
      setTotalResults(handle_data.length)
      setDataTable(handle_data.slice((pageTable - 1) * resultsPerPage, pageTable * resultsPerPage))

    }).catch((error) => {
      console.log(error)
    })

  }, [])

  function onPageChangeTable(p: number) {
    setPageTable(p)
  }

  useEffect(() => {
    setDataTable(data.slice((pageTable - 1) * resultsPerPage, pageTable * resultsPerPage))
  }, [pageTable])

  return (
    <>
      <PageTitle>Report Management</PageTitle>
      <SectionTitle>Reports Table</SectionTitle>
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
                    <Avatar className="hidden mr-3 md:block" src={report.avatar_reporter} alt="User avatar" />
                    <div>
                      <p className="font-semibold">{report.fullname_reporter}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{report.email_reporter}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge type={report.status_color}>{report.status}</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{new Date(report.created_at).toLocaleDateString()}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="small" aria-label="Edit">
                      <InformationIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="small" aria-label="Edit">
                      <SuccessIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="small" aria-label="Delete">
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
  );
};

export default Report;
