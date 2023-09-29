import { ReactNode } from "react";

export type AuthType = {
  auth_token: string;
  message: any | null;
  loading: boolean;
};

export type ProfileType = {
  id: string;
  fullname: string;
  avatar: string;
  role: string;
};

export type ReportJobType = {
  id_job: string;
  title: string;
  description: string;
  id_reporter: string;
};

export interface IMainContainer {
  children: React.ReactNode;
}

export interface IRoute {
  path: string;
  icon?: string;
  name: string;
  routes?: IRoute[];
  exact?: boolean;
}
interface IIcon {
  icon: string;
  [key: string]: string | undefined;
}
export type { IIcon };

export interface IComponent {
  uri: string;
  children: ReactNode | JSX.Element;
}
