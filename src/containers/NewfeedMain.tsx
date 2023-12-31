import React from "react"
import { IMainContainer } from "../global_variable/global_type"

const NewfeedMain = ({ children }: IMainContainer) => {
  return <main className="h-full w-full overflow-y-auto">{children}</main>
}

export default NewfeedMain
