import { PROXY_SERVER } from "./global_constant";
import { leftTrimChar, rightTrimChar, trimChar } from "./StringUtil";
import { IComponent } from "./global_type";

export const getProxy = (path: string): string => {
  return rightTrimChar(PROXY_SERVER, "/") + "/" + leftTrimChar(path, "/")
}

