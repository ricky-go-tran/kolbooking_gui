import {
  Alert,
  Button,
  Input,
  Label,
  Select,
  Textarea,
} from "@windmill/react-ui"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { getCDNImage, getProxy } from "../../../utils/PathUtil"
import { DEFAULT_AVATAR } from "../../../global_variable/global_constant"
import { useContext, useEffect, useRef, useState } from "react"
import "../../../assets/css/component/avatar_input.css"
import { IndustryWithoutDescription } from "../../../global_variable/global_type"
import axios from "axios"
import { fetchDataToIndustryWithoutDescription } from "../../../utils/FetchData"
import { ProfileContext } from "../../../contexts/ProfileContext"
import { ToastContext } from "../../../contexts/ToastContext"
import { useNavigate } from "react-router-dom"
import { StatusLoginContext } from "../../../contexts/StatusLoginContext"
import { AuthContext } from "../../../contexts/AuthContext"
import { generalMessage } from "../../../utils/ToastUtil"
import { ErrorContext } from "../../../contexts/ErrorContext"
import { HandleResponseError } from "../../../utils/ErrorHandleUtil"

const KolSetupProfile = () => {
  const [avatar, setAvatar] = useState<File | null>(null)
  const [message, setMessage] = useState("")
  const [profileData, setProfileData] = useState({
    avatar: getCDNImage(DEFAULT_AVATAR),
    fullname: "",
    birthday: "",
    phone: "",
    address: "",
    facebook_path: "",
    youtube_path: "",
    instagram_path: "",
    tiktok_path: "",
    about_me: "",
  })
  const previewAvatar = useRef<HTMLImageElement>(null)
  const [industries, setIndustries] = useState<IndustryWithoutDescription[]>([])
  const [selectIndustries, setSelectIndustries] = useState<
    IndustryWithoutDescription[]
  >([])
  const { state: auth_state } = useContext(AuthContext)
  const { state: profile_state, dispatch: profile_dispatch } =
    useContext(ProfileContext)
  const { state: toast_state, dispatch: toast_dispatch } =
    useContext(ToastContext)
  const { state: status_state, dispatch: status_dispatch } =
    useContext(StatusLoginContext)
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

  const handleChangeAboutme = (value: string) => {
    if (value !== profileData.about_me) {
      setProfileData({ ...profileData, about_me: value })
    }
  }

  const handleCreateProfile = () => {
    let formData = new FormData()
    if (avatar !== null) {
      formData.append("kol[avatar]", avatar)
    }
    formData.append("kol[fullname]", profileData.fullname)
    formData.append("kol[birthday]", profileData.birthday)
    formData.append("kol[phone]", profileData.phone)
    formData.append("kol[address]", profileData.address)
    formData.append(
      "kol[kol_profile_attributes][facebook_path]",
      profileData.facebook_path
    )
    formData.append(
      "kol[kol_profile_attributes][tiktok_path]",
      profileData.tiktok_path
    )
    formData.append(
      "kol[kol_profile_attributes][instagram_path]",
      profileData.instagram_path
    )
    formData.append(
      "kol[kol_profile_attributes][youtube_path]",
      profileData.youtube_path
    )
    formData.append(
      "kol[kol_profile_attributes][about_me]",
      profileData.about_me
    )
    console.log(formData)
    axios
      .post(getProxy("/api/v1/setup_profiles/kol"), formData, {
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
          avatar: response.data.data.attributes.avatar,
          role: response.data.data.attributes.role,
          id: response.data.data.attributes.id,
        }
        profile_dispatch({ type: "FETCH", payload: handle_data })
        status_dispatch({ type: "valid" })
        navigate("/")
      })
      .catch((error) => {
        HandleResponseError(error, setErrorCode, toast_dispatch)
      })
  }

  useEffect(() => {
    axios
      .get(getProxy("/api/v1/industries"))
      .then((response) => {
        setIndustries(fetchDataToIndustryWithoutDescription(response.data.data))
      })
      .catch((error) => {
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

  return (
    <>
      <h1 className="mb-4 text-xl  font-semibold text-gray-700 dark:text-gray-200">
        Setup Kol Profile
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

      <hr className="mt-4" />

      <Label className="mt-4">
        <span>Facebook path</span>
        <Input
          crossOrigin=""
          css=""
          className="mt-1"
          type="text"
          placeholder="Your facebook path"
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
        <span>Youtube path</span>
        <Input
          crossOrigin=""
          css=""
          className="mt-1"
          type="text"
          placeholder="Your youtube path"
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
        <span>Tiktok path</span>
        <Input
          crossOrigin=""
          css=""
          className="mt-1"
          type="text"
          placeholder="Your tiktok path"
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
        <span>Instagram path</span>
        <Input
          crossOrigin=""
          css=""
          className="mt-1"
          type="text"
          placeholder="Your instagram path"
          onChange={(event) =>
            setProfileData({
              ...profileData,
              instagram_path: event.target.value,
            })
          }
          value={profileData.instagram_path}
        />
      </Label>
      <hr className="mt-4" />

      <div className="mt-4 mb-12">
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
          className="mt-1"
          css=""
          placeholder="About me."
          onChange={(event) => {
            addIndustry(event)
          }}
        >
          <option disabled selected>
            Industry
          </option>
          {industries.map((industry) => {
            return <option value={industry.id}>{industry.name}</option>
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

export default KolSetupProfile
