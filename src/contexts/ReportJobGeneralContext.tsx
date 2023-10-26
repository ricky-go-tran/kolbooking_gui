import React, { createContext, useReducer, ReactNode } from "react"
import { ReportJobType } from "../global_variable/global_type"
import { REPORT_JOB_INIT_STATE } from "../global_variable/global_constant"
import { ReportJobGeneralReducer } from "../reducers/ReportJobGeneralReducer"

export const ReportJobGeneralContext = createContext<{
  state: ReportJobType
  dispatch: React.Dispatch<any>
}>({
  state: REPORT_JOB_INIT_STATE,
  dispatch: () => null,
})

export const ReportJobGeneralContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [state, dispatch] = useReducer(
    ReportJobGeneralReducer,
    REPORT_JOB_INIT_STATE
  )

  return (
    <ReportJobGeneralContext.Provider value={{ state, dispatch }}>
      {children}
    </ReportJobGeneralContext.Provider>
  )
}
