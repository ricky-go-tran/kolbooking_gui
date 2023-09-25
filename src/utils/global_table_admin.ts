interface ITableData {
  avatar: string
  name: string
  job: string
  amount: number
  status: "success" | "danger" | "warning" | "neutral" | "primary" | undefined
  date: string
};

interface ITabelUser {
  id: string
  avatar: string
  fullname: string
  email: string
  birthday: string
  role: "amdin" | "kol" | "base" | undefined
  role_color: "danger" | "warning" | "success" | undefined
  status: "valid" | "invalid" | "lock" | undefined
  status_color: "success" | "warning" | "danger" | undefined

}

interface ITableJob {
  id: string
  avatar_owner: string
  fullname_owner: string
  email_owner: string
  avatar_kol: string
  fullname_kol: string
  email_kol: string
  status: "post" | "booking" | "apply" | "complete" | "payment" | "finish" | "cancle" | undefined
  status_color: "success" | "danger" | "warning" | "neutral" | "primary" | undefined
  create_at: string
}

interface ITableReport {
  id: string
  avatar_reporter: string
  fullname_reporter: string
  email_reporter: string
  status: "pending" | "proccess" | "sovled" | "rejected" | undefined
  status_color: "success" | "danger" | "warning" | "neutral" | "primary" | undefined
  created_at: string
}

interface ITableBookmark {
  id: string
  name_job: string
  image_job: string
  status: "care" | "attention" | "extremely" | undefined
  status_color: "success" | "danger" | "warning" | "neutral" | "primary" | undefined
  created_at: string
}


const tableData: ITableData[] = [
  {
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/lokesh_coder/128.jpg',
    name: 'Chandler Jacobi',
    job: 'Direct Security Executive',
    amount: 989.4,
    status: 'primary',
    date: 'Mon Feb 03 2020 04:13:15 GMT-0300 (Brasilia Standard Time)',
  },
];

export default tableData;
export type {
  ITableData,
  ITabelUser,
  ITableJob,
  ITableReport,
  ITableBookmark
};
