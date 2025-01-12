<template>
  <section class="p-4">
    <h1>{{ roles_new_headline() }}</h1>
    <NewRoleForm />
  </section>
</template>

<script setup lang="ts">
import NewRoleForm from "~/components/roles/NewRoleForm.vue";

import { roles_new_headline } from "translations";
</script>
