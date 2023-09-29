import JobBanner from "../../../components/general/jobs/JobBanner";
import JobContent from "../../../components/general/jobs/JobContent";
import ReportModal from "../../../components/general/modal/ReportModal";
import { useContext } from "react";
import { ReportJobGeneralContextProvider } from "../../../contexts/ReportJobGeneralContext";
import { ReportJobGeneralContext } from "../../../contexts/ReportJobGeneralContext";

const Jobs = () => {
  return (
    <ReportJobGeneralContextProvider>
      <>
        <JobBanner />
        <JobContent />
      </>
    </ReportJobGeneralContextProvider>
  );
};

export default Jobs;
