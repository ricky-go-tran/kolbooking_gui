import JobFilter from "./JobFilter";
import Jobs from "./Jobs";

const JobContent = () => {
  return (
    <div className="w-full min-h-full flex bg-gray-100 pt-3">
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <JobFilter />
      <Jobs />
    </div>
  )
}
export default JobContent;
