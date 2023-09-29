import { getCDNImage, getProxy } from "../../../utils/PathUtil";
import { Link } from "react-router-dom";
import { DEFAULT_IMAGE, DEFAULT_AVATAR } from "../../../utils/global_constant";
import { limitString } from "../../../utils/StringUtil";
import { formatDate } from "../../../utils/DateUtil";
import { AuthContext } from "../../../contexts/AuthContext";

const KOL = ({ kol }: { kol: any }) => {
  return (
    <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
      <Link to={`/kols/${kol?.profile?.data?.id}`}>
        <img
          className="rounded-t-lg"
          src={
            kol?.data?.attributes?.avatar === "null"
              ? getCDNImage(DEFAULT_AVATAR)
              : getProxy(kol?.profile?.data?.attributes?.avatar)
          }
          alt="Avatar"
        />
      </Link>
      <div className="p-6">
        <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
          {kol?.profile?.data?.attributes?.fullname || "Unknow"}
        </h5>
        <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
          {kol?.profile?.data?.attributes?.address || "Unknown"}
        </p>
        <Link
          to={`/kols/${kol?.profile?.data?.id}`}
          className="bg-blue-400 hover:bg-blue-300 text-white font-semibold py-2 px-4 border border-gray-400 rounded shadow"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};
export default KOL;
