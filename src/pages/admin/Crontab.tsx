import React, { useState, useEffect, useContext } from 'react';

import ChartCard from '../../components/admin/chart/ChartCard';
import { Chart, registerables } from 'chart.js';
import { Doughnut, Line, Chart as ChartJS } from 'react-chartjs-2';
import ChartLegend from '../../components/admin/chart/CardLegend';
import PageTitle from '../../components/admin/typography/PageTitle';
import SectionTitle from '../../components/admin/typography/SectionTitle';
import response from "../../utils/global_table_admin";
import { ITableData } from '../../utils/global_table_admin';
import axios from 'axios';
import { getProxy } from '../../utils/PathUtil';
import { AuthContext } from '../../contexts/AuthContext';
import { fetchDataForLinechartCrontab, defaultDataForLinechartCrontab } from '../../utils/ChartUtil';
import {
  TableBody,
  TableContainer,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  TableFooter,
  Avatar,
  Badge,
  Pagination,
} from '@windmill/react-ui';
import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from '../../utils/global_charts_admin';



Chart.register(...registerables);

const Crontab = () => {
  const { state: auth_state } = useContext(AuthContext);
  const [dataChart, setDataChart] = useState(defaultDataForLinechartCrontab)
  const [pageTable1, setPageTable1] = useState(1)
  const [pageTable2, setPageTable2] = useState(1)

  const [dataTable1, setDataTable1] = useState<ITableData[]>([])
  const [dataTable2, setDataTable2] = useState<ITableData[]>([])

  const resultsPerPage = 10;
  const totalResults = response.length;

  function onPageChangeTable1(p: number) {
    setPageTable1(p)
  }

  function onPageChangeTable2(p: number) {
    setPageTable2(p)
  }

  useEffect(() => {
    axios.get(getProxy('/api/v1/admin/sidekiq_views'), {
      headers: {
        Authorization: auth_state.auth_token,
      },
    }).then((response) => {
      let data = response.data;
      console.log(data)
      let handle_data = fetchDataForLinechartCrontab(data.labeled, data.proccessed, data.failed)
      setDataChart(handle_data)
    }).catch((error) => {
      console.log(error)
    })
  }, [])

  useEffect(() => {
    setDataTable1(response.slice((pageTable1 - 1) * resultsPerPage, pageTable1 * resultsPerPage))
  }, [pageTable1])

  useEffect(() => {
    setDataTable2(response.slice((pageTable2 - 1) * resultsPerPage, pageTable2 * resultsPerPage))
  }, [pageTable2])

  return (
    <>
      <PageTitle>Background Jobs</PageTitle>
      <div className="grid gap-6 mb-8 md:grid-cols-1">
        <ChartCard title="Processed & Failed Jobs">
          <Line {...dataChart} />
          <ChartLegend legends={lineLegends} />
        </ChartCard>
      </div>

      {/* <SectionTitle>Processed Table</SectionTitle>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Client</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable1.map((user, i) => (
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
                  <span className="text-sm">$ {user.amount}</span>
                </TableCell>
                <TableCell>
                  <Badge type={user.status}>{user.status}</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{new Date(user.date).toLocaleDateString()}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable1}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>

      <SectionTitle>Failed Table</SectionTitle>
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Client</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable2.map((user, i) => (
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
                  <span className="text-sm">$ {user.amount}</span>
                </TableCell>
                <TableCell>
                  <Badge type={user.status}>{user.status}</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{new Date(user.date).toLocaleDateString()}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable2}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer> */}

    </>
  )
}

export default Crontab;
