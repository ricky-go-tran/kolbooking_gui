import { PROXY_SERVER, CDN_SERVER } from "../global_variable/global_constant";
import { leftTrimChar, rightTrimChar } from "./StringUtil";

export const getProxy = (path: string): string => {
  return rightTrimChar(PROXY_SERVER, "/") + "/" + leftTrimChar(path, "/");
};

export const getCDNImage = (path: string): string => {
  return rightTrimChar(CDN_SERVER, "/") + "/" + leftTrimChar(path, "/");
};
