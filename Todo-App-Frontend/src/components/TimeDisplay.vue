<template>
  <div class="text-center py-8 flex flex-col gap-y-4">
    <div class="text-5xl !font-extrabold text-foreground mb-2 text-white">
      {{ formatTime(currentTime) }}
    </div>
    <div class="text-lg text-muted-foreground mb-4">
      {{ formatDate(currentTime) }}
    </div>
    <div class="text-primary font-medium">
      {{ getGreeting() }} You have tasks to complete today.
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import dayjs from "dayjs";
import type { Dayjs } from "dayjs";

const currentTime = ref<Dayjs>(dayjs());
let timer: NodeJS.Timeout | null = null;

const formatTime = (date: Dayjs): string => {
  return date.format("h:mm A");
};

const formatDate = (date: Dayjs): string => {
  return date.format("dddd, MMMM D, YYYY");
};

const getGreeting = (): string => {
  const hour = currentTime.value.hour();
  if (hour < 12) return "Good morning!";
  if (hour < 17) return "Good afternoon!";
  return "Good evening!";
};

onMounted(() => {
  timer = setInterval(() => {
    currentTime.value = dayjs();
  }, 1000);
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
