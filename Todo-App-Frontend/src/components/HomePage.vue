<template>
  <div
    class="min-h-screen bg-gray-50 flex flex-col items-center py-8 gap-y-6"
    style="margin-top: 49px"
  >
    <!-- Time & Greeting -->
    <div
      class="w-full max-w-3xl bg-white rounded-lg shadow p-6 mb-6 flex flex-col items-center text-black"
    >
      <div class="text-3xl font-semibold mb-2">{{ time }}</div>
      <div class="text-lg text-gray-600 mb-1">{{ date }}</div>
      <div class="text-gray-500">
        Good afternoon! You have {{ deadlines.length }} tasks due today
      </div>
    </div>

    <!-- Current Task -->
    <div
      class="w-full max-w-3xl bg-white rounded-lg shadow p-6 mb-6 border border-black text-black"
    >
      <div class="flex justify-between items-center mb-2">
        <div class="text-lg font-semibold">Current Task</div>
        <Tag value="In Progress" class="bg-gray-900 text-white" />
      </div>
      <div class="flex items-start gap-3 gap-y-2">
        <Checkbox v-model="currentTask.completed" :binary="true" class="mt-1" />
        <div class="gap-y-4">
          <div class="font-semibold text-black">{{ currentTask.title }}</div>
          <div class="text-gray-500 text-sm mb-2">
            {{ currentTask.description }}
          </div>
          <div
            class="flex items-center gap-4 text-xs text-gray-400 gap-y-2 p-1"
          >
            <span class="flex items-center gap-0.5">
              <i class="pi pi-clock mr-1" />Started 1h ago
            </span>
            <span class="flex items-center gap-0.5">
              <i class="pi pi-calendar mr-1" />Due: 5:00 PM today
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Today's Deadlines -->
    <div class="w-full max-w-3xl mb-6 text-black gap-y-2">
      <div class="text-lg font-semibold mb-2">Today's Deadlines</div>
      <div
        v-for="d in deadlines"
        :key="d.id"
        class="flex items-center justify-between bg-white rounded-lg shadow my-2 px-4 py-3"
        style="margin: 8px 0px"
      >
        <div class="flex items-center gap-2">
          <Checkbox v-model="d.completed" :binary="true" />
          <span class="text-black">{{ d.title }}</span>
        </div>
        <span class="text-gray-500 text-sm">{{ d.time }}</span>
      </div>
    </div>

    <!-- Today's Schedule -->
    <div class="w-full max-w-3xl mb-6 text-black">
      <div class="text-lg font-semibold mb-2" style="margin-bottom: 8px">
        Today's Schedule
      </div>
      <div class="bg-white rounded-lg shadow divide-y">
        <div
          v-for="s in schedule"
          :key="s.id"
          class="flex items-start gap-4 px-4 py-3"
        >
          <div class="w-20 text-xs text-gray-400 pt-1">{{ s.time }}</div>
          <div class="flex-1">
            <div class="font-semibold text-black">{{ s.title }}</div>
            <div class="text-gray-500 text-sm">{{ s.description }}</div>
          </div>
          <div class="pt-1">
            <span
              class="w-3 h-3 rounded-full inline-block"
              :class="s.done ? 'bg-gray-300' : 'bg-gray-500'"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Tag from "primevue/tag";
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";

const now = new Date();
const time = computed(() =>
  now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
);
const date = computed(() =>
  now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  })
);

const currentTask = ref({
  title: "Complete project proposal presentation",
  description:
    "Finalize slides and prepare talking points for Monday's client meeting",
  completed: false,
});

const deadlines = ref([
  {
    id: 1,
    title: "Review marketing materials",
    time: "3:30 PM",
    completed: false,
  },
  { id: 2, title: "Team standup meeting", time: "4:00 PM", completed: false },
  { id: 3, title: "Submit expense report", time: "6:00 PM", completed: false },
]);

const schedule = ref([
  {
    id: 1,
    time: "9:00 AM",
    title: "Morning planning session",
    description: "Review daily priorities and goals",
    done: false,
  },
  {
    id: 2,
    time: "11:00 AM",
    title: "Client call - Project Alpha",
    description: "Discuss requirements and timeline",
    done: false,
  },
  {
    id: 3,
    time: "2:30 PM",
    title: "Complete project proposal",
    description: "Current task - in progress",
    done: false,
  },
  {
    id: 4,
    time: "4:00 PM",
    title: "Team standup meeting",
    description: "Daily sync with development team",
    done: false,
  },
  {
    id: 5,
    time: "5:30 PM",
    title: "Wrap-up and planning",
    description: "Review completed tasks and plan tomorrow",
    done: true,
  },
]);
</script>

<style scoped>
.fixed {
  position: fixed;
}
</style>
