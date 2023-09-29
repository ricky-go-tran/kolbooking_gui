import SectionTitle from "../../components/admin/typography/SectionTitle";
import PageTitle from "../../components/admin/typography/PageTitle";
import InfoCard from "../../components/admin/cart/InfoCart";
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from "../../icons";
import RoundIcon from "../../components/admin/RoundIcon";
import { Chart, registerables } from "chart.js";
import { Line, Chart as ChartJS } from "react-chartjs-2";
import ChartLegend from "../../components/admin/chart/CardLegend";
import ChartCard from "../../components/admin/chart/ChartCard";
import { AuthContext } from "../../contexts/AuthContext";
import { lineStatisticalLegends } from "../../global_variable/global_charts_admin";
import { useEffect, useContext, useState } from "react";
import { getProxy } from "../../utils/PathUtil";
import {
  defaultDataForLinechartCrontab,
  fetchDataForLinechartStatistical,
} from "../../utils/ChartUtil";
import axios from "axios";
Chart.register(...registerables);

const Statistics = () => {
  const [data, setData] = useState({
    total: 0,
    finish: 0,
    cancel: 0,
    profit: 0,
  });
  const [dataChart, setDataChart] = useState(defaultDataForLinechartCrontab);
  const { state: auth_state } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get(getProxy("/api/v1/kol/statistical"), {
        headers: {
          Authorization: auth_state.auth_token,
        },
      })
      .then((response) => {
        setData({
          total: response.data.total_job,
          finish: response.data.finish_job,
          cancel: response.data.cancle_job,
          profit: response.data.profit,
        });
        const handle_data = fetchDataForLinechartStatistical(
          response.data.label,
          response.data.finish_detail,
          response.data.cancle_detail
        );
        setDataChart(handle_data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <>
      <PageTitle>Statistics</PageTitle>
      <SectionTitle>Index month</SectionTitle>

      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total" value={`${data.total}`}>
          {/* @ts-ignore */}
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Finish jobs" value={`${data.finish}`}>
          {/* @ts-ignore */}
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Cancel jobs" value={`${data.cancel}`}>
          {/* @ts-ignore */}
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Profits" value={`${data.profit}`}>
          {/* @ts-ignore */}
          <RoundIcon
            icon={ChatIcon}
            iconColorClass="text-teal-500 dark:text-teal-100"
            bgColorClass="bg-teal-100 dark:bg-teal-500"
            className="mr-4"
          />
        </InfoCard>
      </div>

      <SectionTitle>Compare Chart</SectionTitle>

      <div className="grid gap-6 mb-8 md:grid-cols-1">
        <ChartCard title="Job completion and cancellation rates">
          <Line {...dataChart} />
          <ChartLegend legends={lineStatisticalLegends} />
        </ChartCard>
      </div>
    </>
  );
};

export default Statistics;
