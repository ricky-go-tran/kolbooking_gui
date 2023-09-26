import JobDetailBanner from "../../../components/general/jobs/JobDetailBanner";
import OwnerInfoCard from "../../../components/general/jobs/OwnerInforCard";
import { getCDNImage } from "../../../utils/PathUtil";
import { DEFAULT_AVATAR } from "../../../utils/global_constant";
import JobBasicInfo from "../../../components/general/jobs/JobBasicInfo";
import { useEffect, useState, useContext } from "react";
import {
  LikeIcon,
  UnlikeIcon,
  LikeOuletIcon,
  UnlikeOutletIcon,
  WarningIcon,
  BookMarkIcon,
} from "../../../icons";
import axios from "axios";
import { getProxy } from "../../../utils/PathUtil";
import { useParams } from "react-router-dom";
import { isAuth } from "../../../utils/AuthUtil";
import { AuthContext } from "../../../contexts/AuthContext";

const Detail = () => {
  const [data, setData] = useState<any>(null);
  const [liked, setLiked] = useState(false);
  const [unliked, setUnliked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [unlikeCount, setUnlikeCount] = useState(0);
  const { state: auth_state } = useContext(AuthContext);
  const params = useParams();

  useEffect(() => {
    axios
      .get(getProxy(`/api/v1/jobs/${params.id}`))
      .then((response) => {
        let data = response.data.data.attributes;
        setData(data);
        setLikeCount(data.like_num);
        setUnlikeCount(data.unlike_num);
        if (
          data.current_user_like === undefined ||
          data.current_user_like === null
        ) {
          setLiked(false);
        } else {
          setLiked(true);
        }

        if (
          data.current_user_unlike === undefined ||
          data.current_user_unlike === null
        ) {
          setUnliked(false);
        } else {
          setUnliked(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const like = (job: any) => {
    if (isAuth(auth_state)) {
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
            setLikeCount(likeCount + 1);
            setUnlikeCount(unlikeCount - 1);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const unlike = (job: any) => {
    if (isAuth(auth_state)) {
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
            setLikeCount(likeCount - 1);
            setUnlikeCount(unlikeCount + 1);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <JobDetailBanner />
      {data !== null && (
        <div className="w-full min-h-full bg-gray-100 pt-3">
          <div className="p-3">
            <div className="flex">
              <div className="w-3/4 flex flex-col items-center justify-start">
                <div className="w-11/12 bg-white rounded h-auto shadow-xl my-2">
                  <div className="mx-5 my-7">
                    <div className=" py-5 flex justify-start items-center border-b-2 border-gray-300">
                      <img
                        className="w-24 h-24 rounded ring-1 ring-gray-300 dark:ring-gray-500 p-1"
                        src={
                          data?.image === undefined || data.image === "null"
                            ? getCDNImage(DEFAULT_AVATAR)
                            : getProxy(data.image)
                        }
                        alt="Default avatar"
                      ></img>
                      <div className="ml-5">
                        <div className="text-gray-500 text-xl font-semibold font-sans">
                          {data?.title}
                        </div>
                        <div className="max-w-lg mt-3 2xl:max-w-2xl">
                          <span className="inline-block m-2 bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                            Fashion and Beauty
                          </span>
                          <span className="inline-block m-2 bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                            Food and Beverage
                          </span>
                          <span className="inline-block m-2 bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                            Health and Fitness
                          </span>
                          <span className="inline-block m-2 bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                            Food and Beverage
                          </span>
                          <span className="inline-block m-2 bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                            Health and Fitness
                          </span>
                        </div>
                      </div>
                      <ul className="flex-grow flex flex-row-reverse child">
                        <li className="flex text-gray-500 cursor-pointer hover:text-gray-400">
                          <WarningIcon />
                        </li>
                        <li className="flex items-center justify-center text-gray-500 cursor-pointer mr-5 hover:text-gray-400">
                          <BookMarkIcon />
                        </li>

                        <li
                          className="flex items-center justify-center text-gray-500 cursor-pointer mr-5 hover:text-gray-400"
                          onClick={(e) => {
                            unlike(data);
                          }}
                        >
                          {unliked === false && <UnlikeOutletIcon />}
                          {unliked === true && <UnlikeIcon />}
                          <span>{unlikeCount}</span>
                        </li>
                        <li
                          className="flex items-center justify-center text-gray-500 cursor-pointer mr-5 hover:text-gray-400"
                          onClick={(e) => {
                            like(data);
                          }}
                        >
                          {liked === false && <LikeOuletIcon />}
                          {liked === true && <LikeIcon />}
                          <span>{likeCount}</span>
                        </li>
                      </ul>
                    </div>
                    <div className="w-full text-lg mb-2 mt-5 select-none rounded-l-lg border-l-4 border-blue-400 bg-blue-50 p-2 font-medium hover:border-blue-500">
                      Job Details
                    </div>
                    <h6 className="text-lg font-bold dark:text-white">
                      Job Description
                    </h6>
                    <p className="my-5 text-sm   text-gray-900 dark:text-gray-400">
                      {data?.description}
                    </p>
                    <h6 className="text-lg font-bold dark:text-white">
                      Requirements
                    </h6>
                    <p className="my-5 text-sm   text-gray-900 dark:text-gray-400">
                      {data?.requirement}
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-1/4 flex flex-col items-center justify-start">
                <OwnerInfoCard owner={data?.owner?.data?.attributes} />
                <JobBasicInfo job={data} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;