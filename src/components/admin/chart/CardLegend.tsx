import React from 'react';

import { ILegends } from '../../../utils/global_charts_admin';

interface IChartLegend {
  legends: ILegends[]
}

const ChartLegend = ({ legends }: IChartLegend) => {
  return (
    <div className="flex justify-center mt-4 space-x-3 text-sm text-gray-600 dark:text-gray-400">
      {legends.map((legend) => (
        <div className="flex items-center" key={legend.title}>
          <span className={`inline-block w-3 h-3 mr-1 ${legend.color} rounded-full`}></span>
          <span>{legend.title}</span>
        </div>
      ))}
    </div>
  )
}

export default ChartLegend;
