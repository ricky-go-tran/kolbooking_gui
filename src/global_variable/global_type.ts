import { ReactNode } from "react"

export type AuthType = {
  auth_token: string
  message: any | null
  loading: boolean
}

export type StatusLoginType = {
  status: string
}

export type ProfileType = {
  id: string
  fullname: string
  avatar: string
  role: string
}

export type Validate = {
  status: boolean
  message: string
}

export type ReportJobType = {
  id_job: string
  title_job: string
  name_onwer: string
  id_reporter: string
}

export type ReportProfileType = {
  id_profile: string
  name_profile: string
  id_reporter: string
}

export type ReportType = {
  title: string
  description: string
  reportable_type: string
  reportable_id: string
  profile_id: string
}

export interface IMainContainer {
  children: React.ReactNode
}

export interface IRoute {
  path: string
  icon?: string
  name: string
  routes?: IRoute[]
  exact?: boolean
}
interface IIcon {
  icon: string
  [key: string]: string | undefined
}
export type { IIcon }

export interface IComponent {
  uri: string
  children: ReactNode | JSX.Element
}

export type IndustryWithoutDescription = {
  id: string
  name: string
}

export type IndustryAssociation = {
  id: string
  industry_id: string
  insdustry_associationable_type: string
  insdustry_associationable_id: string
}

export type IndustryAssocationNestd = {
  id: string | undefined
  industry_id: string
  _destroy: true | false
}

export type Job = {
  id: string
  title: string
  description: string
  profile_id: string
  price: number
  requirement: string
  kol_id: string | undefined
  image: string
  benefits: string
  time_work: string
}

export type KolProfile = {
  facebook_path: string
  youtube_path: string
  instagram_path: string
  tiktok_path: string
  about_me: string
}

export type Notification = {
  id: string
  title: string
  description: string
  is_read: boolean
  type_notice: string
  sender_id: string
  receiver_id: string
}
export type TaskType = {
  id: string
  title: string
  description: string
  start_time: string | Date
  end_time: string | Date
  status: string
  category: string
}
