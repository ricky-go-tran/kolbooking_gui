import { IndustryWithoutDescription } from "../global_variable/global_type";
import { IndustryIcon } from "../icons";

export const fetchDataToIndustryWithoutDescription = (
  data: any[]
): IndustryWithoutDescription[] => {
  let rs: IndustryWithoutDescription[] = [];
  rs = data.map((industry) => {
    return {
      id: industry?.attributes.id,
      name: industry?.attributes?.name,
    };
  });
  return rs;
};
