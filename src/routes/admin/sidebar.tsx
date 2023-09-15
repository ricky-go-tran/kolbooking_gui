import { IRoute } from "../../utils/global_type";

const externalRoutes: IRoute[] = [
  {
    path: "/admin/dashboard",
    icon: 'HomeIcon',
    name: 'Dashboard',
  },
  {
    path: "/admin/users",
    icon: 'PeopleIcon',
    name: 'Users',
  },
  {
    path: '/admin/jobs',
    icon: 'FormsIcon',
    name: 'Jobs',
  },
  {
    path: '/admin/reports',
    icon: 'ModalsIcon',
    name: 'Reports',
  },
  {
    path: '/admin/crontab',
    icon: 'ChartsIcon',
    name: 'Crontab'
  }
];
export default externalRoutes;
