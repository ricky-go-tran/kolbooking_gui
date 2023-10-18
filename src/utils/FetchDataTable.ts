import {
  ITabelUser,
  ITableJob,
  ITableReport,
  ITableBookmark,
  ISheetJob,
  ISheetBookmark,
  ISheetReport,
  ITableFollow,
  ITableEmoji,
  IPaymentJob,
} from "../global_variable/global_table_admin"
import { getProxy, getCDNImage } from "./PathUtil"
import {
  DEFAULT_AVATAR,
  DEFAULT_IMAGE,
} from "../global_variable/global_constant"
import { formatDate } from "./DateUtil"

type ColorType = "danger" | "warning" | "success" | undefined
type ColorBageType =
  | "success"
  | "danger"
  | "warning"
  | "neutral"
  | "primary"
  | undefined

const getColorOfRole = (role: string | undefined): ColorType => {
  if (role === "admin") {
    return "danger"
  } else if (role === "kol") {
    return "warning"
  } else if (role === "base") {
    return "success"
  } else {
    return undefined
  }
}

const getColorOfStatus = (role: string | undefined): ColorType => {
  if (role === "valid") {
    return "success"
  } else if (role === "invalid") {
    return "warning"
  } else if (role === "lock") {
    return "danger"
  } else {
    return undefined
  }
}

const getColorOfStatusJob = (status: string | undefined): ColorBageType => {
  if (status === "post" || status === "booking") {
    return "warning"
  } else if (status === "apply") {
    return "neutral"
  } else if (status === "complete" || status === "payment") {
    return "primary"
  } else if (status === "finish") {
    return "success"
  } else if (status === "cancle") {
    return "danger"
  } else {
    return undefined
  }
}

const getColorOfStatusReport = (status: string | undefined): ColorBageType => {
  if (status === "pending") {
    return "warning"
  } else if (status === "proccess") {
    return "primary"
  } else if (status === "sovled") {
    return "success"
  } else if (status === "rejected") {
    return "danger"
  } else {
    return undefined
  }
}

const getColorOfStatusBookmark = (
  status: string | undefined
): ColorBageType => {
  if (status === "care") {
    return "primary"
  } else if (status === "attention") {
    return "warning"
  } else if (status === "extremely") {
    return "danger"
  } else {
    return undefined
  }
}

const getColorOfTypeObjectEmoji = (
  type_object: string | undefined
): "success" | "primary" | undefined => {
  if (type_object === "Job") {
    return "success"
  } else if (type_object === "Profile") {
    return "primary"
  }
  return undefined
}

const getColorOfStatusEmoji = (
  type_object: string | undefined
): "primary" | "danger" | undefined => {
  if (type_object === "like") {
    return "primary"
  } else if (type_object === "unlike") {
    return "danger"
  }
  return undefined
}

export const fetchToITableUser = (users: any[]): ITabelUser[] => {
  let results: ITabelUser[] = []
  results = users.map((user: any) => {
    if (user.attributes.profile.data != null) {
      const item: ITabelUser = {
        id: `${user.attributes.id}`,
        avatar:
          user.attributes.profile?.data.attributes.avatar == "null"
            ? getCDNImage(DEFAULT_AVATAR)
            : getProxy(user.attributes.profile.data.attributes.avatar),
        fullname: user.attributes.profile?.data.attributes.fullname,
        email: user.attributes.email,
        birthday: user.attributes.profile?.data.attributes.birthday,
        role: user.attributes.role,
        role_color: getColorOfRole(user.attributes.role),
        status: user.attributes?.status,
        status_color: getColorOfStatus(user.attributes?.status),
      }
      return item
    } else {
      const item: ITabelUser = {
        id: `${user.attributes.id}`,
        avatar: getCDNImage(DEFAULT_AVATAR),
        fullname: "Not setup",
        email: user.attributes.email,
        birthday: "Not setup",
        role: user.attributes.role,
        role_color: getColorOfRole(user.attributes.role),
        status: "invalid",
        status_color: "warning",
      }
      return item
    }
  })

  return results
}

