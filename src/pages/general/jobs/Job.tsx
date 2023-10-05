import JobBanner from "../../../components/general/jobs/JobBanner"
import JobContent from "../../../components/general/jobs/JobContent"
import { SearchJobHomepageProvider } from "../../../contexts/SearchJobGeneralContext"

const Jobs = () => {
  return (
    <SearchJobHomepageProvider>
      <JobBanner />
      <JobContent />
    </SearchJobHomepageProvider>
  )
}

export default Jobs
