import JobFilter from "./JobFilter";
import Jobs from "./Jobs";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState, useContext } from "react";
import { getProxy } from "../../../utils/PathUtil";
import { AuthContext } from "../../../contexts/AuthContext";
import { isAuth } from "../../../utils/AuthUtil";
import ReportModal from "../modal/ReportModal";
import { ReportJobGeneralContextProvider } from "../../../contexts/ReportJobGeneralContext";
import { ReportJobGeneralContext } from "../../../contexts/ReportJobGeneralContext";

const JobContent = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [meta, setMeta] = useState({});
  const { state: auth_state } = useContext(AuthContext);
  const [totalResults, setTotalResults] = useState(0);
  const [resultsPerPage, setResultPerPage] = useState(0);
  const [pageTable, setPageTable] = useState(1);
  const { state: report_job_state, dispatch: report_job_dispatch } = useContext(
    ReportJobGeneralContext
  );

  const fetchData = (response: AxiosResponse<any, any>) => {
    setJobs(response.data.data);
    let meta = response.data.meta;
    setResultPerPage(meta.items);
    setTotalResults(meta.count);
  };

  useEffect(() => {
    let config: any = {
      params: {
        page: {
          number: pageTable,
        },
      },
    };
    if (isAuth(auth_state)) {
      config = {
        headers: {
          Authorization: auth_state.auth_token,
        },
        params: {
          page: {
            number: pageTable,
          },
        },
      };
    }
    axios
      .get(getProxy("/api/v1/jobs"), config)
      .then((response) => {
        fetchData(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [auth_state, pageTable]);

  return (
    <div className="w-full min-h-full flex bg-gray-100 pt-3">
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      {report_job_state.id_job !== "" && <ReportModal />}
      <JobFilter />
      <Jobs
        jobs={jobs}
        resultsPerPage={resultsPerPage}
        totalResults={totalResults}
        setPageTable={setPageTable}
      />
    </div>
  );
};
export default JobContent;
