import {
  role_member_type_admin,
  role_member_type_manager,
  role_member_type_member,
} from "translations";
import type { RoleMemberType } from "~/types/database.enums";

export const memberTypeTranslation = (type: RoleMemberType) => {
  switch (type) {
    case "admin":
      return role_member_type_admin();
    case "manager":
      return role_member_type_manager();
    case "member":
      return role_member_type_member();
    default:
      return role_member_type_member();
  }
};
