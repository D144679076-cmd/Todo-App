<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import Card from "primevue/card";
import Checkbox from "primevue/checkbox";
import { Tasks } from '@/composables/lib/respone'
import { TASK_STATUS } from '@/composables/lib/enums'
import { ref } from "vue";
import DeadlineCard from '@/components/DeadlineCard.vue'
interface TodaysDeadlinesProps {
  deadlines: Tasks[] | undefined;
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
  <Card class="!bg-slate-800 !text-white">
    <template #content>
      <div class="p-6">
        <h3 class="text-lg font-semibold text-foreground mb-4">
          Today's Deadlines
        </h3>

        <div class="gap-y-3 flex flex-col">
          <div
            v-if="deadlines?.length > 0"
            v-for="deadline in deadlines"
            :key="deadline.id"
            class="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/40 transition-smooth"
          >
            <DeadlineCard :deadline="deadline" />
          </div>

          <div
            v-else
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
