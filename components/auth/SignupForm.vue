<template>
  <form @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="display_name">
      <FormItem>
        <FormLabel>Display Name</FormLabel>
        <FormControl>
          <Input
            type="text"
            placeholder="Ada Lovelace"
            v-bind="componentField"
          />
        </FormControl>
        <FormDescription>This is your public display name.</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
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
        <FormDescription>This is your e-mail used for login.</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormLabel>Password</FormLabel>
        <FormControl>
          <Input
            type="password"
            placeholder="make it safe!"
            v-bind="componentField"
          />
        </FormControl>
        <FormDescription>
          This is your password needed for login.
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit">Sign Up</Button>
  </form>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = toTypedSchema(
  z.object({
    dispalyName: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(8).max(32),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const supabase = useSupabaseClient();
const onSubmit = form.handleSubmit((values) => {
  console.log("Form submitted!", values);
  //signUpUser(values.email, values.password, values.displayName);
});

const signUpUser = async (
  email: string,
  password: string,
  displayName: string
) => {
  const { error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        displayName,
      },
    },
  });
  if (error) console.log(error);
};
</script>
