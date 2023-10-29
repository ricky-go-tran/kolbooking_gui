import React, { useState, useEffect, useContext } from "react"

import InfoCard from "../../components/admin/cart/InfoCart"
import ChartCard from "../../components/admin/chart/ChartCard"
import { Line } from "react-chartjs-2"

import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from "../../icons"
import { Button } from "@windmill/react-ui"
import { Chart, registerables } from "chart.js"
Chart.register(...registerables)

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
import { getCurrentDateFormatted } from "../../utils/DateUtil"
import RoundIcon from "../../components/admin/RoundIcon"

function Dashboard() {
  const [tab, setTab] = useState<string>("month")
  const { state: auth_state } = useContext(AuthContext)
  const [dataCard, setDataCard] = useState([0, 0, 0, 0])
  const [dataChart, setDataChart] = useState(defaultDataForLinechartCrontab)
  const { dispatch: toast_dispatch } = useContext(ToastContext)
  const { setErrorCode } = useContext(ErrorContext)
  const [month, setMonth] = useState(getCurrentDateFormatted())
  const [year, setYear] = useState<number>(new Date().getFullYear())
  const [submit, setSubmit] = useState<string>("")
  type TParam = {
    tab: string
    filter: any | undefined
  }

  useEffect(() => {
    let params: TParam = {
      tab: tab,
      filter: null,
    }
    if (tab === "year") {
      params = {
        tab: tab,
        filter: year,
      }
    }
    if (tab === "month") {
      params = {
        tab: tab,
        filter: month,
      }
    }
    const config = {
      headers: {
        Authorization: auth_state.auth_token,
      },
      params: params,
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
  }, [tab, submit])

  return (
    <>
      <div className="w-full flex flex-col lg:flex-row justify-between py-6">
        <h1 className="text-xl lg:text-2xl font-semibold text-gray-700 dark:text-gray-200">
          Dashboard
        </h1>
        <div className="w-full lg:w-3/5 flex flex-col lg:flex-row justify-between">
          {tab === "month" && (
            <div className="w-full my-2 lg:w-1/2 lg:my-0">
              <input
                type="month"
                placeholder="Picker month"
                value={month}
                onChange={(e) => {
                  setMonth(e.target.value)
                }}
                className="border border-gray-200 rounded-lg mr-3 w-2/4"
              />
              <Button
                onClick={() => {
                  setSubmit(month)
                }}
              >
                Statisticals
              </Button>
            </div>
          )}
          {tab === "year" && (
            <div className="w-full my-2 lg:w-1/2 lg:my-0">
              <input
                type="number"
                min="2000"
                max="2200"
                placeholder="Picker year"
                className="border border-gray-200 rounded-lg mr-3 w-2/4"
                value={year}
                onChange={(e) => {
                  setYear(Number(e.target.value))
                }}
              />
              <Button
                onClick={() => {
                  setSubmit(`${year}`)
                }}
              >
                Statisticals
              </Button>
            </div>
          )}
          <ul
            className={
              tab !== "half_year"
                ? "w-1/2 max-w-2xl grid grid-flow-col text-center text-gray-500 bg-gray-100 rounded-lg p-1 text-xs"
                : "w-full max-w-2xl grid grid-flow-col text-center text-gray-500 bg-gray-100 rounded-lg p-1 text-xs"
            }
          >
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
      </div>
      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total New Jobs" value={`${dataCard[0]}`}>
          {/* @ts-ignore */}
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Total New Base User" value={`${dataCard[1]}`}>
          {/* @ts-ignore */}
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>
        <InfoCard title="Total New Kol" value={`${dataCard[2]}`}>
          {/* @ts-ignore */}
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Total New Report" value={`${dataCard[3]}`}>
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
