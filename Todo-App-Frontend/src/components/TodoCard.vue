<script setup lang="ts">
import { defineProps, defineEmits, computed } from "vue";
import Card from "primevue/card";
import Badge from "primevue/badge";

interface TodoCardProps {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate?: string;
}

const props = defineProps<TodoCardProps>();

const emit = defineEmits<{
  toggle: [id: string];
}>();

const handleToggle = () => {
  emit("toggle", props.id);
};
</script>
<template>
  <Card @click="handleToggle" class="!bg-slate-800 !text-white">
    <template #content>
      <div class="p-4 flex flex-col gap-y-3">
        <div class="flex items-start justify-between">
          <div class="flex items-center gap-x-3 flex-1">
            <button
              @click.stop="handleToggle"
              class="text-primary hover:scale-110 transition-bounce"
            >
              <i
                :class="[
                  'text-xl',
                  completed ? 'pi pi-check-circle' : 'pi pi-circle',
                ]"
              ></i>
            </button>
            <div class="flex-1">
              <h3
                :class="[
                  'font-semibold transition-smooth',
                  completed
                    ? 'line-through text-muted-foreground'
                    : 'text-foreground',
                ]"
              >
                {{ title }}
              </h3>
              <p v-if="description" class="text-sm text-muted-foreground mt-1">
                {{ description }}
              </p>
            </div>
          </div>
          <div class="flex items-center gap-x-2">
            <Badge class="flex items-center gap-x-1">
              <i class="pi pi-star-fill"></i>
              <span>{{ priority }}</span>
            </Badge>
          </div>
        </div>

        <div
          v-if="dueDate"
          class="flex items-center text-sm text-muted-foreground gap-2"
        >
          <i class="pi pi-clock mr-2"></i>
          <span>Due: {{ dueDate }}</span>
        </div>
      </div>
    </template>
  </Card>
</template>
<style scoped>
.transition-smooth {
  transition: all 0.2s ease-in-out;
}

.transition-bounce {
  transition: transform 0.2s ease-in-out;
}

.hover\:scale-110:hover {
  transform: scale(1.1);
}
</style>
