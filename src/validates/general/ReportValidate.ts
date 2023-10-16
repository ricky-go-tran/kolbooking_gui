import {
  Validate,
  IndustryWithoutDescription,
  ReportType,
} from "../../global_variable/global_type"

export const checkValid = ({ report }: { report: ReportType }): Validate => {
  const rs: Validate = { status: true, message: "" }
  if (report.title.trim().length < 5) {
    return {
      status: false,
      message: "Title length must more than 5 characters",
    }
  } else if (report.description.length < 10) {
    return {
      status: false,
      message: "Description length must more than 10 characters",
    }
  }
  return rs
}
