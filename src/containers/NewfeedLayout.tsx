import React, { useContext, Suspense, useEffect, lazy } from "react"
import Main from "./Main"
import NewfeedMain from "./NewfeedMain"
import Header from "../components/general/header/Header"
import Footer from "../components/general/footer/Footer"
import ToastPanel from "../components/general/message/ToastPanel"
import ReportModal from "../components/general/modal/ReportModal"
import { ReportJobGeneralContext } from "../contexts/ReportJobGeneralContext"
import { ReportProfileGeneralContext } from "../contexts/ReportProfileGeneralContext"
import ReportProfileModal from "../components/general/modal/ReportProfileModal"

const NewfeedLayout = ({ children }: { children: React.ReactNode }) => {
  const { state: report_job_state, dispatch: report_job_dispatch } = useContext(
    ReportJobGeneralContext
  )
  const { state: report_profile_state, dispatch: report_profile_dispatch } =
    useContext(ReportProfileGeneralContext)

  return (
    <>
      <div className="flex flex-col flex-1 w-full bg-gray-50 dark:bg-gray-900 min-h-screen">
        <Header />
        {report_job_state.id_job !== "" && <ReportModal />}
        {/* {report_profile_state.id_profile !== "" && <ReportProfileModal />} */}
        <NewfeedMain>{children}</NewfeedMain>
        <Footer />
      </div>
    </>
  )
}

export default NewfeedLayout
