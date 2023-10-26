import { useContext, useEffect, useRef, useState } from "react"
import { ToastContext } from "../../../contexts/ToastContext"
import { AuthContext } from "../../../contexts/AuthContext"
import { ProfileContext } from "../../../contexts/ProfileContext"
import { EditIcon } from "../../../icons"
import { Alert, Input, Label, Textarea } from "@windmill/react-ui"
import axios from "axios"
import { getCDNImage, getProxy } from "../../../utils/PathUtil"
import { PROFILE_URL } from "../../../global_variable/global_uri_backend"
import "../../../assets/css/component/avatar_input.css"
import { generalMessage } from "../../../utils/ToastUtil"
import { ErrorContext } from "../../../contexts/ErrorContext"
import { HandleResponseError } from "../../../utils/ErrorHandleUtil"
import { DEFAULT_AVATAR } from "../../../global_variable/global_constant"

export const UpdateProfileModal = ({
  onClose,
}: {
  onClose: React.Dispatch<React.SetStateAction<number>>
}) => {
  const [avatar, setAvatar] = useState<File | null>(null)
  const previewAvatar = useRef<HTMLImageElement>(null)
  const { dispatch: toast_dispatch } = useContext(ToastContext)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const { state: auth_state } = useContext(AuthContext)
  const { state: profile_state, dispatch: profile_dispatch } =
    useContext(ProfileContext)
  const { setErrorCode } = useContext(ErrorContext)

  const [profileData, setProfileData] = useState({
    avatar: "",
    fullname: "",
    birthday: "",
    phone: "",
    address: "",
  })

  useEffect(() => {
    axios
      .get(getProxy(PROFILE_URL), {
        headers: {
          Authorization: auth_state.auth_token,
        },
      })
      .then((response) => {
        const handle_data = response.data.data.attributes
        setProfileData({
          avatar: handle_data.avatar,
          fullname: handle_data.fullname,
          birthday: handle_data.birthday,
          phone: handle_data.phone,
          address: handle_data.address,
        })
        setLoading(true)
      })
      .catch((error) => {
        HandleResponseError(error, setErrorCode, toast_dispatch)
      })
  }, [])

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
          previewAvatar.current.src = `url(${profile_state.avatar})`
        }
        setAvatar(null)
        setProfileData({ ...profileData, avatar: profile_state.avatar })
        setMessage("Upload file under 1mb")
      }
    } else {
      if (previewAvatar.current !== null) {
        previewAvatar.current.src = `${profile_state.avatar}`
      }
      setAvatar(null)
      setMessage("Support type png, jpg and jpeg only")
    }
  }

  const handleChangeProfile = () => {
    const formData = new FormData()
    if (avatar !== null) {
      formData.append("profile[avatar]", avatar)
    }
    formData.append("profile[fullname]", profileData.fullname)
    formData.append("profile[birthday]", profileData.birthday)
    formData.append("profile[phone]", profileData.phone)
    formData.append("profile[address]", profileData.address)
    console.log(formData)
    axios
      .put(getProxy("/api/v1/profiles/change"), formData, {
        headers: {
          Authorization: auth_state.auth_token,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        onClose(-1)
        generalMessage({
          message: "Profile change successfully",
          toast_dispatch: toast_dispatch,
        })
        const handle_data = {
          fullname: response.data.data.attributes.fullname,
          avatar: getProxy(response.data.data.attributes.avatar),
          role: response.data.data.attributes.role,
        }
        profile_dispatch({ type: "FETCH", payload: handle_data })
      })
      .catch((error) => {
        HandleResponseError(error, setErrorCode, toast_dispatch)
      })
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
                {loading === true && (
                  <div className="w-full px-4 py-3 mb-8 dark:bg-gray-800">
                    <Label className="flex flex-col">
                      <span className="mb-2">Avatar</span>
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
                              src={
                                profileData.avatar !== "null"
                                  ? getProxy(profileData.avatar)
                                  : getCDNImage(DEFAULT_AVATAR)
                              }
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
                      <span>Full name</span>
                      <Input
                        css=""
                        className="mt-1"
                        placeholder="Your name"
                        crossOrigin=""
                        onChange={(event) =>
                          setProfileData({
                            ...profileData,
                            fullname: event.target.value,
                          })
                        }
                        value={profileData.fullname}
                      />
                    </Label>
                    <Label className="mt-4">
                      <span>Birthday</span>
                      <Input
                        crossOrigin=""
                        css=""
                        className="mt-1"
                        placeholder="Your birthday"
                        type="date"
                        onChange={(event) =>
                          setProfileData({
                            ...profileData,
                            birthday: event.target.value,
                          })
                        }
                        value={profileData.birthday}
                      />
                    </Label>
                    <Label className="mt-4">
                      <span>Phone</span>
                      <Input
                        crossOrigin=""
                        css=""
                        className="mt-1"
                        placeholder="Your phone"
                        type="tel"
                        onChange={(event) =>
                          setProfileData({
                            ...profileData,
                            phone: event.target.value,
                          })
                        }
                        value={profileData.phone}
                      />
                    </Label>

                    <Label className="mt-4">
                      <span>Address</span>
                      <Textarea
                        className="mt-1"
                        css=""
                        rows={5}
                        placeholder="Enter some long form content."
                        style={{ resize: "none" }}
                        onChange={(event) =>
                          setProfileData({
                            ...profileData,
                            address: event.target.value,
                          })
                        }
                        value={profileData.address}
                      />
                    </Label>
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
                  handleChangeProfile()
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
