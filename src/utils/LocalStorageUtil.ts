export let TokenStorage = () => {
  let token: string | null = null;

  const storedToken = localStorage.getItem("token");
  if (storedToken === "null" || storedToken === null) {
    token = "null";
  } else if (typeof storedToken === "string") {
    token = JSON.parse(storedToken);
  }
  return token;
}

export let ProfileStorage = () => {
  let profile: any = {}

  const storedProfile = localStorage.getItem("profile");
  if (storedProfile === "null" || storedProfile === null) {
    profile = "null";
  } else if (typeof storedProfile === "string") {
    profile = JSON.parse(storedProfile);
  }
  return profile;
}

