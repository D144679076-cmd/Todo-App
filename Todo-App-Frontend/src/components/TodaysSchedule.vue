<template>
  <Card class="!bg-slate-800">
    <template #content>
      <div class="p-6 flex flex-col gap-y-4">
        <h3 class="text-lg font-semibold text-white mb-4">Today's Schedule</h3>

        <Timeline
          :value="scheduleItems"
          align="left"
          class="customized-timeline"
        >
          <template #marker="slotProps">
            <span :class="getMarkerClass(slotProps.item.status)">
              <i :class="getMarkerIcon(slotProps.item.status)"></i>
            </span>
          </template>
          <template #content="slotProps">
            <div class="p-3">
              <div class="flex items-center justify-between mb-2">
                <span class="text-sm font-medium text-slate-300">
                  {{ slotProps.item.time }}
                </span>
                <Badge
                  v-if="slotProps.item.status === 'current'"
                  class="bg-blue-500/20 text-blue-300 border-blue-400/30"
                  value="Current"
                />
                <Badge
                  v-else-if="slotProps.item.status === 'completed'"
                  class="bg-green-500/20 text-green-300 border-green-400/30"
                  value="Completed"
                />
              </div>
              <h4 class="font-semibold text-white mb-1">
                {{ slotProps.item.title }}
              </h4>
              <p class="text-sm text-slate-200">
                {{ slotProps.item.description }}
              </p>
            </div>
          </template>
        </Timeline>

        <div
          v-if="scheduleItems.length === 0"
          class="text-center py-8 text-slate-300"
        >
          <i class="pi pi-calendar text-4xl mx-auto mb-3 opacity-50 block"></i>
          <p class="font-medium">No scheduled items for today</p>
          <p class="text-sm mt-1">Your schedule is clear!</p>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import Card from "primevue/card";
import Badge from "primevue/badge";
import Timeline from "primevue/timeline";

interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  description: string;
  status: "upcoming" | "current" | "completed";
}

interface TodaysScheduleProps {
  scheduleItems: ScheduleItem[];
}

const props = defineProps<TodaysScheduleProps>();

const getStatusColor = (status: ScheduleItem["status"]): string => {
  switch (status) {
    case "current":
      return "bg-primary w-3 h-3 rounded-full mt-2";
    case "completed":
      return "bg-green-500 w-3 h-3 rounded-full mt-2";
    case "upcoming":
      return "bg-muted w-3 h-3 rounded-full mt-2";
    default:
      return "bg-muted w-3 h-3 rounded-full mt-2";
  }
};

const getMarkerClass = (status: ScheduleItem["status"]): string => {
  switch (status) {
    case "current":
      return "flex w-6 h-6 items-center justify-center text-white rounded-full z-10 bg-blue-500 ring-4 ring-blue-100";
    case "completed":
      return "flex w-6 h-6 items-center justify-center text-white rounded-full z-10 bg-green-500";
    case "upcoming":
      return "flex w-6 h-6 items-center justify-center text-slate-600 rounded-full z-10 bg-slate-300";
    default:
      return "flex w-6 h-6 items-center justify-center text-slate-600 rounded-full z-10 bg-slate-300";
  }
};

const getMarkerIcon = (status: ScheduleItem["status"]): string => {
  switch (status) {
    case "current":
      return "pi pi-clock text-xs";
    case "completed":
      return "pi pi-check text-xs";
    case "upcoming":
      return "pi pi-circle text-xs";
    default:
      return "pi pi-circle text-xs";
  }
};
</script>

<style scoped>
:deep(.p-timeline-event-marker) {
  border: none !important;
  padding: 0 !important;
}

:deep(.p-timeline-event-connector) {
  background-color: #e2e8f0 !important;
  width: 2px !important;
}

:deep(.p-timeline-event-content) {
  padding-left: 1rem !important;
}

.customized-timeline {
  padding: 0;
}

.customized-timeline :deep(.p-timeline-event-opposite) {
  display: none;
}
</style>
