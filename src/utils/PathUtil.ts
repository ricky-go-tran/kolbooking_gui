import { PROXY_SERVER, CDN_SERVER } from "./global_constant";
import { leftTrimChar, rightTrimChar, trimChar } from "./StringUtil";
import { IComponent } from "./global_type";

export const getProxy = (path: string): string => {
  return rightTrimChar(PROXY_SERVER, "/") + "/" + leftTrimChar(path, "/")
}

export const getCDNImage = (path: string): string => {
  return rightTrimChar(CDN_SERVER, "/") + "/" + leftTrimChar(path, "/")
}

