import React, { useState, useMemo } from "react"

interface ISidebarContext {
  isSidebarOpen: boolean
  closeSidebar: () => void
  toggleSidebar: () => void
}

export const SidebarContext = React.createContext<ISidebarContext>({
  isSidebarOpen: false,
  closeSidebar: () => null,
  toggleSidebar: () => null,
})

interface ISidebarPovider {
  children: React.ReactNode
}

export const SidebarProvider = ({ children }: ISidebarPovider) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  function toggleSidebar() {
    setIsSidebarOpen(!isSidebarOpen)
  }

  function closeSidebar() {
    setIsSidebarOpen(false)
  }

  const value = useMemo(
    () => ({
      isSidebarOpen,
      toggleSidebar,
      closeSidebar,
    }),
    [isSidebarOpen, toggleSidebar]
  )

  return (
    <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>
  )
}
