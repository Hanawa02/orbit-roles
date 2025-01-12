<template>
  <FormField v-slot="{ componentField }" :name="name">
    <FormItem class="w-full">
      <FormLabel>
        <slot name="label"></slot>
      </FormLabel>
      <FormControl>
        <SelectInput :options="accessTypeOptions" v-bind="componentField" />
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import SelectInput, { type Option } from "~/components/ui/SelectInput.vue";
import type { RoleMemberType } from "~/types/database.enums";
import {
  role_member_type_admin,
  role_member_type_manager,
  role_member_type_member,
} from "translations";

type Props = {
  name: string;
};

const props = defineProps<Props>();

const accessTypeOptions = computed<Option[]>(() => [
  { label: role_member_type_admin(), value: "admin" },
  { label: role_member_type_manager(), value: "manager" },
  { label: role_member_type_member(), value: "member" },
]);
</script>
