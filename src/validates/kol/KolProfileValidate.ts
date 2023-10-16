import {
  KolProfile,
  Validate,
  IndustryWithoutDescription,
} from "../../global_variable/global_type"
import {
  isFacebookURL,
  isInstagramURL,
  isTikTokURL,
  isYouTubeURL,
} from "../URIValidate"

export const checkValid = ({
  kol,
  industries,
}: {
  kol: KolProfile
  industries: IndustryWithoutDescription[]
}): Validate => {
  const rs: Validate = { status: true, message: "" }
  if (!isFacebookURL(kol.facebook_path)) {
    return { status: false, message: "Facebook is not available" }
  } else if (!isYouTubeURL(kol.youtube_path)) {
    return { status: false, message: "Youtube is not available" }
  } else if (!isInstagramURL(kol.instagram_path)) {
    return { status: false, message: "Instagrame is not available" }
  } else if (!isTikTokURL(kol.tiktok_path)) {
    return { status: false, message: "Tiktok is not available" }
  } else if (kol.about_me.trim().length <= 6) {
    return {
      status: false,
      message: "About me length must more than 6 characters",
    }
  } else if (industries.length === 0) {
    return { status: false, message: "Must have at least one industry" }
  }
  return rs
}
