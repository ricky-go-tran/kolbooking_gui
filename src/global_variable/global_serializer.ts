import { TaskType } from "./global_type"

export type TaskSerializerType = {
  data: {
    id: string
    type: string
    attributes: TaskType
  }
}

export type TasksSerializerType = {
  data: { id: string; type: string; attributes: TaskType }[]
}

export type EventType = {
  id: string
  title: string
  start: Date
  end: Date
}

export type GoogleEventType = {
  title: string
  start: Date
  end: Date
}
