<template>
  <section class="p-4">
    <h1>Login</h1>

    <LoginForm class="mb-4" />

    <NuxtLink to="/auth/signup">Sign-up Instead</NuxtLink>
  </section>
</template>

<script setup lang="ts">
import LoginForm from "~/components/auth/LoginForm.vue";
</script>
