<template>
  <section class="flex flex-col gap-4 p-4">
    <section>
      <h1 class="font-bold">{{ role.name }}</h1>
      <p>{{ role.description }}</p>
    </section>

    <section>
      <p>Starts on: {{ role.start_date }}</p>
      <p v-if="role.end_date">Ends on: {{ role.end_date }}</p>
      <p>Frequency: {{ role.frequency_value }} {{ role.frequency_unit }}</p>
      <p>Duration: {{ role.duration_value }} {{ role.duration_unit }}</p>
      <p>Invite all: {{ role.invite_all }}</p>
    </section>

    <section>
      <h2 class="font-bold">Members</h2>
      <ul>
        <li v-for="member in role.role_members" :key="member.id">
          <p>{{ member.name }} - {{ member.email }} - {{ member.type }}</p>
        </li>
      </ul>
    </section>

    <section>
      <h2 class="font-bold">Events</h2>
    </section>
  </section>
</template>

<script setup lang="ts">
const client = useSupabaseClient();
const user = useSupabaseUser();
const route = useRoute();

const { data: role } = await useAsyncData("roles", async (context) => {
  if (!user.value) {
    return;
  }

  console.log("route.params.id", route.params.id);

  const { data: roles } = await client
    .from("roles")
    .select("*, role_members(*)")
    .eq("id", route.params.id)
    .order("created_at");

  return roles[0];
});
</script>
