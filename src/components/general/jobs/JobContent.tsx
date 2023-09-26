import JobFilter from "./JobFilter";
import Jobs from "./Jobs";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { getProxy } from "../../../utils/PathUtil";
import { AuthContext } from "../../../contexts/AuthContext";

const JobContent = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [meta, setMeta] = useState({});
  const { state: auth_state } = useContext(AuthContext);

  const isAuth = (): boolean => {
    return (
      auth_state.auth_token !== "" &&
      auth_state.auth_token !== null &&
      auth_state.auth_token !== "null"
    );
  };

  useEffect(() => {
    if (isAuth()) {
      axios
        .get(getProxy("/api/v1/jobs"), {
          headers: {
            Authorization: auth_state.auth_token,
          },
        })
        .then((response) => {
          setJobs(response.data.data);
          setMeta(response.data.meta);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .get(getProxy("/api/v1/jobs"))
        .then((response) => {
          setJobs(response.data.data);
          setMeta(response.data.meta);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [auth_state]);

  return (
    <div className="w-full min-h-full flex bg-gray-100 pt-3">
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <JobFilter />
      <Jobs jobs={jobs} meta={meta} />
    </div>
  );
};
export default JobContent;
