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
import { useToast } from "primevue";
import FeatureCard from "./FeatureCard.vue";
import { useMutation, useQuery } from "@tanstack/vue-query";
import useAPI from "@/composables/api/useAPI";
import { Projects, Tasks } from "@/composables/lib/respone";
import { useAuth } from "@/composables/useAuth";

const { queryProjects, queryTasks, createProject, updateProject, deleteProject } = useAPI();
const toast = useToast();

const statusOptions = [
  { label: "All Status", value: null },
  { label: "Active", value: "Active" },
  { label: "In Progress", value: "In Progress" },
  { label: "On Hold", value: "On Hold" },
];

const filters = ref({ name: "", startDate: null, status: null });
const page = ref(0);

// Fetch projects with real API
const {
  data: projects,
  isLoading: isLoadingProjects,
  isError: isErrorProjects,
  refetch: refetchProjects,
} = useQuery({
  queryKey: ["projects"],
  queryFn: () =>
      queryProjects({
        user_id: useAuth().authData.value?.user_id,
      }),
  select: (data) => data.data as any as Projects[],
});

// Fetch all tasks to get next task for each project
const {
  data: allTasks,
  isLoading: isLoadingTasks,
  isError: isErrorTasks,
} = useQuery({
  queryKey: ["project-tasks"],
  queryFn: () =>
      queryTasks({
        user_id: useAuth().authData.value?.user_id,
      }),
  select: (data) => data.data as any as Tasks[],
});

// Create project mutation
const {
  mutate: createProjectMutate,
  isPending: isCreatingProject,
} = useMutation({
  mutationKey: ["create-project"],
  mutationFn: (newProject: Partial<Projects>) => createProject(newProject),
  onSuccess: () => {
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Project created successfully",
      life: 3000,
    });
    refetchProjects();
  },
  onError: () => {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Failed to create project",
      life: 3000,
    });
  },
});

// Update project mutation
const {
  mutate: updateProjectMutate,
  isPending: isUpdatingProject,
} = useMutation({
  mutationKey: ["update-project"],
  mutationFn: ({
                 id,
                 data,
               }: {
    id: number;
    data: Partial<Projects>;
  }) => updateProject(id, data),
  onSuccess: () => {
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Project updated successfully",
      life: 3000,
    });
    refetchProjects();
  },
  onError: () => {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Failed to update project",
      life: 3000,
    });
  },
});

// Delete project mutation
const {
  mutate: deleteProjectMutate,
  isPending: isDeletingProject,
} = useMutation({
  mutationKey: ["delete-project"],
  mutationFn: (id: number) => deleteProject(id),
  onSuccess: () => {
    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Project deleted successfully",
      life: 3000,
    });
    refetchProjects();
  },
  onError: () => {
    toast.add({
      severity: "error",
      summary: "Error",
      detail: "Failed to delete project",
      life: 3000,
    });
  },
});

// Helper function to get next task for a project
const getNextTaskForProject = (projectId: number) => {
  if (!allTasks.value) return null;

  const projectTasks = allTasks.value.filter(
      (task) => task.project_id === projectId && task.status !== "COMPLETED"
  );

  if (projectTasks.length === 0) return null;

  // Sort by deadline and return the first one
  return projectTasks.sort((a, b) => {
    if (!a.deadline) return 1;
    if (!b.deadline) return -1;
    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
  })[0];
};

