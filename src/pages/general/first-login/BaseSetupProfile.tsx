import { Alert, Button, Input, Label, Textarea } from "@windmill/react-ui"
import "../../../assets/css/component/avatar_input.css"
import { useContext, useRef, useState } from "react"
import { getCDNImage, getProxy } from "../../../utils/PathUtil"
import { DEFAULT_AVATAR } from "../../../global_variable/global_constant"
import axios from "axios"
import { AuthContext } from "../../../contexts/AuthContext"
import { ToastContext } from "../../../contexts/ToastContext"
import { generalMessage } from "../../../utils/ToastUtil"
import { ProfileContext } from "../../../contexts/ProfileContext"
import { StatusLoginContext } from "../../../contexts/StatusLoginContext"
import { useNavigate } from "react-router-dom"
import { ErrorContext } from "../../../contexts/ErrorContext"
import { HandleResponseError } from "../../../utils/ErrorHandleUtil"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

const BaseSetupProfile = () => {
  const [avatar, setAvatar] = useState<File | null>(null)
  const [message, setMessage] = useState("")
  const [profileData, setProfileData] = useState({
    avatar: getCDNImage(DEFAULT_AVATAR),
    fullname: "",
    birthday: "",
    phone: "",
    address: "",
    type_profile: "personal",
    overview: "",
  })
  const previewAvatar = useRef<HTMLImageElement>(null)
  const { state: auth_state } = useContext(AuthContext)
  const { dispatch: profile_dispatch } = useContext(ProfileContext)
  const { dispatch: toast_dispatch } = useContext(ToastContext)
  const { dispatch: status_dispatch } = useContext(StatusLoginContext)
  const navigate = useNavigate()
  const { setErrorCode } = useContext(ErrorContext)

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
          previewAvatar.current.src = `${getCDNImage(DEFAULT_AVATAR)}`
        }
        setAvatar(null)
        setProfileData({ ...profileData, avatar: getCDNImage(DEFAULT_AVATAR) })
        setMessage("Upload file under 1mb")
      }
    } else {
      if (previewAvatar.current !== null) {
        previewAvatar.current.src = `${getCDNImage(DEFAULT_AVATAR)}`
      }
      setAvatar(null)
      setMessage("Support type png, jpg and jpeg only")
    }
  }

  const handleCreateProfile = () => {
    const formData = new FormData()
    const bussiness = {
      bussiness_profile: {
        type_profile: profileData.type_profile,
        overview: profileData.overview,
      },
    }
    const config = {
      headers: {
        Authorization: auth_state.auth_token,
        "Content-Type": "multipart/form-data",
      },
    }
    if (avatar !== null) {
      formData.append("base[avatar]", avatar)
    }
    formData.append("base[fullname]", profileData.fullname)
    formData.append("base[birthday]", profileData.birthday)
    formData.append("base[phone]", profileData.phone)
    formData.append("base[address]", profileData.address)
    console.log(formData)
    axios
      .post(getProxy("/api/v1/setup_profiles/base"), formData, config)
      .then((response) => {
        axios
          .post(getProxy("/api/v1/base/bussiness_profiles"), bussiness, config)
          .then(() => {
            generalMessage({
              message: "Profile change successfully",
              toast_dispatch: toast_dispatch,
            })
            const handle_data = {
              fullname: response.data.data.attributes.fullname,
              avatar: response.data.data.attributes.avatar,
              role: response.data.data.attributes.role,
              id: response.data.data.attributes.id,
            }
            profile_dispatch({ type: "FETCH", payload: handle_data })
            status_dispatch({ type: "valid" })
            navigate("/")
          })
      })
      .catch((error) => {
        HandleResponseError(error, setErrorCode, toast_dispatch)
      })
  }

  const handleChangeOverview = (value: string) => {
    if (value !== profileData.overview) {
      setProfileData({ ...profileData, overview: value })
    }
  }

  return (
    <>
      <h1 className="mb-4 text-xl  font-semibold text-gray-700 dark:text-gray-200">
        Setup Profile
      </h1>
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
                src={profileData.avatar}
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
          crossOrigin=""
          css=""
          className="mt-1"
          type="text"
          placeholder="Your name"
          onChange={(event) =>
            setProfileData({ ...profileData, fullname: event.target.value })
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
            setProfileData({ ...profileData, birthday: event.target.value })
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
            setProfileData({ ...profileData, phone: event.target.value })
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
          placeholder="Your address."
          style={{ resize: "none" }}
          onChange={(event) =>
            setProfileData({ ...profileData, address: event.target.value })
          }
          value={profileData.address}
        />
      </Label>

      <Label className="mt-4">
        <span>Type Profile</span>
        <select
          onChange={(event) =>
            setProfileData({
              ...profileData,
              type_profile: event.target.value,
            })
          }
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="personal">Personal</option>
          <option value="bussiness">Bussiness</option>
        </select>
      </Label>

      <div className="mt-4 mb-10">
        <span>Overview</span>
        <ReactQuill
          theme="snow"
          value={profileData.overview}
          onChange={handleChangeOverview}
          className="h-24 mb-5"
        />
      </div>
      <hr className="mt-4" />
      <Button
        block
        className="mt-6"
        onClick={() => {
          handleCreateProfile()
        }}
      >
        Confirm Setup
      </Button>
    </>
  )
}

export default BaseSetupProfile
