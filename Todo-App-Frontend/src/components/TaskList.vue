<script setup lang="ts">
import { ref, watch, computed } from "vue";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Tag from "primevue/tag";
import { useToast } from "primevue/usetoast";
import Select from "primevue/select";
import Toast from "primevue/toast";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import DatePicker from "primevue/datepicker";
import { useMutation, useQuery } from "@tanstack/vue-query";
import useAPI from "@/composables/api/useAPI";
import { TASK_STATUS } from "@/composables/lib/enums";
import { Tasks, Projects } from "@/composables/lib/respone";
import { useAuth } from "@/composables/useAuth";

const toast = useToast();
const { queryTasks, queryProjects, createTask, updateTask, deleteTask } = useAPI();

// Filter options
const priorities = ["HIGH", "MEDIUM", "LOW"];
const statuses = [
  { label: "All", value: null },
  { label: "Pending", value: TASK_STATUS.PENDING },
  { label: "In Progress", value: TASK_STATUS.IN_PROGRESS },
  { label: "Completed", value: TASK_STATUS.COMPLETED },
  { label: "Cancelled", value: TASK_STATUS.CANCELLED },
];

// Selected filter values
const selectedPriority = ref<string | null>(null);
const selectedProject = ref<number | null>(null);
const selectedStatus = ref<string | null>(null);
const selectedTasks = ref<Tasks[]>([]);

// Dialog states
const showAddDialog = ref(false);
const showEditDialog = ref(false);
const editingTask = ref<Partial<Tasks>>({});

// Form data for new/edit task
const taskForm = ref<Partial<Tasks>>({
  title: "",
  description: "",
  priority: "MEDIUM",
  status: TASK_STATUS.PENDING,
  project_id: undefined,
  deadline: undefined,
});

// Fetch tasks with filters
const { data: tasks, isLoading, isError, refetch: refetchTasks } = useQuery({
  queryKey: ["tasks"],
  queryFn: () => queryTasks({
    user_id: useAuth().authData.value?.user_id,
    ...(selectedPriority.value && { priority: selectedPriority.value }),
    ...(selectedProject.value && { project_id: selectedProject.value }),
    ...(selectedStatus.value && { status: selectedStatus.value }),
  }),
  select: (data) => data.data as any as Tasks[],
});

// Fetch projects for dropdown
const { data: projects } = useQuery({
  queryKey: ["projects"],
  queryFn: () => queryProjects({
    user_id: useAuth().authData.value?.user_id,
  }),
  select: (data) => data.data as any as Projects[],
});

// Project options for dropdown
const projectOptions = computed(() => {
  return projects.value?.map(p => ({ label: p.name, value: p.id })) || [];
});

// Create task mutation
const { mutate: createTaskMutate, isPending: isCreating } = useMutation({
  mutationKey: ["create-task"],
  mutationFn: (newTask: Partial<Tasks>) => createTask({
    ...newTask,
    user_id: useAuth().authData.value?.user_id,
  }),
  onSuccess: () => {
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Task created successfully",
      life: 3000,
    });
    refetchTasks();
    showAddDialog.value = false;
    resetTaskForm();
  },
  onError: () => {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Failed to create task",
      life: 3000,
    });
  },
});

// Update task mutation
const { mutate: updateTaskMutate, isPending: isUpdating } = useMutation({
  mutationKey: ["update-task"],
  mutationFn: (data: Partial<Tasks>) => updateTask(data.id ?? 0, data),
  onSuccess: () => {
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Task updated successfully",
      life: 3000,
    });
    refetchTasks();
    showEditDialog.value = false;
    resetTaskForm();
  },
  onError: () => {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Failed to update task",
      life: 3000,
    });
  },
});

// Delete task mutation
const { mutate: deleteTaskMutate, isPending: isDeleting } = useMutation({
  mutationKey: ["delete-task"],
  mutationFn: (id: number) => deleteTask(id),
  onSuccess: () => {
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Task deleted successfully",
      life: 3000,
    });
    refetchTasks();
  },
  onError: () => {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Failed to delete task",
      life: 3000,
    });
  },
});

// Utility functions
const getPrioritySeverity = (priority: string) => {
  const severityMap = {
    HIGH: "danger",
    MEDIUM: "warning",
    LOW: "info",
  };
  return severityMap[priority as keyof typeof severityMap] || "info";
};

const getStatusSeverity = (status: string) => {
  const severityMap = {
    [TASK_STATUS.COMPLETED]: "success",
    [TASK_STATUS.IN_PROGRESS]: "info",
    [TASK_STATUS.PENDING]: "warning",
    [TASK_STATUS.CANCELLED]: "danger",
  };
  return severityMap[status as keyof typeof severityMap] || "info";
};

