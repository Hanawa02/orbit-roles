<template>
  <label>
    <slot name="label"></slot>
  </label>
  <div class="flex gap-4 justify-between">
    <FormField v-slot="{ componentField }" :name="valueName">
      <FormItem class="w-full">
        <FormControl>
          <Input type="number" class="text-right" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" :name="unitName">
      <FormItem class="w-full">
        <FormControl>
          <SelectInput :options="timeOptions" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
  </div>
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
import {
  unit_day,
  unit_hour,
  unit_minute,
  unit_month,
  unit_week,
  unit_year,
} from "translations";

type Props = {
  valueName: string;
  unitName: string;
};

defineProps<Props>();

const timeOptions = computed<Option[]>(() => [
  // disabled for now because of the date picker missing time
  // { label: unit_minute(), value: "minute" },
  // { label: unit_hour(), value: "hour" },
  { label: unit_day(), value: "day" },
  { label: unit_week(), value: "week" },
  { label: unit_month(), value: "month" },
  { label: unit_year(), value: "year" },
]);
</script>
