<template>
  <AlertDialog>
    <AlertDialogTrigger as-child>
      <slot />
    </AlertDialogTrigger>
    <AlertDialogContent>
      <form @submit="onSubmit" class="flex flex-col gap-4">
        <AlertDialogHeader>
          <AlertDialogTitle>{{ add_member_dialog_title({ roleName }) }}</AlertDialogTitle>
          <AlertDialogDescription>
            <InputFormField name="name" type="text" :placeholder="add_member_dialog_form_name_placeholder()">
              <template v-slot:label>
                {{ add_member_dialog_form_name_label() }}
                <InfoTooltip>
                  {{ add_member_dialog_form_name_description() }}
                </InfoTooltip>
              </template>
            </InputFormField>

            <InputFormField name="email" type="email" :placeholder="add_member_dialog_form_email_placeholder()">
              <template v-slot:label>
                {{ add_member_dialog_form_email_label() }}
                <InfoTooltip>
                  {{ add_member_dialog_form_email_description() }}
                </InfoTooltip>
              </template>
            </InputFormField>
            <AccessTypeFormField name="type">
              <template v-slot:label>
                {{ add_member_dialog_form_type_label() }}
                <InfoTooltip>
                  {{ add_member_dialog_form_type_description() }}
                </InfoTooltip>
              </template>
            </AccessTypeFormField>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{{ add_member_dialog_cancel_button() }}</AlertDialogCancel>
          <Button type="submit">{{ add_member_dialog_add_more_button() }}</Button>
          <AlertDialogAction type="submit">{{ add_member_dialog_add_button() }}</AlertDialogAction>
        </AlertDialogFooter>
      </form>
    </AlertDialogContent>
  </AlertDialog>
</template>

<script lang="ts" setup>
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import InputFormField from "~/components/ui/InputFormField.vue";
import AccessTypeFormField from "~/components/ui/AccessTypeFormField.vue";
import InfoTooltip from "~/components/ui/InfoTooltip.vue";

import {
  add_member_dialog_title,
  add_member_dialog_form_email_label,
  add_member_dialog_form_email_placeholder,
  add_member_dialog_form_email_description,
  add_member_dialog_form_type_label,
  add_member_dialog_form_type_description,
  add_member_dialog_form_name_label,
  add_member_dialog_form_name_placeholder,
  add_member_dialog_cancel_button,
  add_member_dialog_add_button,
  add_member_dialog_add_more_button,
} from "translations";

import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

type Props = {
  roleName?: string;
};

defineProps<Props>();

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    type: z.string(),
  })
);

const form = useForm({
  validationSchema: formSchema,
});

const emit = defineEmits<{
  (e: "addMember", member: RoleMember): void;
}>();

const onSubmit = form.handleSubmit(async (values) => {
  emit("addMember", values);

  if (form.values) {
    form.resetForm();
  }
});
</script>