export const fetchToITableJob = (jobs: any[]): ITableJob[] => {
  let results: ITableJob[] = []
  results = jobs.map((job: any) => {
    const owner = {
      avatar: getCDNImage(DEFAULT_AVATAR),
      fullname: "Not setup",
      email: "Not setup",
    }

    if (job.attributes.owner.data != null) {
      owner.avatar =
        job.attributes.owner.data.attributes.avatar == "null"
          ? owner.avatar
          : getProxy(job.attributes.owner.data.attributes.avatar)
      owner.fullname = job.attributes.owner.data.attributes.fullname
      owner.email = job.attributes.owner.data.attributes.email
    }

    const item: ITableJob = {
      id: `${job.attributes.id}`,
      avatar_owner: owner.avatar,
      fullname_owner: owner.fullname,
      email_owner: owner.email,
      job_image:
        job.attributes.image === "null"
          ? getCDNImage(DEFAULT_IMAGE)
          : getProxy(job.attributes.image),
      job_title: job.attributes.title,
      status: job.attributes.status,
      status_color: getColorOfStatusJob(job.attributes.status),
      create_at: job.attributes.created_at,
    }
    return item
  })
  return results
}

export const fetchToIPaymentJob = (jobs: any[]): IPaymentJob[] => {
  let results: IPaymentJob[] = []
  results = jobs.map((job: any) => {
    const owner = {
      avatar: getCDNImage(DEFAULT_AVATAR),
      fullname: "Not setup",
      email: "Not setup",
    }

    if (job.attributes.owner.data != null) {
      owner.avatar =
        job.attributes.owner.data.attributes.avatar == "null"
          ? owner.avatar
          : getProxy(job.attributes.owner.data.attributes.avatar)
      owner.fullname = job.attributes.owner.data.attributes.fullname
      owner.email = job.attributes.owner.data.attributes.email
    }

    const item: IPaymentJob = {
      id: `${job.attributes.id}`,
      avatar_owner: owner.avatar,
      fullname_owner: owner.fullname,
      email_owner: owner.email,
      job_image:
        job.attributes.image === "null"
          ? getCDNImage(DEFAULT_IMAGE)
          : getProxy(job.attributes.image),
      job_title: job.attributes.title,
      status: job.attributes.status,
      status_color: getColorOfStatusJob(job.attributes.status),
      create_at: job.attributes.created_at,
      price: job.attributes.price,
    }
    return item
  })
  return results
}

export const fetchToITableEmoji = (emojis: any[]): ITableEmoji[] => {
  let results: ITableEmoji[] = []
  results = emojis.map((emoji: any) => {
    const object: {
      avatar: string
      title: string
      type: "Job" | "Profile"
    } = {
      avatar: getCDNImage(DEFAULT_AVATAR),
      title: "Unknown",
      type: "Profile",
    }

    if (emoji.attributes.object.data != null) {
      if (emoji.attributes.object.data.type === "job") {
        object.avatar =
          emoji.attributes.object.data.attributes.image == "null"
            ? object.avatar
            : getProxy(emoji.attributes.object.data.attributes.image)
        object.title = emoji.attributes.object.data.attributes.title
        object.type = "Job"
      } else {
        object.avatar =
          emoji.attributes.object.data.attributes.avatar == "null"
            ? object.avatar
            : getProxy(emoji.attributes.object.data.attributes.avatar)
        object.title = emoji.attributes.object.data.attributes.fullname
        object.type = "Profile"
      }
    }

    const item: ITableEmoji = {
      id: `${emoji.attributes.id}`,
      avatar_object: object.avatar,
      title_object: object.title,
      type_object: object.type,
      type_object_color: getColorOfTypeObjectEmoji(object.type),
      status: emoji.attributes.status,
      status_color: getColorOfStatusEmoji(emoji.attributes.status),
      create_at: emoji.attributes.created_at,
      id_object: emoji.attributes.object.data.attributes.id,
    }
    return item
  })
  return results
}

