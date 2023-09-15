export type AuthType = {
  auth_token: any,
  profile: any,
  message: any | null,
  loading: boolean
}

export interface IMainContainer {
  children: React.ReactNode
};

export interface IRoute {
  path: string
  icon?: string
  name: string
  routes?: IRoute[]
  exact?: boolean
};
interface IIcon {
  icon: string
  [key: string]: string | undefined
}
export type {
  IIcon
}
