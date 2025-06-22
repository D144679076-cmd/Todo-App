<script setup>
import { ref, computed } from "vue";
import { Card } from "primevue";
import { ProgressBar } from "primevue";
import { Avatar } from "primevue";
import { AvatarGroup } from "primevue";
import { Tag } from "primevue";
import { InputText } from "primevue";
import { Calendar } from "primevue";
import { Dropdown } from "primevue";
import { Button } from "primevue";
import { Paginator } from "primevue";
import { Divider } from "primevue";
const statusOptions = [
  { label: "All Status", value: null },
  { label: "Active", value: "Active" },
  { label: "In Progress", value: "In Progress" },
  { label: "On Hold", value: "On Hold" },
];

const filters = ref({ name: "", startDate: null, status: null });
const page = ref(0);

const projects = ref([
  {
    id: 1,
    name: "Website Redesign",
    startDate: "Jan 15, 2025",
    status: "Active",
    progress: 65,
    nextTask: {
      title: "UI/UX Review",
      description: "Design review meeting",
      due: "Feb 5, 2025",
      priority: "High Priority",
    },
    members: ["A", "B", "C", "D"],
  },
  {
    id: 2,
    name: "Mobile App Development",
    startDate: "Dec 20, 2024",
    status: "In Progress",
    progress: 40,
    nextTask: {
      title: "API Integration",
      description: "Connect backend services",
      due: "Feb 10, 2025",
      priority: "Medium Priority",
    },
    members: ["E", "F"],
  },
  {
    id: 3,
    name: "Marketing Campaign",
    startDate: "Jan 8, 2025",
    status: "Active",
    progress: 80,
    nextTask: {
      title: "Campaign Launch",
      description: "Final campaign deployment",
      due: "Feb 1, 2025",
      priority: "High Priority",
    },
    members: ["G", "H", "I", "J"],
  },
  {
    id: 4,
    name: "Database Migration",
    startDate: "Nov 30, 2024",
    status: "On Hold",
    progress: 25,
    nextTask: {
      title: "Data Backup",
      description: "Complete system backup",
      due: "Feb 15, 2025",
      priority: "Low Priority",
    },
    members: ["K", "L"],
  },
  // ...add more sample projects as needed
]);

const filteredProjects = computed(() => {
  return projects.value.filter((p) => {
    const nameMatch =
      !filters.value.name ||
      p.name.toLowerCase().includes(filters.value.name.toLowerCase());
    const statusMatch =
      !filters.value.status || p.status === filters.value.status;
    const dateMatch =
      !filters.value.startDate ||
      Date.parse(new Date(p.startDate)) === Date.parse(filters.value.startDate);
    return nameMatch && statusMatch && dateMatch;
  });
});

const paginatedProjects = computed(() => {
  const start = page.value * 4;
  return filteredProjects.value.slice(start, start + 4);
});

function clearFilters() {
  filters.value = { name: "", startDate: null, status: null };
}
function applyFilters() {
  page.value = 0;
}
function statusSeverity(status) {
  switch (status) {
    case "Active":
      return "success";
    case "In Progress":
      return "info";
    case "On Hold":
      return "warning";
    default:
      return null;
  }
}
function prioritySeverity(priority) {
  if (priority === "High Priority") return "danger";
  if (priority === "Medium Priority") return "info";
  return "secondary";
}
</script>
<template>
  <div class="flex flex-col h-full w-full">
    <div
      class="project-list-container space-y-8 max-h-full bg-gray-200"
      style="height: 100vh; margin-top: 49px; padding: 1rem"
    >
      <!-- Filters -->
      <div class="filters bg-white rounded-lg shadow p-6 mb-8">
        <div class="grid grid-cols-3 gap-4">
          <div>
            <span class="text-sm font-bold mb-4 text-black">
              Project name
            </span>
            <InputText
              v-model="filters.name"
              placeholder="Search projects..."
              class="pl-10 w-full mt-2"
            />
          </div>
          <div>
            <span class="text-sm font-bold mb-4 text-black"> Start date </span>
            <Calendar
              v-model="filters.startDate"
              placeholder="dd/mm/yyyy"
              dateFormat="dd/mm/yy"
              showIcon
              class="w-full"
            />
          </div>
          <div>
            <span class="text-sm font-bold mb-4 text-black"> Status </span>
            <Dropdown
              v-model="filters.status"
              :options="statusOptions"
              placeholder="All Status"
              option-label="label"
              option-value="value"
              class="w-full"
            />
          </div>
        </div>
        <div class="flex justify-end mt-2" style="gap: 10px; margin-top: 8px">
          <Button
            label="Clear"
            @click="clearFilters"
            icon="pi pi-refresh"
            outlined
          />
        </div>
      </div>
      <div
        class="flex items-center mt-4 w-full justify-items-end justify-end"
        style="margin-top: 8px"
      >
        <Button label="Add Project" class="mt-4" icon="pi pi-plus" @click="" />
      </div>
      <!-- Project Cards -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-black"
        style="margin-top: 16px"
      >
        <div v-for="project in paginatedProjects" :key="project.id">
          <div class="bg-white rounded-lg shadow p-6 flex flex-col h-full">
            <div class="flex items-center justify-between mb-2">
              <h2 class="text-lg font-semibold">{{ project.name }}</h2>
              <Tag
                :value="project.status"
                :severity="statusSeverity(project.status)"
                class="ml-2"
              />
            </div>
            <div class="text-sm text-gray-500 mb-4">
              Started: {{ project.startDate }}
            </div>
            <div class="mb-4">
              <div class="font-medium mb-1">Progress</div>
              <ProgressBar :value="project.progress" class="h-3 rounded" />
            </div>
            <div class="mb-4">
              <div class="font-medium mb-1">Next Upcoming Task</div>
              <div class="bg-gray-50 rounded p-3">
                <div class="font-semibold">{{ project.nextTask.title }}</div>
                <div class="text-xs text-gray-500">
                  {{ project.nextTask.description }}
                </div>
                <div class="flex items-center justify-between mt-2">
                  <span class="text-xs text-black"
                    >Due: {{ project.nextTask.due }}</span
                  >
                  <Tag
                    :value="project.nextTask.priority"
                    :severity="prioritySeverity(project.nextTask.priority)"
                  />
                </div>
              </div>
            </div>
            <Divider />
            <div class="flex items-center space-x-2 mt-2 justify-between">
              <AvatarGroup>
                <Avatar
                  v-for="user in project.members"
                  :key="user"
                  :label="user[0]"
                  shape="circle"
                />
              </AvatarGroup>
              <Button icon="pi pi-ellipsis-v" outlined text @click="" />
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex justify-between items-center" style="margin-top: 16px">
        <div class="text-sm text-gray-500">
          Showing {{ page * 4 + 1 }} to
          {{ Math.min((page + 1) * 4, filteredProjects.length) }} of
          {{ filteredProjects.length }} projects
        </div>
        <Paginator
          :rows="4"
          :totalRecords="filteredProjects.length"
          v-model:first="page"
        />
      </div>
    </div>
  </div>
</template>
