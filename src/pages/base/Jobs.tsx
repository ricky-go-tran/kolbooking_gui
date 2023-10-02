import {
  Avatar,
  Badge,
  Button,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  TableRow,
} from "@windmill/react-ui";
import PageTitle from "../../components/admin/typography/PageTitle";
import { useContext, useEffect, useState } from "react";
import {
  ITableData,
  ITableJob,
} from "../../global_variable/global_table_admin";
import response from "../../global_variable/global_table_admin";
import axios from "axios";
import { getProxy } from "../../utils/PathUtil";
import { AuthContext } from "../../contexts/AuthContext";
import { fetchToITableJob } from "../../utils/FetchDataTable";
import { LockIcon } from "../../icons";
import JobCreateModal from "../../components/base/modal/JobCreateModal";
import { ToastContext } from "../../contexts/ToastContext";
import { generalMessage, generalWarning } from "../../utils/ToastUtil";

const Jobs = () => {
  const { state: auth_state } = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const [resultsPerPage, setResultPerPage] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [tab, setTab] = useState<string>("post");
  const [pageTable, setPageTable] = useState(1);
  const [dataTable, setDataTable] = useState<ITableJob[]>([]);
  const [detail, setDetail] = useState<number | string>(-1);
  const { dispatch: toast_dispatch } = useContext(ToastContext);

  function onPageChange(p: number) {
    setPage(p);
  }

  function cancle(job: ITableJob) {
    axios
      .delete(getProxy(`/api/v1/base/jobs/${job.id}/cancle`), {
        headers: {
          Authorization: auth_state.auth_token,
        },
      })
      .then((response) => {
        if (tab !== "cancle") {
          let newData = dataTable.filter((item) => {
            return item.id.toString() !== job.id.toString();
          });
          setDataTable([...newData]);
          generalMessage({
            message: `Successfully canceled job with id is '${job.id}'`,
            toast_dispatch: toast_dispatch,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function viewJob(job: string | number) {
    setDetail(job);
  }
  function handleAction(job: ITableJob) {
    if (job.status === "post" || job.status === "booking") {
      cancle(job);
    } else {
      generalWarning({
        message: "You can only lock job posts and bookings",
        toast_dispatch: toast_dispatch,
      });
    }
  }

  useEffect(() => {
    const config = {
      headers: {
        Authorization: auth_state.auth_token,
      },
      params: {
        tab: tab,
      },
    };
    axios
      .get(getProxy("/api/v1/base/jobs"), config)
      .then((response) => {
        console.log(response.data.data);
        let handle_data = fetchToITableJob(response.data.data);
        let meta = response.data.meta;
        setResultPerPage(meta.items);
        setTotalResults(meta.count);
        setDataTable(handle_data);
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageTable, tab]);
  return (
    <>
      <PageTitle>Jobs</PageTitle>
      <div className="w-full flex justify-between py-5">
        <ul className="w-1/2 max-w-2xl grid grid-flow-col text-center text-gray-500 bg-gray-100 rounded-lg p-1 text-xs">
          <li>
            <div
              className={`flex justify-center py-2 cursor-pointer ${
                tab === "post"
                  ? "bg-white rounded-lg shadow text-indigo-900"
                  : ""
              }`}
              onClick={() => setTab("post")}
            >
              Post & Booking
            </div>
          </li>
          <li>
            <div
              className={`flex justify-center py-2  cursor-pointer ${
                tab === "apply"
                  ? "bg-white rounded-lg shadow text-indigo-900"
                  : ""
              }`}
              onClick={() => setTab("apply")}
            >
              Apply
            </div>
          </li>
          <li>
            <div
              className={`flex justify-center py-2 cursor-pointer ${
                tab === "complete"
                  ? "bg-white rounded-lg shadow text-indigo-900"
                  : ""
              }`}
              onClick={() => setTab("complete")}
            >
              Complete & Payment
            </div>
          </li>
          <li>
            <div
              className={`flex justify-center py-2  cursor-pointer ${
                tab === "finish"
                  ? "bg-white rounded-lg shadow text-indigo-900"
                  : ""
              }`}
              onClick={() => setTab("finish")}
            >
              Finish
            </div>
          </li>
          <li>
            <div
              className={`flex justify-center py-2  cursor-pointer ${
                tab === "cancle"
                  ? "bg-white rounded-lg shadow text-indigo-900"
                  : ""
              }`}
              onClick={() => setTab("cancle")}
            >
              Cancel
            </div>
          </li>
        </ul>

        <ul className="flex">
          <li className="mx-2">
            <button
              type="submit"
              className="inline-flex items-center justify-center space-x-2 py-1 px-6 border border-transparent text-sm font-medium rounded text-green-600 hover:text-green-700 bg-green-200 hover:bg-green-300 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 30 30"
                fill="currentColor"
              >
                <path d="M 15 3 A 2 2 0 0 0 14.599609 3.0429688 L 14.597656 3.0410156 L 4.6289062 5.0351562 L 4.6269531 5.0371094 A 2 2 0 0 0 3 7 L 3 23 A 2 2 0 0 0 4.6289062 24.964844 L 14.597656 26.958984 A 2 2 0 0 0 15 27 A 2 2 0 0 0 17 25 L 17 5 A 2 2 0 0 0 15 3 z M 19 5 L 19 8 L 21 8 L 21 10 L 19 10 L 19 12 L 21 12 L 21 14 L 19 14 L 19 16 L 21 16 L 21 18 L 19 18 L 19 20 L 21 20 L 21 22 L 19 22 L 19 25 L 25 25 C 26.105 25 27 24.105 27 23 L 27 7 C 27 5.895 26.105 5 25 5 L 19 5 z M 23 8 L 24 8 C 24.552 8 25 8.448 25 9 C 25 9.552 24.552 10 24 10 L 23 10 L 23 8 z M 6.1855469 10 L 8.5878906 10 L 9.8320312 12.990234 C 9.9330313 13.234234 10.013797 13.516891 10.091797 13.837891 L 10.125 13.837891 C 10.17 13.644891 10.258531 13.351797 10.394531 12.966797 L 11.785156 10 L 13.972656 10 L 11.359375 14.955078 L 14.050781 19.998047 L 11.716797 19.998047 L 10.212891 16.740234 C 10.155891 16.625234 10.089203 16.393266 10.033203 16.072266 L 10.011719 16.072266 C 9.9777187 16.226266 9.9105937 16.458578 9.8085938 16.767578 L 8.2949219 20 L 5.9492188 20 L 8.7324219 14.994141 L 6.1855469 10 z M 23 12 L 24 12 C 24.552 12 25 12.448 25 13 C 25 13.552 24.552 14 24 14 L 23 14 L 23 12 z M 23 16 L 24 16 C 24.552 16 25 16.448 25 17 C 25 17.552 24.552 18 24 18 L 23 18 L 23 16 z M 23 20 L 24 20 C 24.552 20 25 20.448 25 21 C 25 21.552 24.552 22 24 22 L 23 22 L 23 20 z"></path>
              </svg>
              <div>Export excel</div>
            </button>
          </li>
          <li className="mx-2">
            <button
              type="submit"
              className="inline-flex items-center justify-center space-x-2 py-1 px-6 border border-transparent text-sm font-medium rounded text-blue-600 hover:text-blue-700 bg-blue-200 hover:bg-blue-300 transition-colors"
              onClick={() => {
                setDetail(1);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                  clip-rule="evenodd"
                />
              </svg>
              <div>Create Job</div>
            </button>
          </li>
        </ul>
      </div>
      {detail !== -1 && <JobCreateModal onClose={setDetail} />}
      <TableContainer>
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Job</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>View</TableCell>
              <TableCell>Action</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable.map((job, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Avatar
                      className="hidden mr-3 md:block"
                      src={job.job_image}
                      alt="Job image"
                    />
                    <div>
                      <p className="font-semibold">{job.job_title}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge type={job.status_color}>{job.status}</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {new Date(job.create_at).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      viewJob(job.id);
                    }}
                  >
                    View
                  </Button>
                </TableCell>
                <TableCell>
                  {(job.status === "post" || job.status === "booking") && (
                    <Button
                      layout="link"
                      size="small"
                      aria-label="Edit"
                      onClick={() => {
                        handleAction(job);
                      }}
                    >
                      <LockIcon />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            label="Table navigation"
            onChange={onPageChange}
          />
        </TableFooter>
      </TableContainer>
    </>
  );
};

export default Jobs;
