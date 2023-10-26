import React, { createContext, useReducer, ReactNode } from "react"
import { ReportProfileType } from "../global_variable/global_type"
import { REPORT_PROFILE_INIT_STATE } from "../global_variable/global_constant"
import { ReportProfileGeneralReducer } from "../reducers/ReportProfileGeneralReducer"

export const ReportProfileGeneralContext = createContext<{
  state: ReportProfileType
  dispatch: React.Dispatch<any>
}>({
  state: REPORT_PROFILE_INIT_STATE,
  dispatch: () => null,
})

export const ReportProfileGeneralContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [state, dispatch] = useReducer(
    ReportProfileGeneralReducer,
    REPORT_PROFILE_INIT_STATE
  )

  return (
    <ReportProfileGeneralContext.Provider value={{ state, dispatch }}>
      {children}
    </ReportProfileGeneralContext.Provider>
  )
}
