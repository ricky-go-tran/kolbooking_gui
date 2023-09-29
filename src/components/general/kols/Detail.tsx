import axios from "axios";
import { useState, useEffect } from "react";
import { getProxy } from "../../../utils/PathUtil";
import { useParams } from "react-router-dom";

const Detail = () => {
  const params = useParams();

  useEffect(() => {
    axios
      .get(getProxy("/api/v1/kols/" + params.id))
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  return <div className="min-h-screen w-screen bg-gray-300"></div>;
};

export default Detail;
