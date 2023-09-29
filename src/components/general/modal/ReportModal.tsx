import { SetStateAction } from "react";
import { BookMarkIcon, WarningIcon } from "../../../icons";
import { Label, Input, Textarea } from "@windmill/react-ui";
import { ReportJobGeneralContext } from "../../../contexts/ReportJobGeneralContext";
import { ReportJobType } from "../../../utils/global_type";
import { useContext } from "react";
import { type } from "os";

const ReportModal = () => {
  const { state: report_job_state, dispatch: report_job_dispatch } = useContext(
    ReportJobGeneralContext
  );

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-1/2 my-3 mx-auto max-w-7xl h-5/6">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col h-full w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-center justify-start px-5 py-2 border-b border-solid border-slate-200 rounded-t">
              <span className="w-5 h-5 text-orange-400">
                <WarningIcon />
              </span>
              <h3 className="text-lg font-semibold ml-3">Report</h3>
            </div>
            {/*body*/}
            <div className="relative p-3 flex-auto  h-10/12 overflow-y-scroll">
              <div className="mx-5 my-2 flex flex-col items-center justify-center text-base font-medium">
                <div className="flex flex-col justify-center items-center">
                  <div className="p-4 rounded-full bg-orange-100">
                    <svg className="w-10 h-10 text-orange-300 ">
                      <WarningIcon />
                    </svg>
                  </div>
                  <h6 className="font-semibold text-base mt-2">
                    Report This Job
                  </h6>
                  <p className="text-sm text-gray-500">
                    Are you sure you will denounce the job "Testing 123" by
                    "Atrr"?
                  </p>
                </div>
                <div className="w-9/12">
                  <Label className="mt-4">
                    <span>Title</span>
                    <Input
                      crossOrigin=""
                      css=""
                      className="mt-1"
                      type="text"
                      placeholder="Title Report"
                      required
                    />
                  </Label>
                  <Label className="mt-4">
                    <span>Description</span>
                    <Textarea
                      css=""
                      className="mt-1"
                      rows={3}
                      placeholder="Enter some description..."
                      style={{ resize: "none" }}
                    />
                  </Label>
                </div>
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-4 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  report_job_dispatch({ type: "CLEAR" });
                }}
              >
                Close
              </button>
              <button
                className="bg-green-400 text-white hover:bg-green-500 active:bg-green-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                Report
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black bg-opacity-60 backdrop-blur-sm"></div>
    </>
  );
};

export default ReportModal;
