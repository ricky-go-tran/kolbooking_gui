import { Validate, TaskType } from "../../global_variable/global_type"

export const checkValid = ({ task }: { task: TaskType }): Validate => {
  const start = new Date(task.start_time)
  const end = new Date(task.end_time)
  console.log(start, end)
  const rs: Validate = { status: true, message: "" }
  if (task.title.trim().length < 5) {
    return {
      status: false,
      message: "Title length must more than 5 characters",
    }
  } else if (task.description.length < 10) {
    return {
      status: false,
      message: "Description length must more than 10 characters",
    }
  } else if (start >= end) {
    return { status: false, message: "Start time must be before end time" }
  }
  return rs
}
