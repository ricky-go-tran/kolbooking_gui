import React, { useContext } from "react"
import { Navigate } from "react-router-dom"
import Sidebar from "../components/admin/sidebar/index"
import Header from "../components/admin/Header"
import Main from "./Main"
import { AuthContext } from "../contexts/AuthContext"
import { SearchAdminContextProvider } from "../contexts/SearchAdminContext"
import { SearchStorageAdminContextProvider } from "../contexts/SearchStorageAdminContext"
import { AdminTabContextProvider } from "../contexts/AdminTab"

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { state: auth_state } = useContext(AuthContext)

  if (auth_state.auth_token === "" || auth_state.auth_token === "null") {
    console.log(auth_state.auth_token)
    return <Navigate to="/login" />
  }

  return (
    <AdminTabContextProvider>
      <SearchStorageAdminContextProvider>
        <SearchAdminContextProvider>
          <div className={`flex h-screen bg-gray-50 dark:bg-gray-900 `}>
            <Sidebar />
            <div className="flex flex-col flex-1 w-full">
              <Header />
              <Main>{children}</Main>
            </div>
          </div>
        </SearchAdminContextProvider>
      </SearchStorageAdminContextProvider>
    </AdminTabContextProvider>
  )
}

export default AdminLayout
