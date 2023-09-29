import KOLSearch from "../../../components/general/kols/KOLSearch";
import KOLs from "../../../components/general/kols/KOLs";
import axios from "axios";
import { useEffect, useState } from "react";
import { getProxy } from "../../../utils/PathUtil";

const KOL = () => {
  const [kols, setKols] = useState([]);
  const [meta, setMeta] = useState({});

  useEffect(() => {
    axios
      .get(getProxy("/api/v1/kols"))
      .then((response) => {
        setKols(response.data.data);
        setMeta(response.data.meta);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <KOLSearch />
      <KOLs kols={kols} meta={meta} />
    </>
  );
};

export default KOL;
