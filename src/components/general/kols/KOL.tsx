import { getCDNImage, getProxy } from "../../../utils/PathUtil";
import { Link } from "react-router-dom";
import {
  DEFAULT_IMAGE,
  DEFAULT_AVATAR,
} from "../../../global_variable/global_constant";
import { limitString } from "../../../utils/StringUtil";
import { formatDate } from "../../../utils/DateUtil";
import { AuthContext } from "../../../contexts/AuthContext";

const KOL = ({ kol }: { kol: any }) => {
  return (
    <>
      <div className="bg-white font-semibold text-center rounded-3xl border shadow-lg p-10 max-w-xs">
        <img
          className="mb-3 w-32 h-32 rounded-full shadow-lg mx-auto"
          src={
            kol?.data?.attributes?.avatar === "null"
              ? getCDNImage(DEFAULT_AVATAR)
              : getProxy(kol?.profile?.data?.attributes?.avatar)
          }
          alt="Avatar"
        />
        <h1 className="text-lg text-gray-700">
          {" "}
          {kol?.profile?.data?.attributes?.fullname || "Unknow"}{" "}
        </h1>
        <div className="w-full px-4 text-center border-b-2">
          <div className="flex justify-center py-1 lg:pt-4 ">
            <div className="mr-4 p-3 text-center">
              <span className="text-xl font-bold block uppercase tracking-wide text-gray-600">
                {`${kol?.like_num}`}
              </span>
              <span className="text-sm text-gray-400">Like</span>
            </div>
            <div className="mr-4 p-3 text-center">
              <span className="text-xl font-bold block uppercase tracking-wide text-gray-600">
                {`${kol?.unlike_num}`}
              </span>
              <span className="text-sm text-gray-400">Unlike</span>
            </div>
            <div className="lg:mr-4 p-3 text-center">
              <span className="text-xl font-bold block uppercase tracking-wide text-gray-600">
                {`${kol?.follow_num}`}
              </span>
              <span className="text-sm text-gray-400">Follower</span>
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-400 mt-4 h-16 overflow-y-hidden">
          {kol?.kol?.data?.attributes?.about_me}
        </p>
        <Link
          to={`/kols/${kol?.profile?.data?.attributes?.id}`}
          className="bg-indigo-600 px-8 py-2 mt-8 rounded-3xl text-gray-100 font-semibold uppercase tracking-wide"
        >
          Hire Me
        </Link>
      </div>
    </>
  );
};
export default KOL;
