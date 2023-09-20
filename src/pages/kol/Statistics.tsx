import SectionTitle from '../../components/admin/typography/SectionTitle';
import PageTitle from '../../components/admin/typography/PageTitle';
import InfoCard from '../../components/admin/cart/InfoCart';
import { ChatIcon, CartIcon, MoneyIcon, PeopleIcon } from '../../icons';
import RoundIcon from '../../components/admin/RoundIcon'
import { Chart, registerables } from 'chart.js';
import { Doughnut, Line, Chart as ChartJS } from 'react-chartjs-2';
import ChartLegend from '../../components/admin/chart/CardLegend';
import ChartCard from '../../components/admin/chart/ChartCard';
import {
  doughnutOptions,
  lineOptions,
  doughnutLegends,
  lineLegends,
} from '../../utils/global_charts_admin';
Chart.register(...registerables);

const Statistics = () => {
  return (
    <>
      <PageTitle>Statistics</PageTitle>
      <SectionTitle>Index month</SectionTitle>

      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <InfoCard title="Total clients" value="6389">
          {/* @ts-ignore */}
          <RoundIcon
            icon={PeopleIcon}
            iconColorClass="text-orange-500 dark:text-orange-100"
            bgColorClass="bg-orange-100 dark:bg-orange-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Account balance" value="$ 46,760.89">
          {/* @ts-ignore */}
          <RoundIcon
            icon={MoneyIcon}
            iconColorClass="text-green-500 dark:text-green-100"
            bgColorClass="bg-green-100 dark:bg-green-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="New sales" value="376">
          {/* @ts-ignore */}
          <RoundIcon
            icon={CartIcon}
            iconColorClass="text-blue-500 dark:text-blue-100"
            bgColorClass="bg-blue-100 dark:bg-blue-500"
            className="mr-4"
          />
        </InfoCard>

        <InfoCard title="Pending contacts" value="35">
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
          <Line {...lineOptions} />
          <ChartLegend legends={lineLegends} />
        </ChartCard>
      </div>

    </>
  )
}

export default Statistics;


