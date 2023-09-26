import { formatDate } from "../../../utils/DateUtil";

const JobBasicInfo = ({ job }: { job: any }) => {
  return (
    <div id="basic-info" className="max-w-xs w-4/5 mt-5">
      <div className="w-full">
        <div className="bg-white shadow-xl rounded-lg py-3 max-w-xs">
          <div className="photo-wrapper p-2">
            <div className="text-center text-gray-400 text-base font-semibold mb-5">
              <p>About this job</p>
            </div>
          </div>
          <div className="p-2">
            <table className="text-xs my-3">
              <tbody>
                <tr>
                  <td className="px-2 py-2 text-gray-500 font-semibold">
                    Posted date
                  </td>
                  <td className="px-2 py-2">
                    {job?.created_at === undefined
                      ? "Ụknown"
                      : formatDate(job.created_at)}
                  </td>
                </tr>
                <tr>
                  <td className="px-2 py-2 text-gray-500 font-semibold">
                    Cost
                  </td>
                  <td className="px-2 py-2">$ {job?.price}</td>
                </tr>
                <tr>
                  <td className="px-2 py-2 text-gray-500 font-semibold">
                    Status
                  </td>
                  <td className="px-2 py-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                      {job?.status}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobBasicInfo;
