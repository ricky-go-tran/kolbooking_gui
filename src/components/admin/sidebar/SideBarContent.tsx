import React, { useContext } from "react"
import { ProfileContext } from "../../../contexts/ProfileContext"
import adminRoutes from "../../../routes/admin/sidebar"
import kolRoutes from "../../../routes/kol/sidebar"
import baseRoutes from "../../../routes/base/sidebar"
import { Link, useNavigate } from "react-router-dom"
import * as Icons from "../../../icons"
import { Badge } from "@windmill/react-ui"
import { MatchUri } from "../../general/MatchUri"
import { IIcon } from "../../../global_variable/global_type"
import { IRoute } from "../../../global_variable/global_type"
import { AdminTabContext } from "../../../contexts/AdminTab"

function Icon({ icon, ...props }: IIcon) {
  // @ts-ignore
  const Icon = Icons[icon]
  return <Icon {...props} />
}

function SidebarContent() {
  const { state: profile_state } = useContext(ProfileContext)
  const { setTab } = useContext(AdminTabContext)
  const navigate = useNavigate()

  const handle_redirect = (route: IRoute) => {
    setTab(route.name)
    navigate(route.path)
  }

  const renderSideBar = (routes: IRoute[]) => {
    return routes.map((route) => (
      <li className="relative px-6 py-3" key={route.name}>
        <button
          className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
          onClick={(e) => {
            handle_redirect(route)
          }}
        >
          <MatchUri uri={route.path}>
            <span
              className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
              aria-hidden="true"
            ></span>
          </MatchUri>

          <Icon
            className="w-5 h-5"
            aria-hidden="true"
            icon={route.icon || ""}
          />
          <span className="ml-4">{route.name}</span>
        </button>
      </li>
    ))
  }

  return (
    <div className="py-4 text-gray-500 dark:text-gray-400">
      <ul className="flex items-center flex-shrink-0 space-x-6">
        <li>
          <a
            className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
            href="/#"
          >
            KolJob
          </a>
        </li>
        <li>
          {profile_state.role === "admin" && <Badge type="danger">Admin</Badge>}
          {profile_state.role === "kol" && <Badge type="primary">Kol</Badge>}
          {profile_state.role === "base" && <Badge type="neutral">Base</Badge>}
        </li>
      </ul>
      <ul className="mt-6">
        {profile_state.role === "admin" && renderSideBar(adminRoutes)}
        {profile_state.role === "kol" && renderSideBar(kolRoutes)}
        {profile_state.role === "base" && renderSideBar(baseRoutes)}
      </ul>
    </div>
  )
}

export default SidebarContent
