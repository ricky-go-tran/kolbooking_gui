import { ReactNode, createContext, useState } from "react"

export const SearchStorageAdminContext = createContext<{
  searchStorage: string
  setSearchStorage: React.Dispatch<any>
}>({ searchStorage: "", setSearchStorage: () => null })

export const SearchStorageAdminContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [searchStorage, setSearchStorage] = useState<string>("")
  const value = { searchStorage, setSearchStorage }
  return (
    <SearchStorageAdminContext.Provider value={value}>
      {children}
    </SearchStorageAdminContext.Provider>
  )
}
