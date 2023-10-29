import SectionTitle from "../../components/admin/typography/SectionTitle"
import PageTitle from "../../components/admin/typography/PageTitle"
import InfoCard from "../../components/admin/cart/InfoCart"
import { CartIcon, MoneyIcon, PeopleIcon } from "../../icons"
import RoundIcon from "../../components/admin/RoundIcon"
import { Chart, registerables } from "chart.js"
import { Line } from "react-chartjs-2"
import ChartCard from "../../components/admin/chart/ChartCard"
import { AuthContext } from "../../contexts/AuthContext"
import { useEffect, useContext, useState } from "react"
import { getProxy } from "../../utils/PathUtil"
import {
  defaultDataForLinechartCrontab,
  fetchDataForLinechartStatisticalKol,
} from "../../utils/ChartUtil"
import axios from "axios"
import { KOL_STATISTICALS_URL } from "../../global_variable/global_uri_backend"
import { getSumOfArray } from "../../utils/NumberUtil"
import { ToastContext } from "../../contexts/ToastContext"
import { ErrorContext } from "../../contexts/ErrorContext"
import { HandleResponseError } from "../../utils/ErrorHandleUtil"
import { Button } from "@windmill/react-ui"
import { getCurrentDateFormatted } from "../../utils/DateUtil"
Chart.register(...registerables)

const Statistics = () => {
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
        ...params,
        filter: year,
      }
    }
    if (tab === "month") {
      params = {
        ...params,
        filter: month,
      }
    }
    axios
      .get(getProxy(KOL_STATISTICALS_URL), {
        headers: {
          Authorization: auth_state.auth_token,
        },
        params: params,
      })
      .then((response) => {
        const data = response.data
        console.log(data)
        setDataCard([
          getSumOfArray(data.total_job),
          getSumOfArray(data.finish_job),
          getSumOfArray(data.cancle_job),

          0,
        ])
        setDataChart(
          fetchDataForLinechartStatisticalKol(
            data.label,
            data.total_job,
            data.finish_job,
            data.cancle_job
          )
        )
      })
      .catch((error) =>
        HandleResponseError(error, setErrorCode, toast_dispatch)
      )
  }, [tab, submit])

  return (
    <>
      <PageTitle>Statistics</PageTitle>

      <div className="w-full flex flex-col lg:flex-row justify-between py-6">
        <h1 className="text-xl lg:text-2xl font-semibold text-gray-700 dark:text-gray-200">
          Statisticals
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

      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
        <InfoCard title="Total" value={`${dataCard[0]}`}>
          {/* @ts-ignore */}
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Finish jobs" value={`${dataCard[1]}`}>
          {/* @ts-ignore */}
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Cancel jobs" value={`${dataCard[2]}`}>
          {/* @ts-ignore */}
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>
      </div>

      <SectionTitle>Compare Chart</SectionTitle>

      <div className="grid gap-6 mb-8 md:grid-cols-1">
        <ChartCard title="Job Index">
          <Line {...dataChart} />
        </ChartCard>
      </div>
    </>
  )
}

export default Statistics
