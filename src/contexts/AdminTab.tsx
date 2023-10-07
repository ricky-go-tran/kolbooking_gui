import { ReactNode, createContext, useState } from "react"

export const AdminTabContext = createContext<{
  tab: string
  setTab: React.Dispatch<any>
}>({ tab: "", setTab: () => null })

export const AdminTabContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [tab, setTab] = useState<string>("")
  const value = { tab, setTab }
  return (
    <AdminTabContext.Provider value={value}>
      {children}
    </AdminTabContext.Provider>
  )
}
