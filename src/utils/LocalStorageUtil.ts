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

export let ProfileStorage = (): any => {
  let profile: any = {}

  const storedProfile = localStorage.getItem("profile");
  if (storedProfile === "null" || storedProfile === null) {
    profile = "null";
  } else if (typeof storedProfile === "string") {
    profile = JSON.parse(storedProfile);
  }
  return profile;
}

