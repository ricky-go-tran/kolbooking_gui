import { ReactNode, createContext, useState } from "react"

export const SearchJobHomepageContext = createContext<{
  jobSearch: string | null
  setJobSearch: React.Dispatch<any>
}>({ jobSearch: null, setJobSearch: () => null })

export const SearchJobHomepageProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [jobSearch, setJobSearch] = useState<string | null>(null)
  const value = { jobSearch, setJobSearch }
  return (
    <SearchJobHomepageContext.Provider value={value}>
      {children}
    </SearchJobHomepageContext.Provider>
  )
}
