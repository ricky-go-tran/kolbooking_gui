import {
  IndustryWithoutDescription,
  Job,
  IndustryAssociation,
  Notification,
} from "../global_variable/global_type"
import { IndustryIcon } from "../icons"

export const fetchDataToIndustryWithoutDescription = (
  data: any[]
): IndustryWithoutDescription[] => {
  let rs: IndustryWithoutDescription[] = []
  rs = data.map((industry) => {
    return {
      id: industry?.attributes.id,
      name: industry?.attributes?.name,
    }
  })
  return rs
}

export const fetchDataToIndustryAssocations = (
  data: any[]
): IndustryAssociation[] => {
  let rs: IndustryAssociation[] = []
  rs = data.map((item) => {
    return {
      id: item.attributes.id,
      industry_id: item.attributes.industry_id,
      insdustry_associationable_type:
        item.attributes.insdustry_associationable_type,
      insdustry_associationable_id:
        item.attributes.insdustry_associationable_id,
    }
  })
  return rs
}

export const fetchDataToJob = (data: any): Job => {
  const rs: Job = {
    id: data.id,
    title: data.title,
    description: data.description,
    profile_id: data?.profile_id || "",
    requirement: data?.requirement,
    kol_id: data?.kol_id || "",
    image: data?.image,
    price: data?.price,
  }
  return rs
}

export const fetchDataToNotification = (data: any[]): Notification[] => {
  let rs: Notification[] = []
  rs = data.map((item) => {
    return {
      id: item.attributes.id,
      title: item.attributes.title,
      description: item.attributes.description,
      type_notice: item.attributes.type_notice,
      is_read: item.attributes.is_read,
      sender_id: item.attributes.sender_id,
      receiver_id: item.attributes.receiver_id,
    }
  })
  return rs
}
