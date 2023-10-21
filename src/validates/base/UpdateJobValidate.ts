import {
  Validate,
  Job,
  IndustryWithoutDescription,
} from "../../global_variable/global_type"

export const checkValid = ({
  job,
  industries,
}: {
  job: Job
  industries: IndustryWithoutDescription[]
}): Validate => {
  const rs: Validate = { status: true, message: "" }
  if (job.title.trim().length < 5) {
    return {
      status: false,
      message: "Title length must more than 5 characters",
    }
  } else if (job.description.trim().length < 10) {
    return {
      status: false,
      message: "Description length must more than 10 characters",
    }
  } else if (job.requirement.trim().length < 10) {
    return {
      status: false,
      message: "Requirement length must more than 10 characters",
    }
  } else if (job.price <= 0) {
    return { status: false, message: "Price must greater than zero" }
  } else if (job.image === null) {
    return { status: false, message: "" }
  } else if (industries.length === 0) {
    return { status: false, message: "Job must have at least one industry" }
  }
  return rs
}
