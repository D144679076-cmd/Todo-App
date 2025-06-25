<script setup lang="ts">
import { ref, computed } from "vue";
import { Button, SelectButton } from "primevue";
const today = new Date();
const currentMonth = ref(today.getMonth());
const currentYear = ref(today.getFullYear());
const view = ref("month");

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const events = ref([
  {
    id: 1,
    date: "2025-01-01",
    title: "Team Meeting 9AM",
    type: "meeting",
    icon: "pi pi-circle-fill text-xs",
  },
  {
    id: 2,
    date: "2025-01-03",
    title: "Project Deadline",
    type: "deadline",
    icon: "pi pi-exclamation-circle",
  },
  {
    id: 3,
    date: "2025-01-06",
    title: "Client Call 2PM",
    type: "meeting",
    icon: "pi pi-users",
  },
  {
    id: 4,
    date: "2025-01-08",
    title: "Presentation",
    type: "meeting",
    icon: "pi pi-circle-fill text-xs",
  },
  {
    id: 5,
    date: "2025-01-08",
    title: "Report Due",
    type: "deadline",
    icon: "pi pi-flag",
  },
  {
    id: 6,
    date: "2025-01-15",
    title: "All Hands 10AM",
    type: "meeting",
    icon: "pi pi-calendar",
  },
  {
    id: 7,
    date: "2025-01-17",
    title: "Sprint Deadline",
    type: "deadline",
    icon: "pi pi-circle-fill text-xs",
  },
  {
    id: 8,
    date: "2025-01-22",
    title: "Partnership Meet",
    type: "meeting",
    icon: "pi pi-users",
  },
  {
    id: 9,
    date: "2025-01-30",
    title: "Contract Due",
    type: "deadline",
    icon: "pi pi-briefcase",
  },
]);

const monthYear = computed(() => {
  return new Date(currentYear.value, currentMonth.value).toLocaleString(
    "default",
    { month: "long", year: "numeric" }
  );
});

function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}
function firstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

const calendarDays = computed(() => {
  const daysArr = [];
  const firstDay = firstDayOfMonth(currentYear.value, currentMonth.value);
  const numDays = daysInMonth(currentYear.value, currentMonth.value);
  // Previous month's trailing days
  for (let i = 0; i < firstDay; i++) {
    daysArr.push(
      new Date(currentYear.value, currentMonth.value, i - firstDay + 1)
    );
  }
  // Current month
  for (let d = 1; d <= numDays; d++) {
    daysArr.push(new Date(currentYear.value, currentMonth.value, d));
  }
  // Fill to 6 rows (42 days)
  while (daysArr.length < 42) {
    daysArr.push(
      new Date(
        currentYear.value,
        currentMonth.value + 1,
        daysArr.length - numDays - firstDay + 1
      )
    );
  }
  return daysArr;
});

function isToday(date) {
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}
function eventsForDate(date) {
  const dStr = date.toISOString().slice(0, 10);
  return events.value.filter((e) => e.date === dStr);
}
function prevMonth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else {
    currentMonth.value--;
  }
}
function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else {
    currentMonth.value++;
  }
}
function goToday() {
  currentMonth.value = today.getMonth();
  currentYear.value = today.getFullYear();
}
const selectButtonSelect = ref([
  { label: "Month", value: "month" },
  { label: "Week", value: "week" },
  { label: "Day", value: "day" },
]);
const selectedDate = ref(
  new Date(currentYear.value, currentMonth.value, today.getDate())
);

const weekDays = computed(() => {
  const start = new Date(selectedDate.value);
  start.setDate(start.getDate() - start.getDay());
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
});
const dayHours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

