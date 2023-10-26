import { useContext, useEffect, useState } from "react"
import { EditIcon } from "../../../icons"
import { AuthContext } from "../../../contexts/AuthContext"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import {
  IndustryAssocationNestd,
  IndustryAssociation,
  IndustryWithoutDescription,
  KolProfile,
} from "../../../global_variable/global_type"
import { Input, Label, Select } from "@windmill/react-ui"
import axios, { AxiosResponse } from "axios"
import { getProxy } from "../../../utils/PathUtil"
import {
  fetchDataToIndustryAssocations,
  fetchDataToIndustryWithoutDescription,
} from "../../../utils/FetchData"
import { KOL_PROFILE_EDIT_URL } from "../../../global_variable/global_uri_backend"
import { generalMessage, generalWarning } from "../../../utils/ToastUtil"
import { ToastContext } from "../../../contexts/ToastContext"
import { checkValid } from "../../../validates/kol/KolProfileValidate"
import { ErrorContext } from "../../../contexts/ErrorContext"
import { HandleResponseError } from "../../../utils/ErrorHandleUtil"

export const UpdateKolProfileModal = ({
  onClose,
}: {
  onClose: React.Dispatch<React.SetStateAction<number>>
}) => {
  const { state: auth_state } = useContext(AuthContext)
  const [profileData, setProfileData] = useState<KolProfile>({
    facebook_path: "",
    youtube_path: "",
    instagram_path: "",
    tiktok_path: "",
    about_me: "",
  })
  const [industries, setIndustries] = useState<IndustryWithoutDescription[]>([])
  const [industryAssociation, setIndustryAssociation] = useState<
    IndustryAssociation[]
  >([])
  const [selectIndustries, setSelectIndustries] = useState<
    IndustryWithoutDescription[]
  >([])
  const [loading, setLoading] = useState(false)
  const { dispatch: toast_dispatch } = useContext(ToastContext)
  const { setErrorCode } = useContext(ErrorContext)

  const fetchData = (response: AxiosResponse<any, any>) => {
    const data = response.data.data.attributes
    console.log(data)
    setProfileData({
      facebook_path: data.facebook_path,
      youtube_path: data.youtube_path,
      instagram_path: data.instagram_path,
      tiktok_path: data.tiktok_path,
      about_me: data.about_me,
    })
    setIndustryAssociation(
      fetchDataToIndustryAssocations(data.industry_associations.data)
    )
  }

  useEffect(() => {
    const config = { headers: { Authorization: auth_state.auth_token } }
    axios
      .get(getProxy("/api/v1/industries"))
      .then((response) => {
        setIndustries(fetchDataToIndustryWithoutDescription(response.data.data))
      })
      .catch((error) => {
        HandleResponseError(error, setErrorCode, toast_dispatch)
      })
    axios
      .put(getProxy(KOL_PROFILE_EDIT_URL), {}, config)
      .then((res) => {
        console.log(res)
        fetchData(res)
        setLoading(true)
      })
      .catch((error) => {
        HandleResponseError(error, setErrorCode, toast_dispatch)
      })
  }, [])

  useEffect(() => {
    if (industryAssociation.length !== 0) {
      setSelectIndustries(
        industries.filter((item) => {
          const rs = industryAssociation.find((association) => {
            return association.industry_id === item.id
          })
          return rs !== undefined
        })
      )
    }
  }, [industryAssociation])

  const addIndustry = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selected: IndustryWithoutDescription | undefined =
      selectIndustries.find(
        (element) => element.id.toString() === event.target.value
      )
    const item: IndustryWithoutDescription | undefined = industries.find(
      (element) => {
        return element.id.toString() === event.target.value
      }
    )
    if (selected === undefined && item !== undefined) {
      setSelectIndustries([...selectIndustries, item])
    }
  }

  const removeIndustry = (id_industry: string) => {
    const oldIndustry = selectIndustries.filter(
      (item) => item.id.toString() !== id_industry.toString()
    )
    setSelectIndustries([...oldIndustry])
  }

  const handleUpdateIndustry = () => {
    const new_industry: IndustryAssocationNestd[] = []
    selectIndustries.forEach((item) => {
      if (
        industryAssociation.find((association) => {
          return association.industry_id === item.id
        }) === undefined
      ) {
        new_industry.push({
          id: undefined,
          industry_id: item.id,
          _destroy: false,
        })
      }
    })
    industryAssociation.forEach((association) => {
      if (
        selectIndustries.find((item) => {
          return association.industry_id === item.id
        }) === undefined
      ) {
        new_industry.push({
          id: association.id,
          industry_id: association.industry_id,
          _destroy: true,
        })
      }
    })
    return new_industry
  }

  const submit = () => {
    const industries_association = handleUpdateIndustry()
    const param = {
      kol_profile: {
        tiktok_path: profileData.tiktok_path,
        youtube_path: profileData.youtube_path,
        facebook_path: profileData.facebook_path,
        instagram_path: profileData.instagram_path,
        about_me: profileData.about_me,
        industry_associations_attributes: industries_association,
      },
    }
    const config = {
      headers: {
        Authorization: auth_state.auth_token,
      },
    }
    axios
      .put(getProxy("/api/v1/kol/kol_profiles/change"), param, config)
      .then(() => {
        generalMessage({
          message: "Successfully update job",
          toast_dispatch: toast_dispatch,
        })
        onClose(-1)
      })
      .catch((error) => {
        HandleResponseError(error, setErrorCode, toast_dispatch)
      })
  }

  const updateSubmit = () => {
    const valid = checkValid({
      kol: profileData,
      industries: selectIndustries,
    })
    if (valid.status === true) {
      submit()
    } else {
      generalWarning({
        message: valid.message,
        toast_dispatch: toast_dispatch,
      })
    }
  }

  const handleChangeAboutme = (value: string) => {
    if (value !== profileData.about_me) {
      setProfileData({ ...profileData, about_me: value })
    }
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-11/12 lg:w-1/2 my-3 mx-auto max-w-7xl h-5/6">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col h-full w-full bg-white outline-none focus:outline-none dark:bg-gray-600">
            {/*header*/}
            <div className="flex items-center justify-start px-5 py-2 border-b border-solid border-slate-200 rounded-t">
              <span className="w-5 h-5 text-blue-400">
                <EditIcon />
              </span>
              <h3 className="text-lg font-semibold ml-3">Update Profile</h3>
            </div>
            {/*body*/}
            <div className="relative p-3 flex-auto  h-10/12 overflow-y-scroll">
              <div className="mx-5 my-2 flex flex-col items-center justify-center text-base font-medium">
                {loading === false && (
                  <div className="flex items-center justify-center h-96">
                    <div
                      style={{ borderTopColor: "transparent" }}
                      className="w-8 h-8 border-4 border-blue-600 rounded-full animate-spin"
                    ></div>
                    <p className="ml-2">Loading...</p>
                  </div>
                )}
                {loading === true && (
                  <div className="w-full px-4 py-3 mb-8 dark:bg-gray-800">
                    <Label className="mt-4">
                      <span>Tiktok Path</span>
                      <Input
                        css=""
                        className="mt-1"
                        placeholder="Your name"
                        crossOrigin=""
                        onChange={(event) =>
                          setProfileData({
                            ...profileData,
                            tiktok_path: event.target.value,
                          })
                        }
                        value={profileData.tiktok_path}
                      />
                    </Label>
                    <Label className="mt-4">
                      <span>Youtube Path</span>
                      <Input
                        crossOrigin=""
                        css=""
                        className="mt-1"
                        placeholder="Your birthday"
                        type="text"
                        onChange={(event) =>
                          setProfileData({
                            ...profileData,
                            youtube_path: event.target.value,
                          })
                        }
                        value={profileData.youtube_path}
                      />
                    </Label>
                    <Label className="mt-4">
                      <span>Facebook Path</span>
                      <Input
                        crossOrigin=""
                        css=""
                        className="mt-1"
                        placeholder="Your phone"
                        type="tel"
                        onChange={(event) =>
                          setProfileData({
                            ...profileData,
                            facebook_path: event.target.value,
                          })
                        }
                        value={profileData.facebook_path}
                      />
                    </Label>

                    <Label className="mt-4">
                      <span>Instagram Path</span>
                      <Input
                        crossOrigin=""
                        css=""
                        className="mt-1"
                        placeholder="Your phone"
                        type="tel"
                        onChange={(event) =>
                          setProfileData({
                            ...profileData,
                            instagram_path: event.target.value,
                          })
                        }
                        value={profileData.instagram_path}
                      />
                    </Label>

                    <div className="mt-4 mb-10">
                      <span>Overview</span>
                      <ReactQuill
                        theme="snow"
                        value={profileData.about_me}
                        onChange={handleChangeAboutme}
                        className="h-24 mb-5"
                      />
                    </div>

                    <Label className="mt-4">
                      <span>Industry</span>
                      <Select
                        css=""
                        className="mt-1"
                        onChange={(event) => {
                          addIndustry(event)
                        }}
                      >
                        <option disabled selected>
                          Industry
                        </option>
                        {industries.map((industry) => {
                          return (
                            <option value={industry.id}>{industry.name}</option>
                          )
                        })}
                      </Select>
                    </Label>
                    <div>
                      {selectIndustries.map((industry) => {
                        return (
                          <span
                            className="inline-block m-2 bg-blue-100 text-blue-800 cursor-pointer text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300"
                            onClick={() => {
                              removeIndustry(industry.id)
                            }}
                          >
                            {industry.name}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-4 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => onClose(-1)}
              >
                Close
              </button>
              <button
                className="bg-blue-400 text-white hover:bg-blue-500 active:bg-blue-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  updateSubmit()
                }}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black bg-opacity-60 backdrop-blur-sm"></div>
    </>
  )
}
