<template>
  <form @submit="onSubmit" class="flex flex-col gap-4">
    <InputFormField
      name="name"
      type="text"
      :placeholder="roles_new_form_name_placeholder()"
    >
      <template v-slot:label>
        {{ roles_new_form_name_label() }}
        <InfoTooltip>
          {{ roles_new_form_name_description() }}
        </InfoTooltip>
      </template>
    </InputFormField>

    <InputFormField
      name="description"
      type="text"
      :placeholder="roles_new_form_description_placeholder()"
    >
      <template v-slot:label>
        {{ roles_new_form_description_label() }}
        <InfoTooltip>
          {{ roles_new_form_description_description() }}
        </InfoTooltip>
      </template>
    </InputFormField>

    <DatePickerFormField name="startDate">
      <template v-slot:label>
        {{ roles_new_form_start_date_label() }}
        <InfoTooltip>
          {{ roles_new_form_start_date_description() }}
        </InfoTooltip>
      </template>
    </DatePickerFormField>

    <DatePickerFormField name="endDate">
      <template v-slot:label>
        {{ roles_new_form_end_date_label() }}
        <InfoTooltip>
          {{ roles_new_form_end_date_description() }}
        </InfoTooltip>
      </template>
    </DatePickerFormField>

    <TimeFormField valueName="frequencyValue" unitName="frequencyUnit">
      <template v-slot:label>
        {{ roles_new_form_frequency_label() }}
        <InfoTooltip>
          {{ roles_new_form_frequency_description() }}
        </InfoTooltip>
      </template>
      <template v-slot:description>
        {{ roles_new_form_frequency_description() }}
      </template>
    </TimeFormField>

    <TimeFormField valueName="durationValue" unitName="durationUnit">
      <template v-slot:label>
        {{ roles_new_form_duration_label() }}
        <InfoTooltip>
          {{ roles_new_form_duration_description() }}
        </InfoTooltip>
      </template>
      <template v-slot:description>
        {{ roles_new_form_duration_description() }}
      </template>
    </TimeFormField>

    <SwitchFormField name="inviteAll">
      <template v-slot:label>
        {{ roles_new_form_invite_all_label() }}
      </template>
      <template v-slot:description>
        {{ roles_new_form_invite_all_description() }}
      </template>
    </SwitchFormField>

    <Button type="submit" class="mt-6 sticky bottom-0">
      {{ roles_new_form_button() }}
    </Button>
  </form>
</template>

<script setup lang="ts">
import { useForm, type InvalidSubmissionContext } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

import { useRoles, type InsertRole } from "~/composables/roles";

import {
  roles_new_form_description_label,
  roles_new_form_description_placeholder,
  roles_new_form_description_description,
  roles_new_form_start_date_label,
  roles_new_form_start_date_description,
  roles_new_form_end_date_label,
  roles_new_form_end_date_description,
  roles_new_form_name_label,
  roles_new_form_name_placeholder,
  roles_new_form_name_description,
  roles_new_form_invite_all_label,
  roles_new_form_invite_all_description,
  roles_new_form_frequency_label,
  roles_new_form_frequency_description,
  roles_new_form_duration_label,
  roles_new_form_duration_description,
  roles_new_form_button,
} from "translations";


import { Button } from "~/components/ui/button";
import InputFormField from "~/components/ui/InputFormField.vue";
import DatePickerFormField from "~/components/ui/DatePickerFormField.vue";
import InfoTooltip from "~/components/ui/InfoTooltip.vue";
import SwitchFormField from "~/components/ui/SwitchFormField.vue";
import TimeFormField from "~/components/ui/TimeFormField.vue";
import type { TimeUnit } from "~/types/database.enums";

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(2).max(50),
    description: z.string().max(255),
    startDate: z.any(),
    endDate: z.date().optional().nullable(),
    frequencyValue: z.number().min(1),
    frequencyUnit: z.string(),
    durationValue: z.number().min(1),
    durationUnit: z.string(),
    inviteAll: z.boolean(),
  })
);

const user = useSupabaseUser();

const form = useForm({
  validationSchema: formSchema,
  initialValues: {
    frequencyValue: 1,
    frequencyUnit: "week",
    durationValue: 1,
    durationUnit: "day",
    inviteAll: false,
  },
});

const { addRole, addMembersToRole } = useRoles();

const parseRoleFromForm = (): InsertRole => {
  return {
    name: form.values.name ?? "",
    description: form.values.description,
    start_date: form.values.startDate?.toUTCString(),
    end_date: form.values.endDate?.toUTCString(),
    invite_all: form.values.inviteAll,
    frequency_unit: form.values.frequencyUnit as TimeUnit,
    frequency_value: form.values.frequencyValue ?? 1,
    duration_unit: form.values.durationUnit as TimeUnit,
    duration_value: form.values.durationValue ?? 1,
  };
};

const createRole = async () => {
  const { data } = await addRole(parseRoleFromForm());

  const roleId = data?.[0].id;
  const userId = user.value?.id;

  if (roleId && userId) {
    await addMembersToRole(roleId, [{ id: userId, type: "admin" }]);
  }
};

const handleErrors = (errors: InvalidSubmissionContext) => {
  console.error("Form errors!", errors);
};

const onSubmit = form.handleSubmit(createRole, handleErrors);
</script>
