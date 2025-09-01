<script setup lang="ts">
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
import FeatureCard from "./FeatureCard.vue";
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
      new Date(p.startDate).getTime() ===
        new Date(filters.value.startDate).getTime();
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
function statusSeverity(
  status: string
): "success" | "info" | "warn" | undefined {
  switch (status) {
    case "Active":
      return "success";
    case "In Progress":
      return "info";
    case "On Hold":
      return "warn";
    default:
      return undefined;
  }
}
function prioritySeverity(priority: string): "danger" | "info" | "secondary" {
  if (priority === "High Priority") return "danger";
  if (priority === "Medium Priority") return "info";
  return "secondary";
}
</script>
<template>
  <div
    class="flex flex-col h-full w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"
  >
    <!-- Projects Overview Section -->
    <div class="text-center py-12" v-if="paginatedProjects.length <= 0">
      <div class="space-y-6">
        <h2 class="text-3xl font-bold text-gray-900 mb-2">Projects Overview</h2>
        <p class="text-gray-600 leading-relaxed max-w-2xl mx-auto">
          Manage complex projects with team collaboration, milestone tracking,
          and resource allocation.
        </p>

        <div class="grid md:grid-cols-3 gap-6 mt-8">
          <FeatureCard
            icon="pi pi-bolt"
            title="Lightning Fast Performance"
            description="Experience blazing-fast task processing with our optimized algorithms and intelligent caching system."
            gradient="primary"
          />

          <FeatureCard
            icon="pi pi-shield"
            title="Enterprise Security"
            description="Bank-grade encryption and multi-layer security protocols protect your sensitive data and workflows."
            gradient="accent"
          />

          <FeatureCard
            icon="pi pi-users"
            title="Real-time Collaboration"
            description="Seamless team coordination with live updates, instant notifications, and collaborative workspaces."
            gradient="success"
          />
        </div>
      </div>
    </div>

    <div
      class="project-list-container space-y-8 max-h-full"
      style="height: 100vh; margin-top: 21px; padding: 1rem"
      v-else
    >
      <!-- Filters -->
      <div
        class="filters bg-gradient-to-br from-slate-700 via-blue-700 to-slate-800 rounded-lg shadow p-6 mb-8"
      >
        <div class="grid grid-cols-3 gap-4">
          <div class="flex flex-col gap-y-2">
            <span class="text-sm font-bold mb-4 text-white">
              Project name
            </span>
            <InputText
              v-model="filters.name"
              placeholder="Search projects..."
              class="pl-10 w-full mt-2"
            />
          </div>
          <div class="flex flex-col gap-y-2">
            <span class="text-sm font-bold mb-4 text-white"> Start date </span>
            <Calendar
              v-model="filters.startDate"
              placeholder="dd/mm/yyyy"
              dateFormat="dd/mm/yy"
              showIcon
              class="w-full"
            />
          </div>
          <div class="flex flex-col gap-y-2">
            <span class="text-sm font-bold mb-4 text-white"> Status </span>
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
          <Button label="Clear" @click="clearFilters" icon="pi pi-refresh" />
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
        <div class="text-sm text-white">
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
