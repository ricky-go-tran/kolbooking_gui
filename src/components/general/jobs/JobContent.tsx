import JobFilter from "./JobFilter";
import Jobs from "./Jobs";
import axios from "axios";
import { useEffect, useState } from "react";
import { getProxy } from "../../../utils/PathUtil";

const JobContent = () => {
  const [jobs, setJobs] = useState([]);
  const [meta, setMeta] = useState({});

  useEffect(() => {
    axios
      .get(getProxy("/api/v1/jobs"))
      .then((response) => {
        setJobs(response.data.data);
        setMeta(response.data.meta);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="w-full min-h-full flex bg-gray-100 pt-3">
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <JobFilter />
      <Jobs jobs={jobs} meta={meta} />
    </div>
  );
};
export default JobContent;
