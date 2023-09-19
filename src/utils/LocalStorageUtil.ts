import { ProfileType } from "./global_type";

export let TokenStorage = (): string => {
  let token: string = "";

  const storedToken = localStorage.getItem("token");
  if (storedToken === "null" || storedToken === null || storedToken === undefined || storedToken === "" || storedToken === "undefined") {
    token = "null";
  } else if (typeof storedToken === "string") {
    token = JSON.parse(storedToken);
  }
  return token;
}

export let ProfileStorage = (): ProfileType => {
  let profile: ProfileType = {
    fullname: "",
    avatar: "",
    role: ""
  }

  const storedProfile = localStorage.getItem("profile");
  if (storedProfile === "null" || storedProfile === null || storedProfile === undefined || storedProfile === "" || storedProfile === "undefined") {
    profile = { fullname: "", avatar: "", role: "" };
  } else if (typeof storedProfile === "string") {
    let temp = JSON.parse(storedProfile);
    profile = { fullname: temp.fullname, avatar: temp.avatar, role: temp.role };
  }
  return profile;
}

