<template>
  <section>
    <h1>Roles</h1>
    <p>Your rotating roles management tool!</p>

    <NuxtLink to="/roles/new">Create a new role</NuxtLink>

    <h2 class="mt-8">Role List</h2>
    <ul v-if="roles">
      <li v-for="role in roles" :key="role?.id">
        <NuxtLink :to="`/roles/${role.id}`"> {{ role?.name }}</NuxtLink>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
const client = useSupabaseClient();
const user = useSupabaseUser();

const { data: roles } = await useAsyncData("roles", async () => {
  if (!user.value) {
    return;
  }

  const { data } = await client
    .from("role_members")
    .select("id, roles:role_id(*)")
    .eq("email", user.value.email)
    .order("created_at");

  return data?.map((role) => role.roles);
});
</script>
