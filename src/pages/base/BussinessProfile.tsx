import PageTitle from "../../components/admin/typography/PageTitle"
import SectionTitle from "../../components/admin/typography/SectionTitle"
import { Input, Label, Textarea, Button, Alert } from "@windmill/react-ui"
import { useState, useContext, useEffect, useRef } from "react"
import { ProfileContext } from "../../contexts/ProfileContext"
import { AuthContext } from "../../contexts/AuthContext"
import axios from "axios"
import { getCDNImage, getProxy } from "../../utils/PathUtil"
import "../../assets/css/component/avatar_input.css"
import { PROFILE_URL } from "../../global_variable/global_uri_backend"
import { generalMessage } from "../../utils/ToastUtil"
import { ToastContext } from "../../contexts/ToastContext"
import { ErrorContext } from "../../contexts/ErrorContext"
import { HandleResponseError } from "../../utils/ErrorHandleUtil"
import { DEFAULT_AVATAR } from "../../global_variable/global_constant"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"

export const BussinessProfile = () => {
  const { state: auth_state } = useContext(AuthContext)
  const { state: profile_state, dispatch: profile_dispatch } =
    useContext(ProfileContext)
  const { state: toast_state, dispatch: toast_dispatch } =
    useContext(ToastContext)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [avatar, setAvatar] = useState<File | null>(null)
  const [profileData, setProfileData] = useState({
    avatar: "",
    fullname: "",
    birthday: "",
    phone: "",
    address: "",
    overview: "",
  })
  const previewAvatar = useRef<HTMLImageElement>(null)
  const { setErrorCode } = useContext(ErrorContext)

  useEffect(() => {
    axios
      .get(getProxy(PROFILE_URL), {
        headers: {
          Authorization: auth_state.auth_token,
        },
      })
      .then((response) => {
        let handle_data = response.data.data.attributes
        setProfileData({
          avatar: handle_data.avatar,
          fullname: handle_data.fullname,
          birthday: handle_data.birthday,
          phone: handle_data.phone,
          address: handle_data.address,
          overview: handle_data.overview,
        })
        setLoading(true)
      })
      .catch((error) => {
        HandleResponseError(error, setErrorCode, toast_dispatch)
        // navigate('/server/error')
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChangeOverview = (value: string) => {
    if (value !== profileData.overview) {
      setProfileData({ ...profileData, overview: value })
    }
  }

  const handleChangeProfile = () => {
    let formData = new FormData()
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
        generalMessage({
          message: "Profile change successfully",
          toast_dispatch: toast_dispatch,
        })
        let handle_data = {
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
  return (
    <>
      <PageTitle>Profile</PageTitle>

      <SectionTitle>Information</SectionTitle>
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
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
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
                    alt={getCDNImage(DEFAULT_AVATAR)}
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
              placeholder="Enter some long form content."
              style={{ resize: "none" }}
              onChange={(event) =>
                setProfileData({ ...profileData, address: event.target.value })
              }
              value={profileData.address}
            />
          </Label>

          <div className="mt-4">
            <span>Overview</span>
            <ReactQuill
              theme="snow"
              value={profileData.overview}
              onChange={handleChangeOverview}
              className="h-24 mb-5"
            />
          </div>

          <Button
            block
            className="mt-6"
            onClick={() => {
              handleChangeProfile()
            }}
          >
            Update Profile
          </Button>
        </div>
      )}
    </>
  )
}

export default BussinessProfile
