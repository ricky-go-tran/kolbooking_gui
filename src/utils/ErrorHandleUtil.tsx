import { NavigateFunction } from "react-router-dom"

function HandleResponseError(error: any, navigate: NavigateFunction) {
  const error_status = error?.response?.status;
  if (error_status === null) {
    navigate("/network/error");
  } else if (error_status === 500) {
    navigate("/server/error");
  }
}


export {
  HandleResponseError
}
