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
  Button,
  Pagination,
  Alert,
} from "@windmill/react-ui";
import PageTitle from "../../components/admin/typography/PageTitle";
import SectionTitle from "../../components/admin/typography/SectionTitle";
import {
  EditIcon,
  TrashIcon,
  CancelIcon,
  SuccessIcon,
  InformationIcon,
  PlayIcon,
} from "../../icons";
import { ITableReport } from "../../utils/global_table_admin";
import { getProxy } from "../../utils/PathUtil";
import axios from "axios";
import { fetchToITableReport } from "../../utils/FetchData";
import ReportDetail from "../../components/admin/modal/report/ReportDetail";

const Report = () => {
  const { state: auth_state, dispatch: auth_dispatch } =
    useContext(AuthContext);
  const [pageTable, setPageTable] = useState(1);
  const [dataTable, setDataTable] = useState<ITableReport[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [alert, setAlert] = useState("");
  const [resultsPerPage, setResultPerPage] = useState(0);
  const [detail, setDetail] = useState<number | string>(-1);

  useEffect(() => {
    axios
      .get(getProxy("/api/v1/admin/reports"), {
        headers: {
          Authorization: auth_state.auth_token,
        },
      })
      .then((response) => {
        let handle_data = fetchToITableReport(response.data.data);
        let meta = response.data.meta;
        setResultPerPage(meta.items);
        setTotalResults(meta.count);
        setDataTable(handle_data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function onPageChangeTable(p: number) {
    setPageTable(p);
  }

  function proccess(report: ITableReport) {
    if (report.status !== "pending") {
      setAlert("Report must be in pending status");
    } else {
      axios
        .put(
          getProxy(`/api/v1/admin/reports/${report.id}/proccess`),
          {},
          {
            headers: {
              Authorization: auth_state.auth_token,
            },
          }
        )
        .then((response) => {
          let handle_data: ITableReport[] = dataTable.map((item) => {
            if (item.id === report.id) {
              let rs: ITableReport = {
                ...item,
                status: "proccess",
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
          setAlert("Proccess is failed");
        });
    }
  }

  function sovled(report: ITableReport) {
    if (report.status !== "proccess") {
      setAlert("Report must be in process status");
    } else {
      axios
        .put(
          getProxy(`/api/v1/admin/reports/${report.id}/sovled`),
          {},
          {
            headers: {
              Authorization: auth_state.auth_token,
            },
          }
        )
        .then((response) => {
          let handle_data: ITableReport[] = dataTable.map((item) => {
            if (item.id === report.id) {
              let rs: ITableReport = {
                ...item,
                status: "sovled",
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
          setAlert("Proccess is failed");
        });
    }
  }

  function rejected(report: ITableReport) {
    if (report.status !== "proccess") {
      setAlert("Report must be in process status");
    } else {
      axios
        .put(
          getProxy(`/api/v1/admin/reports/${report.id}/rejected`),
          {},
          {
            headers: {
              Authorization: auth_state.auth_token,
            },
          }
        )
        .then((response) => {
          let handle_data: ITableReport[] = dataTable.map((item) => {
            if (item.id === report.id) {
              let rs: ITableReport = {
                ...item,
                status: "rejected",
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
          setAlert("Proccess is failed");
        });
    }
  }
  function viewReport(report: string | number) {
    setDetail(report);
  }

  useEffect(() => {
    axios
      .get(getProxy("/api/v1/admin/reports"), {
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
        let handle_data = fetchToITableReport(response.data.data);
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
      <PageTitle>Report Management</PageTitle>
      <SectionTitle>Reports Table</SectionTitle>
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
      {detail !== -1 && <ReportDetail report_id={detail} onClose={setDetail} />}
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>Reporter</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </tr>
          </TableHeader>
          <TableBody>
            {dataTable.map((report, i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center text-sm">
                    <Avatar
                      className="hidden mr-3 md:block"
                      src={report.avatar_reporter}
                      alt="User avatar"
                    />
                    <div>
                      <p className="font-semibold">
                        {report.fullname_reporter}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {report.email_reporter}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge type={report.status_color}>{report.status}</Badge>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {new Date(report.created_at).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button
                      layout="link"
                      size="small"
                      aria-label="Edit"
                      onClick={() => {
                        viewReport(report.id);
                      }}
                    >
                      <InformationIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button
                      layout="link"
                      size="small"
                      aria-label="Edit"
                      onClick={(e) => {
                        proccess(report);
                      }}
                    >
                      <PlayIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button
                      layout="link"
                      size="small"
                      aria-label="Edit"
                      onClick={(e) => {
                        sovled(report);
                      }}
                    >
                      <SuccessIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button
                      layout="link"
                      size="small"
                      aria-label="Delete"
                      onClick={(e) => {
                        rejected(report);
                      }}
                    >
                      <CancelIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
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

export default Report;
