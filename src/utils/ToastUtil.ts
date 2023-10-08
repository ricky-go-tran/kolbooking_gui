import { ToastComponentType } from "../global_variable/global_component_type";
import { ActionToastReducerType } from "../global_variable/global_type_action_reducer";

export const generalWarning = ({
  message,
  toast_dispatch,
}: {
  message: string;
  toast_dispatch: React.Dispatch<ActionToastReducerType>;
}) => {
  const errored: ToastComponentType = {
    id: Date.now() + "-warning",
    type: "warning",
    title: "Warning",
    message: message,
    color: "yellow",
  };
  toast_dispatch({ type: "ADD", payload: errored });
};

export const generalError = ({
  message,
  toast_dispatch,
}: {
  message: string;
  toast_dispatch: React.Dispatch<ActionToastReducerType>;
}) => {
  const errored: ToastComponentType = {
    id: Date.now() + "-error",
    type: "error",
    title: "Error",
    message: message,
    color: "red",
  };
  toast_dispatch({ type: "ADD", payload: errored });
};

export const generalMessage = ({
  message,
  toast_dispatch,
}: {
  message: string;
  toast_dispatch: React.Dispatch<ActionToastReducerType>;
}) => {
  const errored: ToastComponentType = {
    id: Date.now() + "-message",
    type: "success",
    title: "Message",
    message: message,
    color: "blue",
  };
  toast_dispatch({ type: "ADD", payload: errored });
};
