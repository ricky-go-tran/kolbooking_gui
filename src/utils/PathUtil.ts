import {
  PROXY_SERVER,
  CDN_SERVER,
  FE_URL,
} from "../global_variable/global_constant"
import { leftTrimChar, rightTrimChar } from "./StringUtil"

export const getProxy = (path: string): string => {
  return rightTrimChar(PROXY_SERVER, "/") + "/" + leftTrimChar(path, "/")
}
export const getFEHost = (path: string): string => {
  return rightTrimChar(FE_URL, "/") + "/" + leftTrimChar(path, "/")
}

export const getCDNImage = (path: string): string => {
  return rightTrimChar(CDN_SERVER, "/") + "/" + leftTrimChar(path, "/")
}
