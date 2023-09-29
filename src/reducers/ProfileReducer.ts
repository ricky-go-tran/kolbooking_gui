import { ProfileStorage } from "../utils/LocalStorageUtil";
import { ProfileType } from "../utils/global_type";

export const ProfileReducer = (state: ProfileType, action: any) => {
  switch (action.type) {
    case "FETCH": {
      return {
        id: action.payload.id,
        fullname: action.payload.fullname,
        avatar: action.payload.avatar,
        role: action.payload.role,
      };
    }
    case "CLEAR":
      return {
        id: "",
        fullname: "",
        avatar: "",
        role: "",
      };
    default: {
      return ProfileStorage();
    }
  }
};
