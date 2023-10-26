import React, { createContext, useEffect, useReducer, ReactNode } from "react"
import { INITIAL_STATUS_LOGIN_STATE } from "../global_variable/global_constant"
import { StatusLoginType } from "../global_variable/global_type"
import { StatusLoginReducer } from "../reducers/StatusLoginReducer"

export const StatusLoginContext = createContext<{
  state: StatusLoginType
  dispatch: React.Dispatch<any>
}>({
  state: INITIAL_STATUS_LOGIN_STATE,
  dispatch: () => null,
})

export const StatusLoginContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [state, dispatch] = useReducer(
    StatusLoginReducer,
    INITIAL_STATUS_LOGIN_STATE
  )
  useEffect(() => {
    localStorage.setItem("status", JSON.stringify(state.status))
  }, [state.status])

  return (
    <StatusLoginContext.Provider value={{ state, dispatch }}>
      {children}
    </StatusLoginContext.Provider>
  )
}
