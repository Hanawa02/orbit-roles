<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <InfoIcon class="cursor-pointer" />
      </TooltipTrigger>
      <TooltipContent class="max-w-xs">
        <slot />
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>

<script setup lang="ts">
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import InfoIcon from "~/node_modules/vue-material-design-icons/Information.vue";
</script>
