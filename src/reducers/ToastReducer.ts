import { ToastComponentType } from "../global_variable/global_component_type";
import { ActionToastReducerType } from "../global_variable/global_type_action_reducer";

export const ToastReducer = (
  state: ToastComponentType[],
  action: ActionToastReducerType
) => {
  switch (action.type) {
    case "ADD": {
      return [...state, action.payload];
    }
    case "CLOSE": {
      const oldState = state.filter((item) => {
        return item.id !== action.payload.id;
      });
      return [...oldState];
    }
    case "CLEAR":
      return [];
    default: {
      return state;
    }
  }
};
