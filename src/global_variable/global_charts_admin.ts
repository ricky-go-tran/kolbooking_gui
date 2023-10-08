export interface ILegends {
  title: string
  color: string
}

export const doughnutLegends: ILegends[] = [
  { title: "Shirts", color: "bg-blue-500" },
  { title: "Shoes", color: "bg-teal-600" },
  { title: "Bags", color: "bg-purple-600" },
]

export const lineLegends: ILegends[] = [
  { title: "Failed", color: "bg-teal-600" },
  { title: "Processed", color: "bg-purple-600" },
]

export const lineStatisticalLegends: ILegends[] = [
  { title: "Failed", color: "bg-teal-600" },
  { title: "Processed", color: "bg-purple-600" },
]

export const lineDashboardlLegends: ILegends[] = [
  { title: "Job", color: "bg-teal-600" },
  { title: "Base User", color: "bg-purple-600" },
  { title: "Kol", color: "bg-blue-600" },
  { title: "Report", color: "bg-red-600" },
]

export const barLegends: ILegends[] = [
  { title: "Shoes", color: "bg-teal-600" },
  { title: "Bags", color: "bg-purple-600" },
]

export const doughnutOptions = {
  data: {
    datasets: [
      {
        data: [33, 33, 33],
        backgroundColor: ["#0694a2", "#1c64f2", "#7e3af2"],
        label: "Dataset 1",
      },
    ],
    labels: ["Shoes", "Shirts", "Bags"],
  },
  options: {
    responsive: true,
    cutoutPercentage: 80,
  },
  legend: {
    display: false,
  },
}

export const lineOptions = {
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Failed",
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        data: [43, 48, 40, 54, 67, 73, 70],
      },
      {
        label: "Processed",
        backgroundColor: "#7e3af2",
        borderColor: "#7e3af2",
        data: [24, 50, 64, 74, 52, 51, 65],
      },
    ],
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  },
  legend: {
    display: false,
  },
}

export const barOptions = {
  data: {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Shoes",
        backgroundColor: "#0694a2",
        // borderColor: window.chartColors.red,
        borderWidth: 1,
        data: [-3, 14, 52, 74, 33, 90, 70],
      },
      {
        label: "Bags",
        backgroundColor: "#7e3af2",
        // borderColor: window.chartColors.blue,
        borderWidth: 1,
        data: [66, 33, 43, 12, 54, 62, 84],
      },
    ],
  },
  options: {
    responsive: true,
  },
  legend: {
    display: false,
  },
}
