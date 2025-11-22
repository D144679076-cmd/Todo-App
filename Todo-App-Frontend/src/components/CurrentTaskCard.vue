<script setup lang="ts">
import {computed} from "vue";
import Card from "primevue/card";
import Button from "primevue/button";
import {TASK_STATUS} from "@/composables/lib/enums";

// Define the props
interface CurrentTaskProps {
  title: string  | undefined;
  description: string | undefined | null;
  status: TASK_STATUS | undefined|string;
  startedTime: Date| string | undefined;
  dueTime: string | undefined | null | Date;
}

const props = defineProps<CurrentTaskProps>();

// Status color mapping
const statusColors = computed(() => {
  switch (props.status) {
    case TASK_STATUS.IN_PROGRESS:{
      return {
        bg: "bg-green-500/20",
        text: "text-green-400",
        border: "border-green-500/30",
      }
    }
    case TASK_STATUS.COMPLETED:{
      return {
        bg: "bg-blue-500/20",
        text: "text-blue-400",
        border: "border-blue-500/30",
      }
    }
    case TASK_STATUS.PENDING:{
      return {
        bg: "bg-yellow-500/20",
        text: "text-yellow-400",
        border: "border-yellow-500/30",
      }
    }
  };
});

// Status icon mapping
const statusIcon = computed(() => {
  switch (props.status) {
    case TASK_STATUS.IN_PROGRESS:
      return "pi pi-clock";
    case TASK_STATUS.COMPLETED:
      return "pi pi-exclamation-circle";
    case TASK_STATUS.PENDING:
      return "pi pi-check-circle";
    default:
      return "";
  }
});
</script>

<template>
  <Card class="!bg-slate-800">
    <template #content>
      <div class="p-6">
        <!-- Header with title and status badge -->
        <div class="flex justify-between mb-4 gap-y-2 text-white">
          <h3 class="text-lg font-bold">Current Task</h3>
          <div
            class="px-3 py-1 rounded-full text-xs font-medium border"
            :class="[statusColors?.bg, statusColors?.text, statusColors?.border]"
          >
            <i :class="statusIcon" class="mr-1"></i>
            {{ status }}
          </div>
        </div>

        <!-- Task details -->
        <div class="gap-y-4 flex flex-col">
          <h4 class="font-bold text-base text-gray-400">{{ title }}</h4>
          <p class="text-sm leading-relaxed text-gray-300">{{ description }}</p>

          <!-- Time information -->
          <div class="flex items-center gap-x-6 text-sm text-gray-300 pt-2">
            <div class="flex items-center gap-x-2">
              <i class="pi pi-play-circle text-gray-400"></i>
              <span>Started {{ startedTime }}</span>
            </div>
            <div class="flex items-center gap-x-2">
              <i class="pi pi-clock text-gray-400"></i>
              <span>Due {{ dueTime }}</span>
            </div>
          </div>

          <!-- Action buttons (optional) -->
          <div class="flex items-center gap-x-3 pt-4">
            <Button
              v-if="status !== 'Completed'"
              label="Mark Complete"
              icon="pi pi-check"
              size="small"
            />
            <Button
              v-if="status === 'Pending'"
              label="Start Task"
              icon="pi pi-play"
              size="small"
            />
            <Button label="Edit" icon="pi pi-pencil" size="small" outlined />
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<style scoped>
/* Custom styling for the component */
:deep(.p-card) {
  backdrop-filter: blur(10px);
}

/* Spacing utilities */
.space-y-3 > * + * {
  margin-top: 0.75rem;
}

.space-x-2 > * + * {
  margin-left: 0.5rem;
}

.space-x-3 > * + * {
  margin-left: 0.75rem;
}

.space-x-6 > * + * {
  margin-left: 1.5rem;
}

/* Status badge hover effect */
.status-badge {
  transition: all 0.3s ease;
}

.status-badge:hover {
  transform: scale(1.05);
}

/* Custom gradient backgrounds */
.gradient-card {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.8) 0%,
    rgba(249, 250, 251, 0.8) 100%
  );
  backdrop-filter: blur(10px);
  border: 1px solid rgba(229, 231, 235, 0.5);
}
</style>
