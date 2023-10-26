import { AxiosResponse } from "axios"
import {
  IndustryWithoutDescription,
  Job,
  IndustryAssociation,
  Notification,
  TaskType,
} from "../global_variable/global_type"
import {
  EventType,
  TaskSerializerType,
  TasksSerializerType,
} from "../global_variable/global_serializer"

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
    benefits: data?.benefits || "",
    time_work: data?.time_work,
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
export const fetchDataToTask = (
  response: AxiosResponse<TaskSerializerType, any>
): TaskType => {
  const raw_data = response.data.data
  const rs = {
    id: raw_data.attributes.id,
    title: raw_data.attributes.title,
    description: raw_data.attributes.description,
    start_time: new Date(raw_data.attributes.start_time),
    end_time: new Date(raw_data.attributes.end_time),
    status: raw_data.attributes.status,
    category: raw_data.attributes.category,
  }
  return rs
}

export const fetchDataToEventDetail = (
  response: AxiosResponse<any, any>
): TaskType => {
  const raw_data = response.data
  const rs = {
    id: raw_data.id,
    title: raw_data.summary,
    description: raw_data.description,
    start_time: new Date(raw_data.start.dateTime),
    end_time: new Date(raw_data.end.dateTime),
    status: "",
    category: "",
  }
  return rs
}

export const fetchDataToTasks = (
  response: AxiosResponse<TasksSerializerType, any>
): TaskType[] => {
  const raw_data = response.data.data
  let rs: TaskType[] = []
  rs = raw_data.map((item: any) => {
    return {
      id: item.attributes.id,
      title: item.attributes.title,
      description: item.attributes.description,
      start_time: new Date(item.attributes.start_time),
      end_time: new Date(item.attributes.end_time),
      status: item.attributes.status,
      category: item.attributes.category,
    }
  })
  return rs
}

export const fetchDataToEvent = (
  response: AxiosResponse<TasksSerializerType, any>
): EventType[] => {
  const raw_data = response.data.data
  let rs: EventType[] = []
  rs = raw_data.map((item: any) => {
    return {
      id: item.attributes.id,
      title: item.attributes.title,
      start: new Date(item.attributes.start_time),
      end: new Date(item.attributes.end_time),
    }
  })
  return rs
}

export const fetchDataToGoogleEvent = (
  response: AxiosResponse<any, any>
): EventType[] => {
  const raw_data = response.data.items
  let rs: EventType[] = []
  rs = raw_data.map((item: any) => {
    return {
      id: item.id,
      title: item.summary,
      start: new Date(item.start.dateTime),
      end: new Date(item.end.dateTime),
    }
  })
  return rs
}
