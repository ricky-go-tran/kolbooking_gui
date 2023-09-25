import { LikeOuletIcon, UnlikeIcon, WarningIcon } from "../../../icons";
import { useState, useEffect, useContext } from "react";
import { getCDNImage, getProxy } from "../../../utils/PathUtil";
import { DEFAULT_IMAGE, DEFAULT_AVATAR } from "../../../utils/global_constant";
import { limitString } from "../../../utils/StringUtil";
import { formatDate } from "../../../utils/DateUtil";
import { AuthContext } from "../../../contexts/AuthContext";

const Job = ({ job }: { job: any }) => {
  const { state: auth_state } = useContext(AuthContext);

  const isAuth = (): boolean => {
    return (
      auth_state.auth_token !== "" &&
      auth_state.auth_token !== null &&
      auth_state.auth_token !== "null"
    );
  };

  return (
    <div className="my-4 w-11/12 lg:flex">
      {job.image === "null" && (
        <div
          className="h-56 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
          style={{
            backgroundImage: `url(${getCDNImage(DEFAULT_IMAGE)})`,
          }}
          title="Job image"
        ></div>
      )}

      {job.image !== "null" && (
        <div
          className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
          style={{
            backgroundImage: `url(${getProxy(job.image)})`,
          }}
          title="Job image"
        ></div>
      )}

      <div className="border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal flex-grow">
        <div className="mb-8">
          <div className="text-black font-bold text-xl mb-2">{job.title}</div>
          <p className="text-grey-darker text-base">
            {limitString(job.description || " ")}
          </p>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center">
            <img
              className="w-10 h-10 rounded-full mr-4"
              src={
                job?.owner?.data?.attributes?.avatar === "null"
                  ? getCDNImage(DEFAULT_AVATAR)
                  : getProxy(job?.owner?.data?.attributes?.avatar)
              }
              alt="Avatar of Owner"
            />
            <div className="text-sm">
              <p className="text-black leading-none">
                {job?.owner?.data?.attributes?.fullname || "Unknown"}
              </p>
              <p className="text-grey-dark">
                {formatDate(job?.created_at) || "Unknown"}
              </p>
            </div>
          </div>

          <ul className="flex items-center w-1/3 justify-between">
            {isAuth() === true && (
              <>
                <li className="flex items-center justify-center text-gray-500 cursor-pointer">
                  <LikeOuletIcon />
                  <span>1000</span>
                </li>
                <li className="flex items-center justify-center text-gray-500 cursor-pointer">
                  <UnlikeIcon />
                  <span>1000</span>
                </li>
                <li className="flex text-gray-500 cursor-pointer">
                  <WarningIcon />
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Job;
