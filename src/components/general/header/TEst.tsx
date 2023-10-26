import Logo from "../../../assets/images/logoo.png"
import { useContext, useState } from "react"
import { AuthContext } from "../../../contexts/AuthContext"
import { ProfileContext } from "../../../contexts/ProfileContext"
import { Link, useNavigate } from "react-router-dom"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline"
import { Dialog } from "@headlessui/react"

import { Avatar, Dropdown, DropdownItem } from "@windmill/react-ui"

import {
  OutlinePersonIcon,
  OutlineCogIcon,
  OutlineLogoutIcon,
} from "../../../icons"
import axios from "axios"
import { getProxy } from "../../../utils/PathUtil"
import { LOGOUT_URL } from "../../../global_variable/global_uri_backend"

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
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href="/" className="flex items-center">
            <img src={Logo} className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              KolBooking
            </span>
          </a>
          <div className="flex items-center lg:order-2">
            {isEmptyToken() === true && (
              <>
                <Link
                  to="/login"
                  className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                >
                  Get started
                </Link>
              </>
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
                    <DropdownItem tag="a" href="/profile/password/edit">
                      <OutlineCogIcon
                        className="w-4 h-4 mr-3"
                        aria-hidden="true"
                      />
                      <span>Change password</span>
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
            <button
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <Link
                  to="/"
                  className="block py-2 pr-4 pl-3 text-white rounded bg-blue-700 lg:bg-transparent lg:text-blue-700 lg:p-0 dark:text-white"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/jobs"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Jobs
                </Link>
              </li>
              <li>
                <Link
                  to="/kols"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  KOLs
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
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
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
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
              <ul className="space-y-2 py-6">
                <li>
                  <Link
                    to="/"
                    className="block py-2 pr-4 pl-3 text-white rounded bg-blue-700 lg:bg-transparent lg:text-blue-700 lg:p-0 dark:text-white"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/jobs"
                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/kols"
                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    KOLs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}

export default Header
