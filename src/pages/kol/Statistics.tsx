import SectionTitle from "../../components/admin/typography/SectionTitle"
import PageTitle from "../../components/admin/typography/PageTitle"
import InfoCard from "../../components/admin/cart/InfoCart"
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from "../../icons"
import RoundIcon from "../../components/admin/RoundIcon"
import { Chart, registerables } from "chart.js"
import { Line, Chart as ChartJS } from "react-chartjs-2"
import ChartLegend from "../../components/admin/chart/CardLegend"
import ChartCard from "../../components/admin/chart/ChartCard"
import { AuthContext } from "../../contexts/AuthContext"
import { lineStatisticalLegends } from "../../global_variable/global_charts_admin"
import { useEffect, useContext, useState } from "react"
import { getProxy } from "../../utils/PathUtil"
import {
  defaultDataForLinechartCrontab,
  fetchDataForLinechartStatistical,
  fetchDataForLinechartStatisticalKol,
} from "../../utils/ChartUtil"
import axios from "axios"
import { KOL_STATISTICALS_URL } from "../../global_variable/global_uri_backend"
import { getSumOfArray } from "../../utils/NumberUtil"
Chart.register(...registerables)

const Statistics = () => {
  const [tab, setTab] = useState<string>("month")
  const { state: auth_state } = useContext(AuthContext)
  const [dataCard, setDataCard] = useState([0, 0, 0, 0])
  const [dataChart, setDataChart] = useState(defaultDataForLinechartCrontab)

  useEffect(() => {
    axios
      .get(getProxy(KOL_STATISTICALS_URL), {
        headers: {
          Authorization: auth_state.auth_token,
        },
        params: {
          tab: tab,
        },
      })
      .then((response) => {
        const data = response.data
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
      .catch((error) => console.log(error))
  }, [tab])
  return (
    <>
      <PageTitle>Statistics</PageTitle>

      <div className="w-full flex justify-between py-6">
        <SectionTitle>
          {tab === "moth"
            ? "Index month"
            : tab === "half_year"
            ? "Index 6 Month"
            : "Index year"}
        </SectionTitle>
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
          <ChartLegend legends={lineStatisticalLegends} />
        </ChartCard>
      </div>
    </>
  )
}

export default Statistics
