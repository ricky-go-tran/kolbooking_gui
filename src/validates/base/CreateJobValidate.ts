import {
  Validate,
  Job,
  IndustryWithoutDescription,
} from "../../global_variable/global_type"

export const checkValid = ({
  job,
  image,
  industries,
}: {
  job: Job
  image: File | null
  industries: IndustryWithoutDescription[]
}): Validate => {
  const rs: Validate = { status: true, message: "" }
  if (job.title.trim() === "") {
    return { status: false, message: "Title cannot be empty" }
  } else if (job.description.trim() === "") {
    return { status: false, message: "Description cannot be empty" }
  } else if (job.requirement.trim() === "") {
    return { status: false, message: "Requirement cannot be empty" }
  } else if (job.price <= 0) {
    return { status: false, message: "Price must greater than zero" }
  } else if (job.image === null) {
    return { status: false, message: "" }
  } else if (industries.length === 0) {
    return { status: false, message: "Job must have at least one industry" }
  } else if (image === null) {
    return { status: false, message: "Image require" }
  }
  return rs
}
