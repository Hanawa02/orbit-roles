import { serverSupabaseServiceRole } from "#supabase/server";

type User = {
  id: string;
  email: string;
  displayName: string;
};

export const useUsers = () => {
  // const client = useSupabaseClient();
  // const user = useSupabaseUser();

  // const users = ref<User[]>([]);
  // const loadUsers = async () => {
  //   if (!user.value) {
  //     return null;
  //   }

  //   const {data} = await client.from("user_connections").select("connected_to_user_id(*)").order("created_at");

  //   users.value = data?.map((u) => ({
  //     id: u.connected_to_user_id,
  //     email: u.email,
  //     displayName: u.,
  //   })) || [];
  // };

  // onMounted(() => {
  //   constloadUsers();
  // });

  return {  };
};
