<script setup lang="ts">
import { ref, watch } from "vue";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Tag from "primevue/tag";
import { useToast } from "primevue/usetoast";
import { Card, Select } from "primevue";
import Toast from "primevue/toast";

interface Task {
  id: number;
  title: string;
  description: string;
  priority: string;
  project: string;
  deadline: string;
  status: string;
  notes: string;
}

const toast = useToast();

// Filter options
const priorities = ["High", "Medium", "Low"];
const projects = ["Website Redesign", "Mobile App", "Marketing Campaign"];
const deadlines = ["This Week", "This Month", "Next Month"];

// Selected filter values
const selectedPriority = ref<string | null>(null);
const selectedProject = ref<string | null>(null);
const selectedDeadline = ref<string | null>(null);
const selectedTasks = ref<Task[]>([]);
// Sample tasks data
const tasks = ref<Task[]>([
  {
    id: 1,
    title: "Design homepage mockup",
    description: "Create wireframes and visual design",
    priority: "High",
    project: "Website Redesign",
    deadline: "Jan 25, 2025",
    status: "In Progress",
    notes: "",
  },
  {
    id: 2,
    title: "Update user documentation",
    description: "Review and update API docs",
    priority: "Low",
    project: "Mobile App",
    deadline: "Jan 30, 2025",
    status: "Completed",
    notes: "",
  },
  {
    id: 3,
    title: "Prepare marketing materials",
    description: "Create brochures and social media content",
    priority: "Medium",
    project: "Marketing Campaign",
    deadline: "Feb 05, 2025",
    status: "Not Started",
    notes: "",
  },
]);

// Utility functions
const getPrioritySeverity = (priority: string) => {
  const severityMap = {
    High: "danger",
    Medium: "warning",
    Low: "info",
  };
  return severityMap[priority as keyof typeof severityMap] || "info";
};

const getStatusSeverity = (status: string) => {
  const severityMap = {
    Completed: "success",
    "In Progress": "info",
    "Not Started": "warning",
  };
  return severityMap[status as keyof typeof severityMap] || "info";
};

// Action handlers
const applyFilters = () => {
  toast.add({
    severity: "info",
    summary: "Filters Applied",
    detail: "Task list has been filtered",
    life: 3000,
  });
};

const openAddTaskDialog = () => {
  // Implement add task dialog logic here
};

const editTask = (task: Task | Task[]) => {
  // Implement edit task logic here
};

