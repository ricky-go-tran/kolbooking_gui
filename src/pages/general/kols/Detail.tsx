import axios from "axios";
import { useState, useEffect, useContext } from "react";
import {
  PeopleIcon,
  IndustryIcon,
  CalendarIcon,
  LineChartIcon,
} from "../../../icons";
import { getProxy, getCDNImage } from "../../../utils/PathUtil";
import { DEFAULT_AVATAR } from "../../../global_variable/global_constant";
import { useParams } from "react-router-dom";
import { isAuth } from "../../../utils/AuthUtil";
import { AuthContext } from "../../../contexts/AuthContext";

const Detail = () => {
  const [data, setData] = useState<any>(null);
  const { state: auth_state } = useContext(AuthContext);
  const params = useParams();

  useEffect(() => {
    let config = {};
    if (isAuth(auth_state)) {
      config = {
        headers: { Authorization: auth_state.auth_token },
      };
    }
    axios
      .get(getProxy(`/api/v1/kols/${params.id}`), { ...config })
      .then((response) => {
        console.log(response);
        setData(response.data.data.attributes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {data !== null && (
        <div className="min-h-screen w-full bg-gray-100 flex py-4 dark:bg-gray-500">
          <div className="w-1/4 flex flex-col items-center justify-start">
            <div id="basic-info" className="max-w-xs w-4/5">
              <div className="w-full">
                <div className="bg-white shadow-xl rounded-lg py-3 max-w-xs dark:bg-gray-800">
                  <div className="photo-wrapper p-2">
                    <img
                      className="w-32 h-32 rounded-full mx-auto"
                      src={
                        data?.avatar === undefined || data.avatar === "null"
                          ? getCDNImage(DEFAULT_AVATAR)
                          : getProxy(data.avatar)
                      }
                      alt="Defaul avatar"
                    />
                  </div>
                  <div className="p-2 ">
                    <h3 className="text-center text-xl text-gray-900 font-medium leading-8 dark:text-gray-400">
                      {data?.fullname}
                    </h3>
                    <table className="text-xs my-3">
                      <tbody>
                        <tr>
                          <td className="px-2 py-2 text-gray-500 font-semibold">
                            Address
                          </td>
                          <td className="px-2 py-2 dark:text-gray-400">
                            {data?.address}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-2 py-2 text-gray-500 font-semibold">
                            Phone
                          </td>
                          <td className="px-2 py-2 dark:text-gray-400">
                            +84 {data?.phone}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-2 py-2 text-gray-500 font-semibold">
                            Email
                          </td>
                          <td className="px-2 py-2 dark:text-gray-400">
                            {data?.email}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div id="socical-media" className="max-w-xs w-4/5 mt-5">
              <div className="w-full">
                <div className="bg-white shadow-xl rounded-lg py-3 max-w-sx dark:bg-gray-800">
                  <div className="p-2">
                    <h3 className="text-center text-xl text-gray-400 font-medium leading-8">
                      Social Media
                    </h3>
                    <table className="text-xs my-3">
                      <tbody>
                        <tr>
                          <td className="px-11 py-2">
                            {data?.kol?.data?.attributes?.instagram_path !==
                              "null" && (
                              <button className="bg-blue-400 px-7 py-2 font-semibold text-white inline-flex items-center space-x-2 rounded">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-8 h-5 fill-current"
                                  x="0px"
                                  y="0px"
                                  width="30"
                                  height="30"
                                  viewBox="0 0 30 30"
                                  fill="currentFill"
                                >
                                  <path d="M 9.9980469 3 C 6.1390469 3 3 6.1419531 3 10.001953 L 3 20.001953 C 3 23.860953 6.1419531 27 10.001953 27 L 20.001953 27 C 23.860953 27 27 23.858047 27 19.998047 L 27 9.9980469 C 27 6.1390469 23.858047 3 19.998047 3 L 9.9980469 3 z M 22 7 C 22.552 7 23 7.448 23 8 C 23 8.552 22.552 9 22 9 C 21.448 9 21 8.552 21 8 C 21 7.448 21.448 7 22 7 z M 15 9 C 18.309 9 21 11.691 21 15 C 21 18.309 18.309 21 15 21 C 11.691 21 9 18.309 9 15 C 9 11.691 11.691 9 15 9 z M 15 11 A 4 4 0 0 0 11 15 A 4 4 0 0 0 15 19 A 4 4 0 0 0 19 15 A 4 4 0 0 0 15 11 z"></path>
                                </svg>
                                <span className="w-16">Instgram</span>
                              </button>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-11 py-2">
                            {data?.kol?.data?.attributes?.facebook_path !==
                              "null" && (
                              <button className="bg-blue-500 px-7 py-2 font-semibold text-white inline-flex items-center space-x-2 rounded">
                                <svg
                                  className="w-8 h-5 fill-current"
                                  role="img"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                                <span className="w-16">Facebook</span>
                              </button>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-11 py-2">
                            {data?.kol?.data?.attributes?.youtube_path !==
                              "null" && (
                              <button className="bg-red-500 px-7 py-2 font-semibold text-white inline-flex items-center space-x-2 rounded">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-8 h-5 fill-current"
                                  x="0px"
                                  y="0px"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 30 30"
                                  fill="currentFill"
                                >
                                  <path d="M 15 4 C 10.814 4 5.3808594 5.0488281 5.3808594 5.0488281 L 5.3671875 5.0644531 C 3.4606632 5.3693645 2 7.0076245 2 9 L 2 15 L 2 15.001953 L 2 21 L 2 21.001953 A 4 4 0 0 0 5.3769531 24.945312 L 5.3808594 24.951172 C 5.3808594 24.951172 10.814 26.001953 15 26.001953 C 19.186 26.001953 24.619141 24.951172 24.619141 24.951172 L 24.621094 24.949219 A 4 4 0 0 0 28 21.001953 L 28 21 L 28 15.001953 L 28 15 L 28 9 A 4 4 0 0 0 24.623047 5.0546875 L 24.619141 5.0488281 C 24.619141 5.0488281 19.186 4 15 4 z M 12 10.398438 L 20 15 L 12 19.601562 L 12 10.398438 z"></path>
                                </svg>
                                <span className="w-16">Youtube</span>
                              </button>
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td className="px-11 py-2">
                            {data?.kol?.data?.attributes?.tiktok_path !==
                              "null" && (
                              <button className="bg-gray-700 px-7 py-2 font-semibold text-white inline-flex items-center space-x-2 rounded">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-8 h-5 fill-current"
                                  x="0px"
                                  y="0px"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 30 30"
                                  fill="currentFill"
                                >
                                  <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.104,4,24,4z M22.689,13.474 c-0.13,0.012-0.261,0.02-0.393,0.02c-1.495,0-2.809-0.768-3.574-1.931c0,3.049,0,6.519,0,6.577c0,2.685-2.177,4.861-4.861,4.861 C11.177,23,9,20.823,9,18.139c0-2.685,2.177-4.861,4.861-4.861c0.102,0,0.201,0.009,0.3,0.015v2.396c-0.1-0.012-0.197-0.03-0.3-0.03 c-1.37,0-2.481,1.111-2.481,2.481s1.11,2.481,2.481,2.481c1.371,0,2.581-1.08,2.581-2.45c0-0.055,0.024-11.17,0.024-11.17h2.289 c0.215,2.047,1.868,3.663,3.934,3.811V13.474z"></path>
                                </svg>
                                <span className="w-16">Tiktok</span>
                              </button>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-3/4 flex flex-col items-start justify-start">
            <div className="w-11/12 bg-white rounded h-auto shadow-xl my-2 dark:bg-gray-800">
              <div className="mx-5 my-7">
                <div className="flex justify-start">
                  <PeopleIcon className="text-gray-400 w-6 h-6" />
                  <span className="text-base text-gray-400 font-semibold ml-4">
                    About me
                  </span>
                </div>
                <p className="my-5 text-sm   text-gray-900 dark:text-gray-400">
                  {data?.kol?.data?.attributes?.about_me}
                </p>
              </div>
            </div>
            <div className="w-11/12 bg-white rounded h-auto shadow-xl my-2 dark:bg-gray-800">
              <div className="mx-5 my-7">
                <div className="flex justify-start">
                  <LineChartIcon className="text-gray-400 w-6 h-6" />
                  <span className="text-base text-gray-400 font-semibold ml-4 ">
                    Statisticals
                  </span>
                </div>
                <div className="px-4 py-10 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-10">
                  <div className="grid grid-cols-2 row-gap-8 md:grid-cols-4">
                    <div className="text-center">
                      <h6 className="text-3xl font-bold text-blue-600">
                        {data?.follow_num}
                      </h6>
                      <p className="font-bold dark:text-gray-400">Follower</p>
                    </div>
                    <div className="text-center">
                      <h6 className="text-3xl font-bold text-blue-600">
                        {data?.job_complete_num}
                      </h6>
                      <p className="font-bold dark:text-gray-400">
                        Complete Jobs
                      </p>
                    </div>
                    <div className="text-center">
                      <h6 className="text-3xl font-bold text-blue-600">
                        {data?.like_num}
                      </h6>
                      <p className="font-bold dark:text-gray-400">Like</p>
                    </div>
                    <div className="text-center">
                      <h6 className="text-3xl font-bold text-blue-600">
                        {data?.unlike_num}
                      </h6>
                      <p className="font-bold dark:text-gray-400">Unlike</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-11/12 bg-white rounded h-auto shadow-xl my-2 dark:bg-gray-800">
              <div className="mx-5 my-7">
                <div className="flex justify-start">
                  <IndustryIcon className="text-gray-400 w-6 h-6" />
                  <span className="text-base text-gray-400 font-semibold ml-4">
                    Industry
                  </span>
                </div>
                <div className="flex flex-wrap my-5">
                  {data?.kol?.data?.attributes?.industry?.data.map(
                    (industry: any) => {
                      return (
                        <span className="inline-block m-2 bg-blue-100 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                          {industry.attributes.name}
                        </span>
                      );
                    }
                  )}
                </div>
              </div>
            </div>

            <div className="w-11/12 bg-white rounded h-auto shadow-xl my-2 dark:bg-gray-800">
              <div className="mx-5 my-7">
                <div className="flex justify-start">
                  <CalendarIcon className="text-gray-400 w-6 h-6" />
                  <span className="text-base text-gray-400 font-semibold ml-4">
                    Calendar
                  </span>
                </div>
                <div className="flex flex-wrap my-5"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Detail;
