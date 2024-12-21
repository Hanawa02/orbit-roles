<template>
  <form @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="displayName">
      <FormItem>
        <FormLabel>{{ signup_form_display_name_label() }}</FormLabel>
        <FormControl>
          <Input
            type="text"
            :placeholder="signup_form_display_name_placeholder()"
            v-bind="componentField"
          />
        </FormControl>
        <FormDescription>
          {{ signup_form_display_name_description() }}
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>{{ signup_form_email_label() }}</FormLabel>
        <FormControl>
          <Input
            type="text"
            :placeholder="signup_form_email_placeholder()"
            v-bind="componentField"
          />
        </FormControl>
        <FormDescription>{{ signup_form_email_description() }}</FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormLabel>{{ signup_form_password_label() }}></FormLabel>
        <FormControl>
          <Input
            type="password"
            :placeholder="signup_form_password_placeholder()"
            v-bind="componentField"
          />
        </FormControl>
        <FormDescription>
          {{ signup_form_password_description() }}
        </FormDescription>
        <FormMessage />
      </FormItem>
    </FormField>
    <Button type="submit" class="mt-6">{{ signup_form_button() }}</Button>
  </form>
</template>

<script setup lang="ts">
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

import {
  signup_form_email_label,
  signup_form_email_placeholder,
  signup_form_password_label,
  signup_form_password_placeholder,
  signup_form_button,
  signup_form_display_name_label,
  signup_form_display_name_description,
  signup_form_display_name_placeholder,
  signup_form_email_description,
  signup_form_password_description,
} from "translations";

import { Button } from "~/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

const formSchema = toTypedSchema(
  z.object({
    displayName: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(8).max(32),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const supabase = useSupabaseClient();

type SignupForm = {
  email: string;
  password: string;
  displayName: string;
};

const signUpUser = async ({ email, password, displayName }: SignupForm) => {
  const { error, data } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        displayName,
      },
    },
  });
  if (data) console.log(data);
  if (error) console.log(error);
};

const onSubmit = form.handleSubmit(signUpUser, (errors) => {
  console.log("Form errors!", errors);
});
</script>
