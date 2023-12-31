export const fetchDataForLinechartCrontab = (
  raw_label: any[],
  raw_data_processed: any[],
  raw_data_failed: any[]
) => {
  console.log(raw_data_failed)
  return {
    data: {
      labels: raw_label,
      datasets: [
        {
          label: "Processed",
          backgroundColor: "#7e3af2",
          borderColor: "#7e3af2",
          data: raw_data_processed,
        },
        {
          label: "Failed",
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          data: raw_data_failed,
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
          text: "Compare background jobs faild and succeed",
        },
      },
    },
    legend: {
      display: false,
    },
  }
}

export const fetchDataForLinechartStatistical = (
  raw_label: any[],
  raw_data_processed: any[],
  raw_data_failed: any[]
) => {
  return {
    data: {
      labels: raw_label,
      datasets: [
        {
          label: "Finish",
          backgroundColor: "#7e3af2",
          borderColor: "#7e3af2",
          data: raw_data_processed,
        },
        {
          label: "Cancel",
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          data: raw_data_failed,
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
          text: "Compare background jobs faild and succeed",
        },
      },
    },
    legend: {
      display: false,
    },
  }
}

export const defaultDataForLinechartCrontab = {
  data: {
    labels: ["loading 1", "loading 2", "loading 3", "loading 4", "loading 5"],
    datasets: [
      {
        label: "Processed",
        backgroundColor: "#7e3af2",
        borderColor: "#7e3af2",
        data: [0, 0, 0, 0, 0],
      },
      {
        label: "Failed",
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        data: [0, 0, 0, 0, 0],
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
        text: "Compare background jobs faild and succeed",
      },
    },
  },
  legend: {
    display: false,
  },
}

export const fetchDataForLinechartDashboard = (
  raw_label: any[],
  raw_data_job: any[],
  raw_data_base: any[],
  raw_data_kol: any[],
  raw_data_report: any[]
) => {
  return {
    data: {
      labels: raw_label,
      datasets: [
        {
          label: "Job",
          backgroundColor: "#7e3af2",
          borderColor: "#7e3af2",
          data: raw_data_job,
        },
        {
          label: "User Base",
          backgroundColor: "#80F1B6",
          borderColor: "#80F1B6",
          data: raw_data_base,
        },
        {
          label: "Kol",
          backgroundColor: "#E59E1C",
          borderColor: "#E59E1C",
          data: raw_data_kol,
        },
        {
          label: "Report",
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          data: raw_data_report,
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
          text: "System Index",
        },
      },
    },
    legend: {
      display: false,
    },
  }
}

export const fetchDataForLinechartStatisticalKol = (
  raw_label: any[],
  raw_data_total: any[],
  raw_data_cancel: any[],
  raw_data_finish: any[]
) => {
  return {
    data: {
      labels: raw_label,
      datasets: [
        {
          label: "Job",
          backgroundColor: "#7e3af2",
          borderColor: "#7e3af2",
          data: raw_data_total,
        },
        {
          label: "Finish",
          backgroundColor: "#80F1B6",
          borderColor: "#80F1B6",
          data: raw_data_finish,
        },
        {
          label: "Cancel",
          backgroundColor: "#E59E1C",
          borderColor: "#E59E1C",
          data: raw_data_cancel,
        },
        // {
        //   label: "Report",
        //   borderColor: "rgb(255, 99, 132)",
        //   backgroundColor: "rgba(255, 99, 132, 0.5)",
        //   data: raw_data_report,
        // },
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
          text: "System Index",
        },
      },
    },
    legend: {
      display: false,
    },
  }
}
