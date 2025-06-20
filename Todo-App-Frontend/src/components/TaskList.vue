<script setup>
import { ref } from "vue";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Tag from "primevue/tag";
import { useToast } from "primevue/usetoast";
import { Card } from "primevue";

const toast = useToast();

// Filter options
const priorities = ["High", "Medium", "Low"];
const projects = ["Website Redesign", "Mobile App", "Marketing Campaign"];
const deadlines = ["This Week", "This Month", "Next Month"];

// Selected filter values
const selectedPriority = ref(null);
const selectedProject = ref(null);
const selectedDeadline = ref(null);
const selectedTasks = ref([]);
// Sample tasks data
const tasks = ref([
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
const getPrioritySeverity = (priority) => {
  const severityMap = {
    High: "danger",
    Medium: "warning",
    Low: "info",
  };
  return severityMap[priority] || "info";
};

const getStatusSeverity = (status) => {
  const severityMap = {
    Completed: "success",
    "In Progress": "info",
    "Not Started": "warning",
  };
  return severityMap[status] || "info";
};

// Action handlers
const applyFilters = () => {
  // Implement filter logic here
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

const editTask = (task) => {
  // Implement edit task logic here
};

const confirmDeleteTask = (task) => {
  // Implement delete confirmation logic here
};
</script>
<template>
  <div
    class="task-list-container w-full h-full flex flex-col p-0 gap-y-2 bg-gray-200"
  >
    <!-- Filters Section -->
    <div
      class="filters mb-4 px-8 py-8 bg-white"
      style="margin: 16px; border-radius: 8px"
    >
      <h2 class="text-xl font-bold mb-3 text-black">Filters</h2>
      <div class="grid grid-cols-4 gap-4">
        <div class="filter-group">
          <label class="block mb-2 text-black">Priority</label>
          <Dropdown
            v-model="selectedPriority"
            :options="priorities"
            placeholder="All Priorities"
            class="w-full"
          />
        </div>
        <div class="filter-group">
          <label class="block mb-2 text-black">Project</label>
          <Dropdown
            v-model="selectedProject"
            :options="projects"
            placeholder="All Projects"
            class="w-full"
          />
        </div>
        <div class="filter-group">
          <label class="block mb-2 text-black">Deadline</label>
          <Dropdown
            v-model="selectedDeadline"
            :options="deadlines"
            placeholder="All Deadlines"
            class="w-full"
          />
        </div>
        <div class="filter-group flex items-end gap-2">
          <Button
            label="Apply Filters"
            class="p-button-primary w-full"
            icon="pi pi-filter"
            @click="applyFilters"
          />
          <Button
            label="Reset Filters"
            class="p-button-secondary w-full ml-2"
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
    <div style="margin: 16px; border-radius: 8px" class="bg-white">
      <div class="tasks flex-1 flex flex-col px-8 gap-y-3 py-8">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-black">Tasks</h2>
          <div class="flex gap-2">
            <Button
              label="Edit"
              icon="pi pi-pencil"
              class="p-button-secondary mr-2"
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
            class="p-datatable-sm h-full w-full"
            style="min-height: 400px; height: 100%"
            v-model:selection="selectedTasks"
          >
            <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
            <Column field="title" header="TASK">
              <template #body="slotProps">
                <div>
                  <div class="font-bold">{{ slotProps.data.title }}</div>
                  <div class="text-sm text-gray-500">
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
  margin-top: 49px; /* Adjust based on your navbar height */
  max-width: 100%;
}

:deep(.p-datatable) {
  border-radius: 8px;
  overflow: hidden;
  height: 100%;
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
</style>
