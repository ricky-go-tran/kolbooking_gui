import { useContext, useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { ProfileContext } from "../../contexts/ProfileContext"
import { AuthContext } from "../../contexts/AuthContext"
import axios from "axios"
import { getProxy } from "../../utils/PathUtil"
import {
  SearchIcon,
  MoonIcon,
  SunIcon,
  BellIcon,
  MenuIcon,
  OutlinePersonIcon,
  OutlineCogIcon,
  OutlineLogoutIcon,
} from "../../icons"
import {
  Avatar,
  Badge,
  Input,
  Dropdown,
  DropdownItem,
  WindmillContext,
} from "@windmill/react-ui"
import { LOGOUT_URL } from "../../global_variable/global_uri_backend"
import NotificationPanel from "../general/notifications/NotificationPanel"
import { Notification as NotificationType } from "../../global_variable/global_type"
import { fetchDataToNotification } from "../../utils/FetchData"
import useActionCable from "../../hooks/useActionCable"
import useChannel from "../../hooks/useChannel"
import { SearchAdminContext } from "../../contexts/SearchAdminContext"
import { SearchStorageAdminContext } from "../../contexts/SearchStorageAdminContext"
import { AdminTabContext } from "../../contexts/AdminTab"
import { SidebarContext } from "../../contexts/SidebarContext"

const Header = () => {
  const { mode, toggleMode } = useContext(WindmillContext)
  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const { state: auth_state, dispatch: auth_dispatch } = useContext(AuthContext)
  const { state: profile_state, dispatch: profile_dispatch } =
    useContext(ProfileContext)
  const navigate = useNavigate()
  const { actionCable } = useActionCable("ws://localhost:3000/cable")
  const { subscribe, unsubscribe, send } = useChannel(actionCable)
  const [data, setData] = useState(null)
  const { setSearch } = useContext(SearchAdminContext)
  const [inputField, setInputField] = useState("")
  const { searchStorage, setSearchStorage } = useContext(
    SearchStorageAdminContext
  )
  const { tab, setTab } = useContext(AdminTabContext)
  const { toggleSidebar } = useContext(SidebarContext)

  useEffect(() => {
    setSearch("")
    setSearchStorage("")
  }, [tab])

  function handleNotificationsClick() {
    setIsNotificationsMenuOpen(!isNotificationsMenuOpen)
  }

  function handleProfileClick() {
    setIsProfileMenuOpen(!isProfileMenuOpen)
  }

  function logout() {
    axios
      .delete(getProxy(LOGOUT_URL), {
        headers: {
          Authorization: auth_state.auth_token,
        },
      })
      .then((response) => {
        auth_dispatch({
          type: "LOGOUT",
        })
        profile_dispatch({ type: "CLEAR" })
        navigate("/login")
      })
      .catch((error) => {
        auth_dispatch({
          type: "LOGOUT",
        })
        profile_dispatch({ type: "CLEAR" })
        navigate("/login")
      })
  }

  function typingSearch(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      setSearch(searchStorage)
    }
  }

  return (
    <header className="z-40 py-4 bg-white shadow-bottom dark:bg-gray-800">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-purple-600 dark:text-purple-300">
        {/* <!-- Mobile hamburger --> */}
        <button
          className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
          aria-label="Menu"
          onClick={() => {
            toggleSidebar()
          }}
        >
          <MenuIcon className="w-6 h-6" aria-hidden="true" />
        </button>
        {/* <!-- Search input --> */}
        <div className="flex justify-center flex-1 lg:mr-32">
          <div className="relative w-full max-w-xl mr-6 focus-within:text-purple-500">
            <div className="absolute inset-y-0 flex items-center pl-2">
              <SearchIcon className="w-4 h-4" aria-hidden="true" />
            </div>

            <Input
              crossOrigin=""
              css=""
              className="pl-8 text-gray-700"
              placeholder="Search..."
              aria-label="Search"
              onChange={(e) => {
                setSearchStorage(e.target.value)
              }}
              onKeyDown={(e) => {
                typingSearch(e)
              }}
              value={searchStorage}
            />
          </div>
        </div>
        <ul className="flex items-center flex-shrink-0 space-x-6">
          {/* <!-- Theme toggler --> */}
          <li className="flex">
            <button
              className="rounded-md focus:outline-none focus:shadow-outline-purple"
              onClick={toggleMode}
              aria-label="Toggle color mode"
            >
              {mode === "dark" ? (
                <SunIcon className="w-5 h-5" aria-hidden="true" />
              ) : (
                <MoonIcon className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </li>
          {/* <!-- Notifications menu --> */}
          <li className="relative">
            <button
              className="relative align-middle rounded-md focus:outline-none focus:shadow-outline-purple"
              onClick={handleNotificationsClick}
              aria-label="Notifications"
              aria-haspopup="true"
            >
              <BellIcon className="w-5 h-5" aria-hidden="true" />
              {/* <!-- Notification badge --> */}
              <span
                aria-hidden="true"
                className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full dark:border-gray-800"
              ></span>
            </button>
            {isNotificationsMenuOpen === true && (
              <NotificationPanel onClose={setIsNotificationsMenuOpen} />
            )}
          </li>

          <li className="relative">
            <button
              className="rounded-full focus:shadow-outline-purple focus:outline-none"
              onClick={() => setIsProfileMenuOpen(true)}
              aria-label="Account"
              aria-haspopup="true"
            >
              <Avatar
                className="align-middle"
                src={profile_state.avatar}
                alt=""
                aria-hidden="true"
              />
            </button>
            {isProfileMenuOpen === true && (
              <Dropdown
                align="right"
                isOpen={true}
                onClose={() => setIsProfileMenuOpen(false)}
                className="z-50"
              >
                {profile_state.role === "admin" && (
                  <DropdownItem tag="a" href="/profile">
                    <OutlinePersonIcon
                      className="w-4 h-4 mr-3"
                      aria-hidden="true"
                    />
                    <span>Profile</span>
                  </DropdownItem>
                )}
                {profile_state.role === "base" && (
                  <DropdownItem tag="a" href="/base/profile">
                    <OutlinePersonIcon
                      className="w-4 h-4 mr-3"
                      aria-hidden="true"
                    />
                    <span>Profile</span>
                  </DropdownItem>
                )}
                {profile_state.role === "kol" && (
                  <DropdownItem tag="a" href="/kol/profile">
                    <OutlinePersonIcon
                      className="w-4 h-4 mr-3"
                      aria-hidden="true"
                    />
                    <span>Profile</span>
                  </DropdownItem>
                )}
                <DropdownItem tag="a" href="/">
                  <OutlineCogIcon className="w-4 h-4 mr-3" aria-hidden="true" />
                  <span>Go to Homepage</span>
                </DropdownItem>
                <DropdownItem onClick={() => logout()}>
                  <OutlineLogoutIcon
                    className="w-4 h-4 mr-3"
                    aria-hidden="true"
                  />
                  <span>Log out</span>
                </DropdownItem>
              </Dropdown>
            )}
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Header
