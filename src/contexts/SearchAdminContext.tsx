import { ReactNode, createContext, useState } from "react"

export const SearchAdminContext = createContext<{
  search: string
  setSearch: React.Dispatch<any>
}>({ search: "", setSearch: () => null })

export const SearchAdminContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [search, setSearch] = useState<string>("")
  const value = { search, setSearch }
  return (
    <SearchAdminContext.Provider value={value}>
      {children}
    </SearchAdminContext.Provider>
  )
}
