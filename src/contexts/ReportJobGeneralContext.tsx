import React, { createContext, useEffect, useReducer, ReactNode } from "react";
import { ReportJobType } from "../utils/global_type";
import { REPORT_JOB_INIT_STATE } from "../utils/global_constant";
import { ReportJobGeneralReducer } from "../reducers/ReportJobGeneralReducer";

export const ReportJobGeneralContext = createContext<{
  state: ReportJobType;
  dispatch: React.Dispatch<any>;
}>({
  state: REPORT_JOB_INIT_STATE,
  dispatch: () => null,
});

export const ReportJobGeneralContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(
    ReportJobGeneralReducer,
    REPORT_JOB_INIT_STATE
  );

  return (
    <ReportJobGeneralContext.Provider value={{ state, dispatch }}>
      {children}
    </ReportJobGeneralContext.Provider>
  );
};
