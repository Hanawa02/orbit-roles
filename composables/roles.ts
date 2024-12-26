import type { RoleMemberType } from "~/types/database.enums";
import type { TablesInsert } from "~/types/database.types.ts";

export type InsertRole = TablesInsert<"roles">;
export type RoleMember = { id: string; type: RoleMemberType };

export const useRoles = () => {
  const client = useSupabaseClient();

  const addMembersToRole = (roleId: string, members: RoleMember[]) => {
    const mappedMembers = members.map(({ id, type }) => ({
      role_id: roleId,
      user_id: id,
      type: type,
    }));
    return client.from("role_members").insert(mappedMembers).select();
  };

  const addRole = (role: InsertRole) => {
    return client.from("roles").insert(role).select();
  };

  return { addRole, addMembersToRole };
};
