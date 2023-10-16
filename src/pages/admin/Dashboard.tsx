import React, { useState, useEffect, useContext } from "react"

import InfoCard from "../../components/admin/cart/InfoCart"
import ChartCard from "../../components/admin/chart/ChartCard"
import { Doughnut, Line } from "react-chartjs-2"
import ChartLegend from "../../components/admin/chart/CardLegend"
import PageTitle from "../../components/admin/typography/PageTitle"
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from "../../icons"
import RoundIcon from "../../components/admin/RoundIcon"
import response from "../../global_variable/global_table_admin"
import { ITableData } from "../../global_variable/global_table_admin"
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
} from "@windmill/react-ui"
import { Chart, registerables } from "chart.js"
import {
  lineDashboardlLegends,
  lineStatisticalLegends,
} from "../../global_variable/global_charts_admin"
Chart.register(...registerables)

import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from "../../global_variable/global_charts_admin"
import axios from "axios"
import { getProxy } from "../../utils/PathUtil"
import { AuthContext } from "../../contexts/AuthContext"
import {
  defaultDataForLinechartCrontab,
  fetchDataForLinechartDashboard,
} from "../../utils/ChartUtil"
import { getSumOfArray } from "../../utils/NumberUtil"
import { ToastContext } from "../../contexts/ToastContext"
import { ErrorContext } from "../../contexts/ErrorContext"
import { HandleResponseError } from "../../utils/ErrorHandleUtil"

function Dashboard() {
  const [tab, setTab] = useState<string>("month")
  const { state: auth_state, dispatch: auth_dispatch } = useContext(AuthContext)
  const [dataCard, setDataCard] = useState([0, 0, 0, 0])
  const [dataChart, setDataChart] = useState(defaultDataForLinechartCrontab)
  const { state: toast_state, dispatch: toast_dispatch } =
    useContext(ToastContext)
  const { setErrorCode } = useContext(ErrorContext)

  useEffect(() => {
    const config = {
      headers: {
        Authorization: auth_state.auth_token,
      },
      params: {
        tab: tab,
      },
    }
    axios
      .get(getProxy("/api/v1/admin/dashboard"), config)
      .then((res) => {
        const data = res.data.data
        setDataCard([
          getSumOfArray(data.total_job),
          getSumOfArray(data.total_base_user),
          getSumOfArray(data.total_kol),
          getSumOfArray(data.total_report),
        ])
        setDataChart(
          fetchDataForLinechartDashboard(
            data.label,
            data.total_job,
            data.total_base_user,
            data.total_kol,
            data.total_report
          )
        )
      })
      .catch((error) => {
        HandleResponseError(error, setErrorCode, toast_dispatch)
      })
  }, [tab])

  return (
    <>
      <div className="w-full flex justify-between py-6">
        <h1 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">
          Dashboard
        </h1>
        <ul className="w-1/2 max-w-2xl grid grid-flow-col text-center text-gray-500 bg-gray-100 rounded-lg p-1 text-xs">
          <li>
            <div
              className={`flex justify-center py-2 cursor-pointer ${
                tab === "month"
                  ? "bg-white rounded-lg shadow text-indigo-900"
                  : ""
              }`}
              onClick={() => setTab("month")}
            >
              Month
            </div>
          </li>
          <li>
            <div
              className={`flex justify-center py-2 cursor-pointer ${
                tab === "half_year"
                  ? "bg-white rounded-lg shadow text-indigo-900"
                  : ""
              }`}
              onClick={() => setTab("half_year")}
            >
              6 Month
            </div>
          </li>
          <li>
            <div
              className={`flex justify-center py-2  cursor-pointer ${
                tab === "year"
                  ? "bg-white rounded-lg shadow text-indigo-900"
                  : ""
              }`}
              onClick={() => setTab("year")}
            >
              Year
            </div>
          </li>
        </ul>
      </div>

      {/* <!-- Cards --> */}
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total Jobs" value={`${dataCard[0]}`}>
          {/* @ts-ignore */}
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Total Base User" value={`${dataCard[1]}`}>
          {/* @ts-ignore */}
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>
        <InfoCard title="Total Kol" value={`${dataCard[2]}`}>
          {/* @ts-ignore */}
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Total Report" value={`${dataCard[3]}`}>
          {/* @ts-ignore */}
          <RoundIcon
            icon={ChatIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>
      <div className="grid gap-6 mb-8 md:grid-cols-1">
        <ChartCard title="System chart">
          <Line {...dataChart} />
        </ChartCard>
      </div>
    </>
  )
}

export default Dashboard
