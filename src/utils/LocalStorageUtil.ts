import { ProfileType, StatusLoginType } from "../global_variable/global_type"

export const TokenStorage = (): string => {
  let token = ""

  const storedToken = localStorage.getItem("token")
  if (
    storedToken === "null" ||
    storedToken === null ||
    storedToken === undefined ||
    storedToken === "" ||
    storedToken === "undefined"
  ) {
    token = "null"
  } else if (typeof storedToken === "string") {
    token = JSON.parse(storedToken)
  }
  return token
}

export const StatusStorage = (): StatusLoginType => {
  let result: StatusLoginType = {
    status: "",
  }

  const storedStatus = localStorage.getItem("status")
  if (
    storedStatus === "null" ||
    storedStatus === null ||
    storedStatus === undefined ||
    storedStatus === "" ||
    storedStatus === "undefined"
  ) {
    result = { status: "" }
  } else if (typeof storedStatus === "string") {
    const temp = JSON.parse(storedStatus)
    result = {
      status: temp,
    }
  }
  return result
}

export const ProfileStorage = (): ProfileType => {
  let profile: ProfileType = {
    id: "",
    fullname: "",
    avatar: "",
    role: "",
  }

  const storedProfile = localStorage.getItem("profile")
  if (
    storedProfile === "null" ||
    storedProfile === null ||
    storedProfile === undefined ||
    storedProfile === "" ||
    storedProfile === "undefined"
  ) {
    profile = { id: "", fullname: "", avatar: "", role: "" }
  } else if (typeof storedProfile === "string") {
    const temp = JSON.parse(storedProfile)
    profile = {
      fullname: temp.fullname,
      avatar: temp.avatar,
      role: temp.role,
      id: temp.id,
    }
  }
  return profile
}
