import {
  LikeOuletIcon,
  LikeIcon,
  UnlikeOutletIcon,
  UnlikeIcon,
  WarningIcon,
  BookMarkIcon,
  BookMarkOutlineIcon,
} from "../../../icons";
import { useContext, useState, useEffect } from "react";
import { getCDNImage, getProxy } from "../../../utils/PathUtil";
import { DEFAULT_IMAGE, DEFAULT_AVATAR } from "../../../utils/global_constant";
import { limitString } from "../../../utils/StringUtil";
import { formatDate } from "../../../utils/DateUtil";
import { AuthContext } from "../../../contexts/AuthContext";
import { ProfileContext } from "../../../contexts/ProfileContext";
import axios from "axios";
import { Link } from "react-router-dom";

const Job = ({ job }: { job: any }) => {
  const { state: auth_state } = useContext(AuthContext);
  const { state: profile_state } = useContext(ProfileContext);
  const isAuth = (): boolean => {
    return (
      auth_state.auth_token !== "" &&
      auth_state.auth_token !== null &&
      auth_state.auth_token !== "null"
    );
  };
  const [liked, setLiked] = useState(false);
  const [unliked, setUnliked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [unlikeCount, setUnlikeCount] = useState(0);

  useEffect(() => {
    setLikeCount(job.like_num);
    setUnlikeCount(job.unlike_num);
    if (job.current_user_like === null || job.current_user_like === undefined) {
      setLiked(false);
    } else {
      setLiked(true);
    }
    if (
      job.current_user_unlike === undefined ||
      job.current_user_unlike === null
    ) {
      setUnliked(false);
    } else {
      setUnliked(true);
    }
  }, []);

  const like = (job: any) => {
    if (isAuth()) {
      axios
        .post(
          getProxy(`/api/v1/emoji_jobs/${job.id}/like`),
          {},
          {
            headers: {
              Authorization: auth_state.auth_token,
            },
          }
        )
        .then((response) => {
          if (response.status !== 204) {
            setLiked(true);
            setUnliked(false);
            if (response.status === 200) {
              setLikeCount(likeCount + 1);
              setUnlikeCount(unlikeCount - 1);
            } else if (response.status === 201) {
              setLikeCount(likeCount + 1);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const unlike = (job: any) => {
    if (isAuth()) {
      axios
        .post(
          getProxy(`/api/v1/emoji_jobs/${job.id}/unlike`),
          {},
          {
            headers: {
              Authorization: auth_state.auth_token,
            },
          }
        )
        .then((response) => {
          if (response.status !== 204) {
            setLiked(false);
            setUnliked(true);
            if (response.status === 200) {
              setLikeCount(likeCount - 1);
              setUnlikeCount(unlikeCount + 1);
            } else if (response.status === 201) {
              setUnlikeCount(unlikeCount + 1);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
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
          <Link to={`/jobs/${job.id}`}>
            <div className="text-black font-bold text-xl mb-2">{job.title}</div>
          </Link>
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
            <>
              <li
                className="flex items-center justify-center text-gray-500 cursor-pointer hover:text-gray-400"
                onClick={(e) => {
                  like(job);
                }}
              >
                {liked === false && <LikeOuletIcon />}
                {liked === true && <LikeIcon />}
                <span>{likeCount}</span>
              </li>
              <li
                className="flex items-center justify-center text-gray-500 cursor-pointer hover:text-gray-400"
                onClick={() => {
                  unlike(job);
                }}
              >
                {unliked === false && <UnlikeOutletIcon />}
                {unliked === true && <UnlikeIcon />}
                <span>{unlikeCount}</span>
              </li>
              {profile_state.role === "kol" && (
                <li className="flex items-center justify-center text-gray-500 cursor-pointer hover:text-gray-400">
                  <BookMarkIcon />
                </li>
              )}
              <li className="flex text-gray-500 cursor-pointer hover:text-gray-400">
                <WarningIcon />
              </li>
            </>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Job;
