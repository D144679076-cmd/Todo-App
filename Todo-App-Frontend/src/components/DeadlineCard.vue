<script setup lang="ts">

import { TASK_STATUS } from '@/composables/lib/enums'
import Checkbox from 'primevue/checkbox'
import { defineProps, ref } from 'vue'
import { Tasks } from '@/composables/lib/respone'

interface DeadlineCardProps {
  deadline: Tasks;
}

const props = defineProps<DeadlineCardProps>()
const { deadline } = props
const completed = ref(deadline.status === TASK_STATUS.COMPLETED)
</script>

<template>
  <div
    class="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/40 transition-smooth"
  >
    <div class="flex items-center gap-x-3">
      <Checkbox
        v-model="completed"
        class="border-border"
        :binary="true"
      />
      <span
        :class="[
                  'text-sm',
                  deadline.status === TASK_STATUS.COMPLETED
                    ? 'line-through text-muted-foreground'
                    : 'text-foreground',
                ]"
      >
                {{ deadline.title }}
      </span>
    </div>

    <div
      class="flex items-center gap-x-1 text-sm text-muted-foreground"
    >
      <i class="pi pi-clock h-4 w-4"></i>
      <span>{{ deadline.deadline }}</span>
    </div>
  </div>
</template>

<style scoped>

</style>