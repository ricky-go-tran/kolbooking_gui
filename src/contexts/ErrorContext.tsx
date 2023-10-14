import { ReactNode, createContext, useState } from "react"

export const ErrorContext = createContext<{
  errorCode: string
  setErrorCode: React.Dispatch<any>
}>({ errorCode: "", setErrorCode: () => null })

export const ErrorContextProvider = ({ children }: { children: ReactNode }) => {
  const [errorCode, setErrorCode] = useState<string>("")
  const value = { errorCode, setErrorCode }
  return <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
}
