import JobBanner from "../../../components/general/jobs/JobBanner";
import JobContent from "../../../components/general/jobs/JobContent";
import ReportModal from "../../../components/general/modal/ReportModal";
import { useContext } from "react";
import { ReportJobGeneralContextProvider } from "../../../contexts/ReportJobGeneralContext";
import { ReportJobGeneralContext } from "../../../contexts/ReportJobGeneralContext";
import { SearchJobHomepageProvider } from "../../../contexts/SearchJobGeneralContext";

const Jobs = () => {
  return (
    <ReportJobGeneralContextProvider>
      <SearchJobHomepageProvider>
        <JobBanner />
        <JobContent />
      </SearchJobHomepageProvider>
    </ReportJobGeneralContextProvider>
  );
};

export default Jobs;
