<template>
  <form @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>E-mail</FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="ada.lovelace@gmail.com"
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormLabel>Password</FormLabel>
        <FormControl>
          <Input
            type="password"
            placeholder="The one you used to sign up."
            v-bind="componentField"
          />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit" class="mt-6">Login</Button>
  </form>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = toTypedSchema(
  z.object({
    email: z.string().email(),
    password: z.string().min(8).max(32),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const supabase = useSupabaseClient();

type LoginForm = {
  email: string;
  password: string;
};

const loginUser = async ({ email, password }: LoginForm) => {
  const { error, data } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (data) {
    await navigateTo("/");
  }
  if (error) console.log(error);
};

const onSubmit = form.handleSubmit(loginUser, (errors) => {
  console.log("Form errors!", errors);
});
</script>
