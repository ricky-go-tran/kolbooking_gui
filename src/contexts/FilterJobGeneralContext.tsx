import { ReactNode, createContext, useState } from "react"

export const FilterJobGeneralContext = createContext<{
  jobFilter: string[]
  setJobFilter: React.Dispatch<any>
}>({ jobFilter: [], setJobFilter: () => null })

export const FilterJobGeneralContextProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [jobFilter, setJobFilter] = useState<string[]>([])
  const value = { jobFilter, setJobFilter }
  return (
    <FilterJobGeneralContext.Provider value={value}>
      {children}
    </FilterJobGeneralContext.Provider>
  )
}
