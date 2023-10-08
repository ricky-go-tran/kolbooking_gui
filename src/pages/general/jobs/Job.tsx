import JobBanner from "../../../components/general/jobs/JobBanner"
import JobContent from "../../../components/general/jobs/JobContent"
import { SearchJobHomepageProvider } from "../../../contexts/SearchJobGeneralContext"
import { FilterJobGeneralContextProvider } from "../../../contexts/FilterJobGeneralContext"

const Jobs = () => {
  return (
    <FilterJobGeneralContextProvider>
      <SearchJobHomepageProvider>
        <JobBanner />
        <JobContent />
      </SearchJobHomepageProvider>
    </FilterJobGeneralContextProvider>
  )
}

export default Jobs
