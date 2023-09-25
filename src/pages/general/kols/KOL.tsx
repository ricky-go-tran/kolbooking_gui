import KOLSearch from "../../../components/general/kols/KOLSearch";
import KOLs from "../../../components/general/kols/KOLs";
import axios from "axios";
import { useEffect, useState } from "react";
import { getProxy } from "../../../utils/PathUtil";

const KOL = () => {
  const [jobs, setJobs] = useState([]);
  const [meta, setMeta] = useState({});

  useEffect(() => {
    axios
      .get(getProxy("/api/v1/kols"))
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <KOLSearch />
      <KOLs />
    </>
  );
};

export default KOL;
