<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import Card from "primevue/card";
import Checkbox from "primevue/checkbox";

interface DeadlineItem {
  id: string;
  title: string;
  time: string;
  completed: boolean;
}

interface TodaysDeadlinesProps {
  deadlines: DeadlineItem[];
}

const props = defineProps<TodaysDeadlinesProps>();

const emit = defineEmits<{
  toggleDeadline: [id: string];
}>();

const handleToggleDeadline = (id: string) => {
  emit("toggleDeadline", id);
};
</script>
<template>
  <Card
    class="!bg-gradient-to-br !from-slate-800 !to-slate-800 !text-white backdrop-blur-sm border-border/50 shadow-card"
  >
    <template #content>
      <div class="p-6">
        <h3 class="text-lg font-semibold text-foreground mb-4">
          Today's Deadlines
        </h3>

        <div class="gap-y-3 flex flex-col">
          <div
            v-for="deadline in deadlines"
            :key="deadline.id"
            class="!bg-gradient-to-br !from-slate-600 !to-slate-700 flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/40 transition-smooth"
          >
            <div class="flex items-center gap-x-3">
              <Checkbox
                v-model="deadline.completed"
                class="border-border"
                :binary="true"
              />
              <span
                :class="[
                  'text-sm',
                  deadline.completed
                    ? 'line-through text-muted-foreground'
                    : 'text-foreground',
                ]"
              >
                {{ deadline.title }}
              </span>
            </div>

            <div
              class="flex items-center space-x-1 text-sm text-muted-foreground"
            >
              <i class="pi pi-clock h-4 w-4"></i>
              <span>{{ deadline.time }}</span>
            </div>
          </div>

          <div
            v-if="deadlines.length === 0"
            class="text-center py-6 text-muted-foreground"
          >
            <i class="pi pi-clock text-4xl mx-auto mb-2 opacity-50 block"></i>
            <p>No deadlines for today</p>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<style scoped>
.transition-smooth {
  transition: all 0.2s ease-in-out;
}
</style>
