import { ToastComponentType } from "./global_component_type";

export const TOAST_INIT_STATE: ToastComponentType = {
  id: `${Date.now()}`,
  type: "none",
  title: "",
  message: "",
  color: "",
};
