import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import {
  Table,
  TableHeader,
  TableCell,
  TableBody,
  TableRow,
  TableFooter,
  TableContainer,
  Badge,
  Avatar,
  Pagination,
} from "@windmill/react-ui";
import PageTitle from "../../components/admin/typography/PageTitle";
import SectionTitle from "../../components/admin/typography/SectionTitle";
import { LockIcon } from "../../icons";
import { ITableJob } from "../../utils/global_table_admin";
import axios from "axios";
import { getProxy } from "../../utils/PathUtil";
import { fetchToITableJob } from "../../utils/FetchData";
import { Alert } from "@windmill/react-ui";
import JobDetail from "../../components/general/modal/job/JobDetail";

const Job = () => {
  const { state: auth_state } = useContext(AuthContext);
  const [pageTable, setPageTable] = useState(1);
  const [dataTable, setDataTable] = useState<ITableJob[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [alert, setAlert] = useState("");
  const [resultsPerPage, setResultPerPage] = useState(0);

  useEffect(() => {
    axios
      .get(getProxy("/api/v1/kol/jobs"), {
        headers: {
          Authorization: auth_state.auth_token,
        },
      })
      .then((response) => {
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
  }, []);

  function onPageChangeTable(p: number) {
    setPageTable(p);
  }

  function apply(job: ITableJob) {
    if (job.status !== "post" && job.status !== "booking") {
      setAlert("Job status must post or booking");
    } else {
      axios
        .put(
          getProxy(`/api/v1/kol/jobs/${job.id}/apply`),
          {},
          {
            headers: {
              Authorization: auth_state.auth_token,
            },
          }
        )
        .then((response) => {
          let handle_data: ITableJob[] = dataTable.map((item) => {
            if (item.id === job.id) {
              let rs: ITableJob = {
                ...item,
                status: "apply",
                status_color: "neutral",
              };
              return rs;
            } else {
              return item;
            }
          });
          setDataTable(handle_data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function complete(job: ITableJob) {
    if (job.status !== "apply") {
      setAlert("Job status must apply");
    } else {
      axios
        .put(
          getProxy(`/api/v1/kol/jobs/${job.id}/complete`),
          {},
          {
            headers: {
              Authorization: auth_state.auth_token,
            },
          }
        )
        .then((response) => {
          let handle_data: ITableJob[] = dataTable.map((item) => {
            if (item.id === job.id) {
              let rs: ITableJob = {
                ...item,
                status: "complete",
                status_color: "primary",
              };
              return rs;
            } else {
              return item;
            }
          });
          setDataTable(handle_data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function payment(job: ITableJob) {
    if (job.status !== "complete") {
      setAlert("Job status must complete");
    } else {
      axios
        .put(
          getProxy(`/api/v1/kol/jobs/${job.id}/payment`),
          {},
          {
            headers: {
              Authorization: auth_state.auth_token,
            },
          }
        )
        .then((response) => {
          let handle_data: ITableJob[] = dataTable.map((item) => {
            if (item.id === job.id) {
              let rs: ITableJob = {
                ...item,
                status: "payment",
                status_color: "primary",
              };
              return rs;
            } else {
              return item;
            }
          });
          setDataTable(handle_data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function finish(job: ITableJob) {
    if (job.status !== "payment" && job.status !== "complete") {
      setAlert("Job status must payment or complete");
    } else {
      axios
        .put(
          getProxy(`/api/v1/kol/jobs/${job.id}/finish`),
          {},
          {
            headers: {
              Authorization: auth_state.auth_token,
            },
          }
        )
        .then((response) => {
          let handle_data: ITableJob[] = dataTable.map((item) => {
            if (item.id === job.id) {
              let rs: ITableJob = {
                ...item,
                status: "finish",
                status_color: "success",
              };
              return rs;
            } else {
              return item;
            }
          });
          setDataTable(handle_data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function cancle(job: ITableJob) {
    if (job.status === "payment" || job.status === "complete") {
      setAlert("Job status must diferent payment and complete");
    } else {
      axios
        .put(
          getProxy(`/api/v1/kol/jobs/${job.id}/cancle`),
          {},
          {
            headers: {
              Authorization: auth_state.auth_token,
            },
          }
        )
        .then((response) => {
          let handle_data: ITableJob[] = dataTable.map((item) => {
            if (item.id === job.id) {
              let rs: ITableJob = {
                ...item,
                status: "cancle",
                status_color: "danger",
              };
              return rs;
            } else {
              return item;
            }
          });
          setDataTable(handle_data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  function viewJob(job: ITableJob) {
    console.log(job);
  }

  function handleAction(
    event: React.ChangeEvent<HTMLSelectElement>,
    job: ITableJob
  ) {
    let action = event.target.value;
    if (action === "apply") {
      apply(job);
    } else if (action === "complete") {
      complete(job);
    } else if (action === "payment") {
      payment(job);
    } else if (action === "finish") {
      finish(job);
    } else if (action === "cancle") {
      cancle(job);
    }
  }

  useEffect(() => {
    axios
      .get(getProxy("/api/v1/kol/jobs"), {
        headers: {
          Authorization: auth_state.auth_token,
        },
        params: {
          page: {
            number: pageTable,
          },
        },
      })
      .then((response) => {
        let handle_data = fetchToITableJob(response.data.data);
        let meta = response.data.meta;
        setResultPerPage(meta.items);
        setTotalResults(meta.count);
        setDataTable(handle_data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [pageTable]);

  return (
    <>
      <PageTitle>Job Managements</PageTitle>
      <SectionTitle>Jobs Table</SectionTitle>
      {alert !== "" && (
        <Alert
          type="danger"
          className="my-5"
          onClose={() => {
            setAlert("");
          }}
        >
          {alert}
        </Alert>
      )}
      <JobDetail />
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Owner</TableCell>
              <TableCell>KOL</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable.map((job, i) => (
              <TableRow
                key={i}
                className="hover:bg-gray-100 cursor-pointer"
                onClick={(e) => {
                  viewJob(job);
                }}
              >
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Avatar
                      className="hidden mr-3 md:block"
                      src={job.avatar_owner}
                      alt="User avatar"
                    />
                    <div>
                      <p className="font-semibold">{job.fullname_owner}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {job.email_owner}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Avatar
                      className="hidden mr-3 md:block"
                      src={job.avatar_kol}
                      alt="User avatar"
                    />
                    <div>
                      <p className="font-semibold">{job.fullname_kol}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {job.email_kol}
                      </p>
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
                  <div className="flex items-center space-x-4">
                    <select
                      id="countries"
                      onChange={(event) => handleAction(event, job)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                      <option selected disabled>
                        Action
                      </option>
                      <option value="apply">Apply</option>
                      <option value="complete">Complete</option>
                      <option value="payment">Payment</option>
                      <option value="finish">Finish</option>
                    </select>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={onPageChangeTable}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
    </>
  );
};

export default Job;
