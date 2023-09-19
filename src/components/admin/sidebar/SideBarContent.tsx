import React from 'react';
import routes from '../../../routes/admin/sidebar';
import { NavLink } from 'react-router-dom';
import * as Icons from "../../../icons";
import { Button, Badge } from '@windmill/react-ui';
import { MatchUri } from '../../general/MatchUri'
import { IIcon } from '../../../utils/global_type';


function Icon({ icon, ...props }: IIcon) {
  // @ts-ignore
  const Icon = Icons[icon];
  return <Icon {...props} />
}


function SidebarContent() {
  return (
    <div className="py-4 text-gray-500 dark:text-gray-400">
      <ul className="flex items-center flex-shrink-0 space-x-6">
        <li>
          <a className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200" href="/#">
            KolJob
          </a>
        </li>
        <li>
          <Badge type="success">Admin</Badge>
        </li>
      </ul>
      <ul className="mt-6">
        {routes.map((route) =>
        (
          <li className="relative px-6 py-3" key={route.name}>
            <NavLink className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200" to={route.path}>
              <MatchUri uri={route.path} >
                <span
                  className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                  aria-hidden="true"
                ></span></MatchUri>

              <Icon className="w-5 h-5" aria-hidden="true" icon={route.icon || ""} />
              <span className="ml-4">{route.name}</span>
            </NavLink>
          </li>

        )
        )}
      </ul>
    </div>
  )
}

export default SidebarContent