function setToWeek(date) {
  selectedDate.value = new Date(date);
}
function setToDay(date) {
  selectedDate.value = new Date(date);
}
function eventsForWeekDay(date, hour) {
  const dStr = date.toISOString().slice(0, 10);
  return events.value.filter(
    (e) => e.date === dStr && (!e.time || e.time.startsWith(hour))
  );
}
function eventsForDayHour(date, hour) {
  const dStr = date.toISOString().slice(0, 10);
  return events.value.filter(
    (e) => e.date === dStr && (!e.time || e.time.startsWith(hour))
  );
}
</script>
<template>
  <div
    class="bg-gray-50 min-h-screen p-8 max-w-screen"
    style="margin-top: 49px"
  >
    <div class="mx-auto">
      <!-- Header -->
      <div
        class="flex items-center justify-between mb-6"
        style="margin-bottom: 12px"
      >
        <div class="flex items-center space-x-4">
          <Button
            icon="pi pi-angle-left"
            class="p-button-text"
            @click="prevMonth"
          />
          <h2 class="text-2xl font-semibold text-black">{{ monthYear }}</h2>
          <Button
            icon="pi pi-angle-right"
            class="p-button-text"
            @click="nextMonth"
          />
        </div>
        <div class="flex gap-2">
          <Button label="Today" class="p-button-outlined" @click="goToday" />
          <SelectButton
            v-model="view"
            @change="view = $event.value"
            :options="selectButtonSelect"
            option-label="label"
            option-value="value"
          />
        </div>
      </div>
      <!-- Calendar Grid -->
      <div
        v-if="view === 'month'"
        class="bg-white rounded-xl shadow p-4 text-black mt-2"
      >
        <div
          class="grid grid-cols-7 border-b text-center text-gray-500 font-medium"
        >
          <div v-for="d in days" :key="d" class="py-2">{{ d }}</div>
        </div>
        <div class="grid grid-cols-7 min-h-[500px]">
          <div
            v-for="(date, idx) in calendarDays"
            :key="idx"
            class="border-t h-32 p-2 align-top relative"
          >
            <div
              :class="[
                isToday(date) ? 'bg-blue-100 text-blue-700' : '',
                ' top-2 left-2 text-xs rounded px-2 py-0.5',
              ]"
            >
              {{ date.getDate() }}
            </div>
            <div class="space-y-1 mt-6">
              <template v-for="event in eventsForDate(date)" :key="event.id">
                <div
                  :class="[
                    'rounded px-2 py-1 text-xs flex items-center gap-1',
                    event.type === 'meeting' ? 'bg-gray-100 text-gray-700' : '',
                    event.type === 'deadline' ? 'bg-gray-900 text-white' : '',
                    event.type === 'today' ? 'bg-blue-100 text-blue-700' : '',
                  ]"
                >
                  <i v-if="event.icon" :class="event.icon" />
                  <span>{{ event.title }}</span>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else-if="view === 'week'"
        class="bg-white rounded-xl shadow p-4 text-black mt-2"
      >
        <div
          class="grid grid-cols-8 border-b text-center text-gray-500 font-medium"
        >
          <div class="py-2">Hour</div>
          <div v-for="d in weekDays" :key="d" class="py-2">
            {{
              d.toLocaleDateString("en-US", {
                weekday: "short",
                day: "numeric",
              })
            }}
          </div>
        </div>
        <div>
          <div
            v-for="hour in dayHours"
            :key="hour"
            class="grid grid-cols-8 border-t min-h-[32px]"
          >
            <div class="text-xs text-gray-400 flex items-center justify-center">
              {{ hour }}
            </div>
            <div v-for="d in weekDays" :key="d" class="relative px-1">
              <template
                v-for="event in eventsForWeekDay(d, hour)"
                :key="event.id"
              >
                <div
                  :class="[
                    'rounded px-2 py-1 text-xs flex items-center gap-1 my-0.5',
                    event.type === 'meeting' ? 'bg-gray-100 text-gray-700' : '',
                    event.type === 'deadline' ? 'bg-gray-900 text-white' : '',
                    event.type === 'today' ? 'bg-blue-100 text-blue-700' : '',
                  ]"
                >
                  <i v-if="event.icon" :class="event.icon" />
                  <span>{{ event.title }}</span>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else-if="view === 'day'"
        class="bg-white rounded-xl shadow p-4 text-black mt-2"
      >
        <div class="flex items-center mb-2">
          <div class="text-lg font-semibold">
            {{
              selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })
            }}
          </div>
        </div>
        <div>
          <div
            v-for="hour in dayHours"
            :key="hour"
            class="border-t min-h-[32px] flex items-center"
          >
            <div class="w-16 text-xs text-gray-400 flex-shrink-0 text-center">
              {{ hour }}
            </div>
            <div class="flex-1 px-1">
              <template
                v-for="event in eventsForDayHour(selectedDate, hour)"
                :key="event.id"
              >
                <div
                  :class="[
                    'rounded px-2 py-1 text-xs flex items-center gap-1 my-0.5',
                    event.type === 'meeting' ? 'bg-gray-100 text-gray-700' : '',
                    event.type === 'deadline' ? 'bg-gray-900 text-white' : '',
                    event.type === 'today' ? 'bg-blue-100 text-blue-700' : '',
                  ]"
                >
                  <i v-if="event.icon" :class="event.icon" />
                  <span>{{ event.title }}</span>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <!-- Legend -->
      <div
        class="flex items-center bg-white rounded-xl p-4 gap-x-3.5"
        style="margin-top: 12px"
      >
        <div class="flex items-center gap-x-2">
          <span class="w-4 h-4 rounded bg-gray-100 inline-block"></span>
          <span class="text-sm text-gray-500">Meetings</span>
        </div>
        <div class="flex items-center gap-x-2">
          <span class="w-4 h-4 rounded bg-gray-900 inline-block"></span>
          <span class="text-sm text-gray-500">Deadlines</span>
        </div>
        <div class="flex items-center gap-x-2">
          <span
            class="w-4 h-4 rounded border border-blue-200 bg-blue-100 inline-block"
          ></span>
          <span class="text-sm text-gray-500">Today</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
