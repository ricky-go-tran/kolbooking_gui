import React, { createContext, useReducer, ReactNode } from "react"
import { ToastComponentType } from "../global_variable/global_component_type"
import { ToastReducer } from "../reducers/ToastReducer"
import { ActionToastReducerType } from "../global_variable/global_type_action_reducer"

export const ToastContext = createContext<{
  state: ToastComponentType[]
  dispatch: React.Dispatch<ActionToastReducerType>
}>({
  state: [],
  dispatch: () => null,
})

export const ToastContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(ToastReducer, [])

  return (
    <ToastContext.Provider value={{ state, dispatch }}>
      {children}
    </ToastContext.Provider>
  )
}