const formatDate = (date: Date | null | undefined) => {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// Action handlers
const openAddTaskDialog = () => {
  resetTaskForm();
  showAddDialog.value = true;
};

const editTask = (task: Tasks | Tasks[]) => {
  if (Array.isArray(task)) {
    if (task.length === 1) {
      editingTask.value = { ...task[0] };
      taskForm.value = { ...task[0] };
      showEditDialog.value = true;
    } else if (task.length > 1) {
      toast.add({
        severity: "warn",
        summary: "Warning",
        detail: "Please select only one task to edit",
        life: 3000,
      });
    }
  } else {
    editingTask.value = { ...task };
    taskForm.value = { ...task };
    showEditDialog.value = true;
  }
};

const confirmDeleteTask = (task: Tasks) => {
  if (confirm(`Are you sure you want to delete "${task.title}"?`)) {
    deleteTaskMutate(task.id);
  }
};

const handleSaveTask = () => {
  if (!taskForm.value.title || !taskForm.value.title.trim()) {
    toast.add({
      severity: "warn",
      summary: "Warning",
      detail: "Please enter a task title",
      life: 3000,
    });
    return;
  }

  if (showEditDialog.value && editingTask.value.id) {
    updateTaskMutate({ ...taskForm.value, id: editingTask.value.id });
  } else {
    createTaskMutate(taskForm.value);
  }
};

const resetTaskForm = () => {
  taskForm.value = {
    title: "",
    description: "",
    priority: "MEDIUM",
    status: TASK_STATUS.PENDING,
    project_id: undefined,
    deadline: undefined,
  };
  editingTask.value = {};
};

const getProjectName = (projectId: number) => {
  const project = projects.value?.find(p => p.id === projectId);
  return project?.name || "N/A";
};

// Watch filters and refetch
watch([selectedPriority, selectedProject, selectedStatus], () => {
  refetchTasks();
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
              showClear
            />
          </div>
          <div class="filter-group flex flex-col gap-y-2">
            <label class="block mb-2 text-white">Project</label>
            <Select
              v-model="selectedProject"
              :options="projectOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="All Projects"
              class="w-full"
              showClear
            />
          </div>
          <div class="filter-group flex flex-col gap-y-2">
            <label class="block mb-2 text-white">Status</label>
            <Select
              v-model="selectedStatus"
              :options="statuses"
              optionLabel="label"
              optionValue="value"
              placeholder="All Statuses"
              class="w-full"
              showClear
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
                selectedStatus = null;
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
            :loading="isLoading"
            :paginator="true"
            :rows="10"
            :rowsPerPageOptions="[5, 10, 20, 50]"
            responsiveLayout="scroll"
            class="h-full w-full"
            style="min-height: 400px; height: 100%"
            v-model:selection="selectedTasks"
            dataKey="id"
            :dt="customTable"
          >
            <template #empty>
              <div class="text-center py-4 text-gray-400">
                {{ isError ? 'Error loading tasks' : 'No tasks found' }}
              </div>
            </template>
            <template #loading>
              <div class="text-center py-4">Loading tasks...</div>
            </template>

            <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
            <Column field="title" header="TASK">
              <template #body="slotProps">
                <div>
                  <div class="font-bold">{{ slotProps.data.title }}</div>
                  <div class="text-sm text-gray-400">
                    {{ slotProps.data.description || "No description" }}
                  </div>
                </div>
              </template>
            </Column>
            <Column field="priority" header="PRIORITY" :sortable="true">
              <template #body="slotProps">
                <Tag
                  :value="slotProps.data.priority"
                  :severity="getPrioritySeverity(slotProps.data.priority)"
                />
              </template>
            </Column>
            <Column field="project_id" header="PROJECT" :sortable="true">
              <template #body="slotProps">
                {{ getProjectName(slotProps.data.project_id) }}
              </template>
            </Column>
            <Column field="deadline" header="DEADLINE" :sortable="true">
              <template #body="slotProps">
                {{ formatDate(slotProps.data.deadline) }}
              </template>
            </Column>
            <Column field="status" header="STATUS" :sortable="true">
              <template #body="slotProps">
                <Tag
                  :value="slotProps.data.status"
                  :severity="getStatusSeverity(slotProps.data.status)"
                />
              </template>
            </Column>
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
                  :disabled="isUpdating || isDeleting"
                />
                <Button
                  icon="pi pi-trash"
                  class="p-button-rounded p-button-text p-button-danger"
                  @click="confirmDeleteTask(slotProps.data)"
                  :disabled="isUpdating || isDeleting"
                />
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </div>

    <!-- Add Task Dialog -->
    <Dialog
      v-model:visible="showAddDialog"
      header="Add New Task"
      :modal="true"
      :style="{ width: '50vw' }"
      :closable="!isCreating"
      class="!bg-slate-800 !text-white"
    >
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label for="title" class="font-semibold">Title *</label>
          <InputText
            id="title"
            v-model="taskForm.title"
            placeholder="Enter task title"
            :disabled="isCreating"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label for="description" class="font-semibold">Description</label>
          <Textarea
            id="description"
            v-model="taskForm.description"
            rows="3"
            placeholder="Enter task description"
            :disabled="isCreating"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col gap-2">
            <label for="priority" class="font-semibold">Priority</label>
            <Select
              id="priority"
              v-model="taskForm.priority"
              :options="priorities"
              placeholder="Select priority"
              class="w-full"
              :disabled="isCreating"
            />
          </div>

          <div class="flex flex-col gap-2">
            <label for="status" class="font-semibold">Status</label>
            <Select
              id="status"
              v-model="taskForm.status"
              :options="statuses"
              optionLabel="label"
              optionValue="value"
              placeholder="Select status"
              class="w-full"
              :disabled="isCreating"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col gap-2">
            <label for="project" class="font-semibold">Project</label>
            <Select
              id="project"
              v-model="taskForm.project_id"
              :options="projectOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="Select project"
              class="w-full"
              :disabled="isCreating"
            />
          </div>

          <div class="flex flex-col gap-2">
            <label for="deadline" class="font-semibold">Deadline</label>
            <DatePicker
              id="deadline"
              v-model="taskForm.deadline"
              dateFormat="yy-mm-dd"
              placeholder="Select deadline"
              class="w-full"
              :disabled="isCreating"
            />
          </div>
        </div>
      </div>

      <template #footer>
        <Button
          label="Cancel"
          icon="pi pi-times"
          @click="showAddDialog = false"
          class="p-button-text"
          :disabled="isCreating"
        />
        <Button
          label="Save"
          icon="pi pi-check"
          @click="handleSaveTask"
          :loading="isCreating"
        />
      </template>
    </Dialog>

    <!-- Edit Task Dialog -->
    <Dialog
      v-model:visible="showEditDialog"
      header="Edit Task"
      :modal="true"
      :style="{ width: '50vw' }"
      :closable="!isUpdating"
    >
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label for="edit-title" class="font-semibold">Title *</label>
          <InputText
            id="edit-title"
            v-model="taskForm.title"
            placeholder="Enter task title"
            :disabled="isUpdating"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label for="edit-description" class="font-semibold">Description</label>
          <Textarea
            id="edit-description"
            v-model="taskForm.description"
            rows="3"
            placeholder="Enter task description"
            :disabled="isUpdating"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col gap-2">
            <label for="edit-priority" class="font-semibold">Priority</label>
            <Select
              id="edit-priority"
              v-model="taskForm.priority"
              :options="priorities"
              placeholder="Select priority"
              class="w-full"
              :disabled="isUpdating"
            />
          </div>

          <div class="flex flex-col gap-2">
            <label for="edit-status" class="font-semibold">Status</label>
            <Select
              id="edit-status"
              v-model="taskForm.status"
              :options="statuses"
              optionLabel="label"
              optionValue="value"
              placeholder="Select status"
              class="w-full"
              :disabled="isUpdating"
            />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col gap-2">
            <label for="edit-project" class="font-semibold">Project</label>
            <Select
              id="edit-project"
              v-model="taskForm.project_id"
              :options="projectOptions"
              optionLabel="label"
              optionValue="value"
              placeholder="Select project"
              class="w-full"
              :disabled="isUpdating"
            />
          </div>

          <div class="flex flex-col gap-2">
            <label for="edit-deadline" class="font-semibold">Deadline</label>
            <DatePicker
              id="edit-deadline"
              v-model="taskForm.deadline"
              dateFormat="yy-mm-dd"
              placeholder="Select deadline"
              class="w-full"
              :disabled="isUpdating"
            />
          </div>
        </div>
      </div>

      <template #footer>
        <Button
          label="Cancel"
          icon="pi pi-times"
          @click="showEditDialog = false"
          class="p-button-text"
          :disabled="isUpdating"
        />
        <Button
          label="Update"
          icon="pi pi-check"
          @click="handleSaveTask"
          :loading="isUpdating"
        />
      </template>
    </Dialog>
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
  border-radius: 0 0 8px 8px;
  background-color: var(--color-slate-800);
  color: white;
}
</style>
