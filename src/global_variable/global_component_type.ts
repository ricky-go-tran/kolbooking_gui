export type ToastComponentType = {
  id: string;
  type: "warning" | "success" | "error" | "none";
  title: string;
  message: string;
  color: string;
};
