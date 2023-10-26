import Logo from "../../../assets/images/logoo.png"
import { useContext, useState } from "react"
import { AuthContext } from "../../../contexts/AuthContext"
import { ProfileContext } from "../../../contexts/ProfileContext"
import { Link, useNavigate } from "react-router-dom"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { Dialog } from "@headlessui/react"

import { Avatar, Dropdown, DropdownItem } from "@windmill/react-ui"

import { OutlinePersonIcon, OutlineLogoutIcon } from "../../../icons"
import axios from "axios"
import { getProxy } from "../../../utils/PathUtil"
import { LOGOUT_URL } from "../../../global_variable/global_uri_backend"
const navigation = [
  { name: "Home", href: "/" },
  { name: "Jobs", href: "/jobs" },
  { name: "Kols", href: "/kols" },
  { name: "Bussiness/Personal", href: "/bussiness" },
]

const Header = () => {
  const { state: auth_state, dispatch: auth_dispatch } = useContext(AuthContext)
  const { state: profile_state, dispatch: profile_dispatch } =
    useContext(ProfileContext)
  const navigate = useNavigate()
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const isEmptyToken = () => {
    return auth_state.auth_token === "" || auth_state.auth_token === "null"
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
      .then(() => {
        auth_dispatch({
          type: "LOGOUT",
        })
        profile_dispatch({ type: "CLEAR" })
        navigate("/login")
      })
      .catch(() => {
        auth_dispatch({
          type: "LOGOUT",
        })
        profile_dispatch({ type: "CLEAR" })
        navigate("/login")
      })
  }

  return (
    <header>
      <nav
        className="flex items-center justify-between p-6 lg:px-8 bg-white border-gray-200 "
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="flex items-center">
            <img src={Logo} className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              KolBooking
            </span>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {isEmptyToken() === true && (
            <Link
              to="/login"
              className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
            >
              Log in
            </Link>
          )}
          {!isEmptyToken() && (
            <ul className="flex items-center flex-shrink-0 space-x-6 z-50">
              <li className="relative">
                <button
                  className="rounded-full focus:shadow-outline-purple focus:outline-none"
                  onClick={handleProfileClick}
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
                <Dropdown
                  align="right"
                  className="z-50"
                  isOpen={isProfileMenuOpen}
                  onClose={() => setIsProfileMenuOpen(false)}
                >
                  <DropdownItem
                    tag="a"
                    href={
                      profile_state.role === "admin"
                        ? "/admin/dashboard"
                        : profile_state.role === "kol"
                        ? "/kol/statistics"
                        : "/base/jobs"
                    }
                  >
                    <OutlinePersonIcon
                      className="w-4 h-4 mr-3"
                      aria-hidden="true"
                    />
                    <span>Dashboard</span>
                  </DropdownItem>
                  <DropdownItem onClick={() => logout()}>
                    <OutlineLogoutIcon
                      className="w-4 h-4 mr-3"
                      aria-hidden="true"
                    />
                    <span>Log out</span>
                  </DropdownItem>
                </Dropdown>
              </li>
            </ul>
          )}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center">
              <img src={Logo} className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
              <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                KolBooking
              </span>
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                {isEmptyToken() === true && (
                  <Link
                    to="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </Link>
                )}
                {!isEmptyToken() && (
                  <div className="flex flex-col items-start">
                    <div className="flex justify-center">
                      <button
                        className="rounded-full focus:shadow-outline-purple focus:outline-none"
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
                      <h6 className="font-semibold ml-4">
                        {profile_state.fullname}
                      </h6>
                    </div>
                    <Link
                      to={
                        profile_state.role === "admin"
                          ? "/admin/dashboard"
                          : profile_state.role === "kol"
                          ? "/kol/statistics"
                          : "/base/jobs"
                      }
                      className="my-3"
                    >
                      Dashboard
                    </Link>
                    <Link to="/login" className="my-3">
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}

export default Header