export const fetchToITableFollow = (follows: any[]): ITableFollow[] => {
  let results: ITableFollow[] = []
  results = follows.map((follow: any) => {
    const followed = {
      avatar: getCDNImage(DEFAULT_AVATAR),
      fullname: "Not setup",
    }

    if (follow.attributes.followed.data != null) {
      followed.avatar =
        follow.attributes.followed.data.attributes.avatar == "null"
          ? followed.avatar
          : getProxy(follow.attributes.followed.data.attributes.avatar)
      followed.fullname = follow.attributes.followed.data.attributes.fullname
    }

    const item: ITableFollow = {
      id: `${follow.attributes.id}`,
      id_followed: follow.attributes.followed.data.attributes.id,
      avatar_followed: followed.avatar,
      fullname_followed: followed.fullname,
      create_at: follow.attributes.created_at,
    }
    return item
  })
  return results
}
export const fetchToISheetJob = (jobs: any[]): ISheetJob[] => {
  let results: ISheetJob[] = []
  results = jobs.map((job: any) => {
    const item: ISheetJob = {
      id: `${job.attributes.id}`,
      title: job.attributes.title,
      description: job.attributes.description,
      requirement: job.attributes.requirement,
      status: job.attributes.status,
      created_at: job.attributes.created_at,
    }
    return item
  })
  return results
}

export const fetchToITableReport = (reports: any[]): ITableReport[] => {
  let results: ITableReport[] = []
  results = reports.map((report: any) => {
    const reporter = {
      avatar: getCDNImage(DEFAULT_AVATAR),
      fullname: "Not setup",
      email: "Not setup",
    }
    if (report.attributes.reporter.data != null) {
      reporter.avatar =
        report.attributes.reporter.data.attributes.avatar == "null"
          ? reporter.avatar
          : getProxy(report.attributes.reporter.data.attributes.avatar)
      reporter.fullname = report.attributes.reporter.data.attributes.fullname
      reporter.email = report.attributes.reporter.data.attributes.email
    }
    const item: ITableReport = {
      id: `${report.attributes.id}`,
      avatar_reporter: reporter.avatar,
      fullname_reporter: reporter.fullname,
      email_reporter: reporter.email,
      status: report.attributes.status,
      status_color: getColorOfStatusReport(report.attributes.status),
      created_at: report.attributes.created_at,
    }
    return item
  })
  return results
}

export const fetchToISheetReport = (reports: any[]): ISheetReport[] => {
  let results: ISheetReport[] = []
  results = reports.map((report: any) => {
    const item: ISheetReport = {
      id: `${report.attributes.id}`,
      title: report.attributes.title,
      description: report.attributes.description,
      status: report.attributes.status,
      created_at: report.attributes.created_at,
    }
    return item
  })
  return results
}

export const fetchToITableBookmark = (bookmarks: any[]): ITableBookmark[] => {
  let results: ITableBookmark[] = []
  results = bookmarks.map((bookmark: any) => {
    const job = {
      image: getCDNImage(DEFAULT_IMAGE),
      name: "Nothing",
    }
    if (bookmark.attributes.job.data != null) {
      job.image =
        bookmark.attributes.job.data.attributes.avatar === "null"
          ? job.image
          : getProxy(bookmark.attributes.job.data.attributes.image)
      job.name = bookmark.attributes.job.data.attributes.title
    }
    const item: ITableBookmark = {
      id: `${bookmark.attributes.id}`,
      image_job: job.image,
      id_job: bookmark.attributes.job.data.attributes.id,
      name_job: job.name,
      status: bookmark.attributes.status,
      status_color: getColorOfStatusBookmark(bookmark.attributes.status),
      created_at: formatDate(bookmark.attributes.created_at),
    }
    return item
  })
  return results
}

export const fetchToISheetBookmark = (bookmarks: any[]): ISheetBookmark[] => {
  let results: ISheetBookmark[] = []
  results = bookmarks.map((bookmark: any) => {
    const item: ISheetBookmark = {
      id: `${bookmark.attributes.id}`,
      status_bookmark: bookmark.attributes.status,
      title: bookmark.attributes.job.data.attributes.title,
      description: bookmark.attributes.job.data.attributes.description,
      requirement: bookmark.attributes.job.data.attributes.requirement,
      status_job: bookmark.attributes.job.data.attributes.status,
    }
    return item
  })
  return results
}
