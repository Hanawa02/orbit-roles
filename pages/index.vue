<template>
  <section>
    <h1>Orbit Roles</h1>
    <p>Your rotating roles management tool!</p>
  </section>
  <section>Hello, {{ user?.user_metadata.displayName }}</section>

  <button @click="logout">Logout</button>
</template>

<script setup lang="ts">
const user = useSupabaseUser();
const supabase = useSupabaseClient();

const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    return;
  }
  navigateTo("/auth/login");
};
</script>