const confirmDeleteTask = (task: Task) => {
  // Implement delete confirmation logic here
};
watch([selectedPriority, selectedProject, selectedDeadline], () => {
  applyFilters();
});
const customTable = ref({
  light: {
    header: {
      background: "{slate.800}",
      color: "#ffffff",
      cell: {
        border: {
          color: "{slate.800}",
        },
        background: "{slate.800}",
        color: "#ffffff",
      },
    },
    row: {
      background: "{slate.800}",
      color: "#ffffff",
    },
    body: {
      cell: {
        border: {
          color: "{slate.800}",
        },
        background: "{slate.800}",
      },
    },
    paginator: {
      background: "{slate.800}",
      color: "#ffffff",
      bottom: {
        border: {
          color: "{slate.800}",
        },
      },
    },
    footer: {
      border: {
        color: "{slate.800}",
      },
      color: "{slate.800}",
      background: "{slate.800}",
    },
  },
  dark: {
    header: {
      background: "{slate.800}",
      color: "#ffffff",
      cell: {
        border: {
          color: "{slate.800}",
        },
        background: "{slate.800}",
        color: "#ffffff",
      },
    },
    row: {
      background: "{slate.800}",
      color: "#ffffff",
    },
    body: {
      cell: {
        border: {
          color: "{slate.800}",
        },
      },
    },
    paginator: {
      background: "{slate.800}",
      color: "#ffffff",
      bottom: {
        border: {
          color: "{slate.800}",
        },
      },
    },
    footer: {
      border: {
        color: "{slate.800}",
      },
      color: "{slate.800}",
      background: "{slate.800}",
    },
  },
});
</script>
<template>
  <Toast />
  <div
    class="task-list-container w-full h-full flex flex-col p-0 gap-y-2 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"
  >
    <!-- Filters Section -->
    <div
      class="filters mb-4 px-8 py-8 bg-slate-800"
      style="margin: 16px; border-radius: 8px"
    >
      <div class="flex flex-col gap-y-4 w-full">
        <h2 class="text-xl font-bold mb-3 text-white">Filters</h2>
        <div class="grid grid-cols-3 gap-4">
          <div class="filter-group flex flex-col gap-y-2">
            <label class="block mb-2 text-white">Priority</label>
            <Select
              v-model="selectedPriority"
              :options="priorities"
              placeholder="All Priorities"
              class="w-full"
            />
          </div>
          <div class="filter-group flex flex-col gap-y-2">
            <label class="block mb-2 text-white">Project</label>
            <Select
              v-model="selectedProject"
              :options="projects"
              placeholder="All Projects"
              class="w-full"
            />
          </div>
          <div class="filter-group flex flex-col gap-y-2">
            <label class="block mb-2 text-white">Deadline</label>
            <Select
              v-model="selectedDeadline"
              :options="deadlines"
              placeholder="All Deadlines"
              class="w-full"
            />
          </div>
        </div>
        <div class="filter-group items-end gap-2 flex justify-end">
          <Button
            label="Reset Filters"
            class="ml-2"
            icon="pi pi-refresh"
            @click="
              () => {
                selectedPriority = null;
                selectedProject = null;
                selectedDeadline = null;
              }
            "
          />
        </div>
      </div>
    </div>

    <!-- Tasks Section -->
    <div style="margin: 16px; border-radius: 8px" class="bg-slate-800">
      <div class="tasks flex-1 flex flex-col px-8 gap-y-3 py-8">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-white">Tasks</h2>
          <div class="flex gap-2">
            <Button
              label="Edit"
              icon="pi pi-pencil"
              @click="editTask(selectedTasks)"
              v-bind:disabled="selectedTasks.length <= 0"
            />
            <Button
              label="Add Task"
              icon="pi pi-plus"
              class="p-button-primary"
              @click="openAddTaskDialog"
            />
          </div>
        </div>

        <div class="flex-1">
          <DataTable
            :value="tasks"
            :paginator="true"
            :rows="10"
            responsiveLayout="scroll"
            class="h-full w-full"
            style="min-height: 400px; height: 100%"
            v-model:selection="selectedTasks"
            :dt="customTable"
          >
            <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
            <Column field="title" header="TASK">
              <template #body="slotProps">
                <div>
                  <div class="font-bold">{{ slotProps.data.title }}</div>
                  <div class="text-sm text-gray-400">
                    {{ slotProps.data.description }}
                  </div>
                </div>
              </template>
            </Column>
            <Column field="priority" header="PRIORITY">
              <template #body="slotProps">
                <Tag
                  :value="slotProps.data.priority"
                  :severity="getPrioritySeverity(slotProps.data.priority)"
                />
              </template>
            </Column>
            <Column field="project" header="PROJECT" />
            <Column field="deadline" header="DEADLINE" />
            <Column field="status" header="STATUS">
              <template #body="slotProps">
                <Tag
                  :value="slotProps.data.status"
                  :severity="getStatusSeverity(slotProps.data.status)"
                />
              </template>
            </Column>
            <Column field="notes" header="NOTES" />
            <Column
              header="ACTIONS"
              :exportable="false"
              style="min-width: 8rem"
            >
              <template #body="slotProps">
                <Button
                  icon="pi pi-pencil"
                  class="p-button-rounded p-button-text mr-2"
                  @click="editTask(slotProps.data)"
                />
                <Button
                  icon="pi pi-trash"
                  class="p-button-rounded p-button-text p-button-danger"
                  @click="confirmDeleteTask(slotProps.data)"
                />
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.task-list-container {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  min-height: 100vh;
  width: 100vw;
  padding: 0;
  margin-top: 21px; /* Adjust based on your navbar height */
  max-width: 100%;
}

:deep(.p-datatable) {
  overflow: hidden;
  height: 100%;
  border-radius: 8px 8px;
}

:deep(.p-datatable-wrapper) {
  height: 100% !important;
}

:deep(.p-dropdown) {
  width: 100%;
}

:deep(.p-tag) {
  font-size: 0.875rem;
}
:deep(.p-paginator) {
  border-radius: 0px 0px 8px 8px;
  background-color: var(--color-slate-800);
  color: white;
}
</style>
