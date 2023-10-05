import { IRoute } from "../../global_variable/global_type"

const externalRoutes: IRoute[] = [
  {
    path: "/admin/dashboard",
    icon: "HomeIcon",
    name: "Dashboard",
  },
  {
    path: "/admin/users",
    icon: "PeopleIcon",
    name: "Users",
  },
  {
    path: "/admin/jobs",
    icon: "FormsIcon",
    name: "Jobs",
  },
  {
    path: "/admin/reports",
    icon: "ModalsIcon",
    name: "Reports",
  },
  {
    path: "/admin/crontab",
    icon: "ChartsIcon",
    name: "System Health",
  },
  {
    path: "/profile/emojis",
    icon: "LikeOuletIcon",
    name: "Emojis",
  },
]
export default externalRoutes
