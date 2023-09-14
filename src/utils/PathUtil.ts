import { PROXY_SERVER } from "./global_constant";
import { leftTrimChar, rightTrimChar, trimChar } from "./StringUtil";

export const getProxy = (path: string): string => {
  return rightTrimChar(PROXY_SERVER, "/") + "/" + leftTrimChar(path, "/")
}
