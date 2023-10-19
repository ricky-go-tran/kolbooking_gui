import { Alert, Input, Label, Select, Textarea } from "@windmill/react-ui"
import { AddIcon, WarningIcon } from "../../../icons"
import { useContext, useEffect, useRef, useState } from "react"
import {
  IndustryWithoutDescription,
  Job,
} from "../../../global_variable/global_type"
import axios from "axios"
import { fetchDataToIndustryWithoutDescription } from "../../../utils/FetchData"
import { getCDNImage, getProxy } from "../../../utils/PathUtil"
import { AuthContext } from "../../../contexts/AuthContext"
import { ProfileContext } from "../../../contexts/ProfileContext"
import { DEFAULT_IMAGE } from "../../../global_variable/global_constant"
import "../../../assets/css/component/avatar_input.css"
import { checkValid } from "../../../validates/base/CreateJobValidate"
import Toast from "../../general/message/toast_component/Toast"
import { ToastContext } from "../../../contexts/ToastContext"
import { generalMessage, generalWarning } from "../../../utils/ToastUtil"
import { ErrorContext } from "../../../contexts/ErrorContext"
import { HandleResponseError } from "../../../utils/ErrorHandleUtil"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

const JobBookingModal = ({
  kol_id,
  onClose,
}: {
  kol_id: string
  onClose: React.Dispatch<string>
}) => {
  const [message, setMessage] = useState("")
  const [avatar, setAvatar] = useState<File | null>(null)
  const previewAvatar = useRef<HTMLImageElement>(null)
  const { dispatch: toast_dispatch } = useContext(ToastContext)
  const { state: auth_state, dispatch: auth_dispatch } = useContext(AuthContext)
  const { state: profile_state, dispatch: profile_dispatch } =
    useContext(ProfileContext)

  const { setErrorCode } = useContext(ErrorContext)
  const [industries, setIndustries] = useState<IndustryWithoutDescription[]>([])
  const [selectIndustries, setSelectIndustries] = useState<
    IndustryWithoutDescription[]
  >([])
  const [job, setJob] = useState<Job>({
    id: "",
    title: "",
    description: "",
    requirement: "",
    profile_id: "",
    price: 0,
    kol_id: "",
    image: "",
    benefits: "",
    time_work: "",
  })

  useEffect(() => {
    axios
      .get(getProxy("/api/v1/industries"))
      .then((response) => {
        setIndustries(fetchDataToIndustryWithoutDescription(response.data.data))
      })
      .catch((error) => {
        console.log(error)
        HandleResponseError(error, setErrorCode, toast_dispatch)
      })
  }, [])

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

  const submit = () => {
    let count = 0
    let formData = new FormData()
    if (avatar !== null) {
      formData.append("job[image]", avatar)
    }
    formData.append("job[title]", job.title)
    formData.append("job[description]", job.description)
    formData.append("job[requirement]", job.requirement)
    formData.append("job[price]", job.price.toString())
    formData.append("job[profile_id]", profile_state.id)
    formData.append("job[benefits]", job.benefits)
    formData.append("job[time_work]", job.time_work)
    let industries_association = selectIndustries.map((item) => {
      return { industry_id: item.id }
    })
    const industries_association_json = JSON.stringify(industries_association)
    formData.append(
      "job[industry_associations_attributes]",
      industries_association_json
    )

    const config = {
      headers: {
        Authorization: auth_state.auth_token,
      },
    }

    if (kol_id !== undefined) {
      formData.append("job[kol_id]", kol_id)
    }
    axios
      .post(getProxy("/api/v1/base/jobs/booking"), formData, config)
      .then((response) => {
        generateNotification()
        generalMessage({
          message:
            "Successfully booking job. Your booking will send realtime to kol",
          toast_dispatch: toast_dispatch,
        })
        onClose("-1")
      })
      .catch((error) => {
        HandleResponseError(error, setErrorCode, toast_dispatch)
      })
  }

  const generateNotification = () => {
    const config = {
      headers: {
        Authorization: auth_state.auth_token,
      },
    }
    const param = {
      notification: {
        title: `${profile_state.fullname} has been booking you`,
        description: `User ${
          profile_state.fullname
        } haved booking you to job name ${
          job.title
        } at ${new Date().toDateString()}`,
        type_notice: "notification",
        sender_id: profile_state.id,
        receiver_id: kol_id,
      },
    }
    axios
      .post(getProxy("/api/v1/notifications"), param, config)
      .catch((error) => {
        HandleResponseError(error, setErrorCode, toast_dispatch)
      })
  }

  const createSubmit = () => {
    const valid = checkValid({
      job: job,
      image: avatar,
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

  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) {
      setMessage("Image not found")
      return
    }
    const file = event.target.files[0]
    const type = file.type.split("/")[1]
    const max_size_support = 1000000 // 1mb
    const supportFile = ["jpeg", "png"]
    const reader = new FileReader()
    if (supportFile.includes(type)) {
      if (file.size <= max_size_support) {
        setAvatar(file)
        setMessage("")
        reader.onload = (event) => {
          const fileContent = event?.target?.result
          if (previewAvatar.current !== null) {
            previewAvatar.current.src = `${fileContent}`
          }
        }
        reader.readAsDataURL(file)
      } else {
        if (previewAvatar.current !== null) {
          previewAvatar.current.src = `url(${getCDNImage(DEFAULT_IMAGE)})`
        }
        setAvatar(null)
        setMessage("Upload file under 1mb")
      }
    } else {
      if (previewAvatar.current !== null) {
        previewAvatar.current.src = `url(${getCDNImage(DEFAULT_IMAGE)})`
      }
      setAvatar(null)
      setMessage("Support type png, jpg and jpeg only")
    }
  }

  const handleChangeDescription = (value: string) => {
    setJob({ ...job, description: value })
  }

  const handleChangeRequirement = (value: string) => {
    setJob({ ...job, requirement: value })
  }

  const handleChangeBenefit = (value: string) => {
    setJob({ ...job, benefits: value })
  }

  const handleChangeTimework = (value: string) => {
    setJob({ ...job, time_work: value })
  }

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-11/12 lg:w-1/2 my-3 mx-auto max-w-7xl h-5/6">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col h-full w-full bg-white outline-none focus:outline-none dark:bg-gray-600">
            {/*header*/}
            <div className="flex items-center justify-start px-5 py-2 border-b border-solid border-slate-200 rounded-t">
              <span className="w-5 h-5 text-green-400">
                <AddIcon />
              </span>
              <h3 className="text-lg font-semibold ml-3">Booking job</h3>
            </div>
            {/*body*/}
            <div className="relative p-3 flex-auto  h-10/12 overflow-y-scroll">
              <div className="mx-5 my-2 flex flex-col items-center justify-center text-base font-medium">
                <div className="flex flex-col justify-between items-center w-full">
                  <div className="p-4 rounded-full bg-green-100">
                    <svg className="w-10 h-10 text-green-300 ">
                      <AddIcon />
                    </svg>
                  </div>
                  <h6 className="font-semibold text-base mt-2">
                    Booking job form
                  </h6>
                  <div className="w-9/12">
                    {message !== "" && (
                      <Alert
                        type="danger"
                        className="my-5"
                        onClose={() => {
                          setMessage("")
                        }}
                      >
                        {message}
                      </Alert>
                    )}
                    <Label className="mt-4">
                      <span>Image Job</span>
                      <div className="personal-image">
                        <label className="label">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              handleFileInputChange(e)
                            }}
                          />
                          <figure className="personal-figure">
                            <img
                              src={getCDNImage(DEFAULT_IMAGE)}
                              className="personal-avatar"
                              alt="avatar"
                              ref={previewAvatar}
                            />
                            <figcaption className="personal-figcaption">
                              <img
                                src="https://raw.githubusercontent.com/ThiagoLuizNunes/angular-boilerplate/master/src/assets/imgs/camera-white.png"
                                alt="camera"
                              />
                            </figcaption>
                          </figure>
                        </label>
                      </div>
                    </Label>
                    <Label className="mt-4">
                      <span>Title</span>
                      <Input
                        crossOrigin=""
                        css=""
                        className="mt-1"
                        type="text"
                        placeholder="Title Job"
                        required
                        onChange={(event) =>
                          setJob({ ...job, title: event.target.value })
                        }
                        value={job.title}
                      />
                    </Label>

                    <div className="mt-4 h-30">
                      <span className="my-3">Description</span>
                      <ReactQuill
                        theme="snow"
                        value={job.description}
                        onChange={handleChangeDescription}
                        className="h-24 mb-5"
                      />
                    </div>

                    <div className="mt-14 h-32">
                      <span className="my-3">Requirement</span>
                      <ReactQuill
                        theme="snow"
                        value={job.requirement}
                        onChange={handleChangeRequirement}
                        className="h-24 mb-5"
                      />
                    </div>

                    <div className="mt-14 h-32">
                      <span className="my-3">Benefits</span>
                      <ReactQuill
                        theme="snow"
                        value={job?.benefits}
                        onChange={handleChangeBenefit}
                        className="h-24 mb-5"
                      />
                    </div>
                    <div className="mt-14 h-32">
                      <span className="my-3">How & when to work</span>
                      <ReactQuill
                        theme="snow"
                        value={job?.time_work}
                        onChange={handleChangeTimework}
                        className="h-24 mb-5"
                      />
                    </div>

                    <Label className="mt-14">
                      <span>Price</span>
                      <Input
                        crossOrigin=""
                        css=""
                        className="mt-1"
                        type="number"
                        placeholder="Price"
                        required
                        min={0}
                        onChange={(event) =>
                          setJob({ ...job, price: Number(event.target.value) })
                        }
                        value={job.price}
                      />
                    </Label>
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
                </div>
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-4 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => onClose("-1")}
              >
                Close
              </button>
              <button
                className="bg-green-400 text-white hover:bg-green-500 active:bg-green-500 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => {
                  createSubmit()
                }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-40 bg-black bg-opacity-60 backdrop-blur-sm"></div>
    </>
  )
}

export default JobBookingModal
