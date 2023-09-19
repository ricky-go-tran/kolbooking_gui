import React, { useState, useEffect } from 'react';
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
import { ITableData } from '../../utils/global_table_admin';
import response from "../../utils/global_table_admin";

const User = () => {
  const [pageTable, setPageTable] = useState(1)
  const [dataTable, setDataTable] = useState<ITableData[]>([])

  const resultsPerPage = 10;
  const totalResults = response.length;

  function onPageChangeTable(p: number) {
    setPageTable(p)
  }

  useEffect(() => {
    setDataTable(response.slice((pageTable - 1) * resultsPerPage, pageTable * resultsPerPage))
  }, [pageTable])

  return (
    <>
      <PageTitle>Job Managements</PageTitle>
      <SectionTitle>Jobs Table</SectionTitle>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Client</TableCell>
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
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{user.job}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge type={user.status}>{user.status}</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{new Date(user.date).toLocaleDateString()}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="small" aria-label="Edit">
                      <UnlockIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="small" aria-label="Edit">
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

export default User;