const filteredProjects = computed(() => {
  if (!projects.value) return [];

  return projects.value.filter((p) => {
    const nameMatch =
        !filters.value.name ||
        p.name.toLowerCase().includes(filters.value.name.toLowerCase());
    const statusMatch =
        !filters.value.status || p.status === filters.value.status;
    const dateMatch =
        !filters.value.startDate ||
        new Date(p.start_date).toDateString() ===
        new Date(filters.value.startDate).toDateString();
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
function prioritySeverity(priority: string): "danger" | "info" | "secondary" | "warn" {
  const lowerPriority = priority.toLowerCase();
  if (lowerPriority.includes("high")) return "danger";
  if (lowerPriority.includes("medium")) return "warn";
  if (lowerPriority.includes("low")) return "info";
  return "secondary";
}
const customCard = ref({
  background: "{slate.800}",
  color: "#ffffff",
});
const customPaginator = ref({
  background: "{slate.800}",
  color: "#ffffff",
});
</script>
<template>
  <div
      class="flex flex-col  w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 h-screen"
  >
    <!-- Loading State -->
    <div v-if="isLoadingProjects || isLoadingTasks" class="text-center py-12 text-white">
      <i class="pi pi-spin pi-spinner text-5xl mb-4"></i>
      <p>Loading projects...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="isErrorProjects || isErrorTasks" class="text-center py-12 text-red-400">
      <i class="pi pi-exclamation-triangle text-5xl mb-4"></i>
      <p>Failed to load projects. Please try again.</p>
    </div>

    <!-- Empty State - Projects Overview Section -->
    <div class="text-center py-12 h-full  w-full " v-else-if="!projects || projects.length === 0">
      <div class="gap-y-6 flex flex-col items-center justify-center h-full w-full">
        <h2 class="text-3xl font-bold text-white mb-2">Projects Overview</h2>
        <p class="text-white leading-relaxed max-w-2xl mx-auto w-fit">
          Manage complex projects with team collaboration, milestone tracking,
          and resource allocation.
        </p>

        <div class="grid md:grid-cols-3 gap-6 mt-8 w-full px-3 ">
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
      <div class="filters bg-slate-800 rounded-lg shadow p-6 mb-8">
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
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-white"
          style="margin-top: 16px"
      >
        <Card
            v-for="project in paginatedProjects"
            :key="project.id"
            class="h-full"
            :dt="customCard"
        >
          <template #content>
            <div class="p-6 flex flex-col h-full">
              <div class="flex items-center justify-between mb-2">
                <h2 class="text-lg font-semibold">{{ project.name }}</h2>
                <Tag
                    :value="project.status"
                    :severity="statusSeverity(project.status)"
                    class="ml-2"
                />
              </div>
              <div class="text-sm text-gray-400 mb-4">
                Started: {{ new Date(project.start_date).toLocaleDateString() }}
              </div>
              <div class="mb-4">
                <div class="font-medium mb-1">Progress</div>
                <ProgressBar :value="project.current_progress || 0" class="h-3 rounded" />
              </div>
              <div class="mb-4" v-if="getNextTaskForProject(project.id)">
                <div class="font-medium mb-1">Next Upcoming Task</div>
                <div class="rounded p-3 bg-slate-700">
                  <div class="font-semibold">{{ getNextTaskForProject(project.id)?.title }}</div>
                  <div class="text-xs text-gray-400">
                    {{ getNextTaskForProject(project.id)?.description || 'No description' }}
                  </div>
                  <div class="flex items-center justify-between mt-2">
                    <span class="text-xs text-white">
                      Due: {{ getNextTaskForProject(project.id)?.deadline
                        ? new Date(getNextTaskForProject(project.id)!.deadline!).toLocaleDateString()
                        : 'No deadline' }}
                    </span>
                    <Tag
                        :value="getNextTaskForProject(project.id)?.priority"
                        :severity="prioritySeverity(getNextTaskForProject(project.id)?.priority || '')"
                    />
                  </div>
                </div>
              </div>
              <div class="mb-4 text-sm text-gray-400" v-else>
                No upcoming tasks
              </div>
              <Divider />
              <div class="flex items-center space-x-2 mt-2 justify-between">
                <AvatarGroup v-if="project.projects_users && project.projects_users.length > 0">
                  <Avatar
                      v-for="user in project.projects_users.slice(0, 4)"
                      :key="user.user_id"
                      :label="user.user_id[0].toUpperCase()"
                      shape="circle"
                  />
                </AvatarGroup>
                <span v-else class="text-sm text-gray-400">No members</span>
                <Button icon="pi pi-ellipsis-v" outlined text @click="" />
              </div>
            </div>
          </template>
        </Card>
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
            :dt="customPaginator"
        />
      </div>
    </div>
  </div>
</template>
