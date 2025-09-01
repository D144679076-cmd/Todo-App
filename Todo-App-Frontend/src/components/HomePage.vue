<script setup lang="ts">
import { ref, computed } from "vue";
import Card from "primevue/card";
import Button from "primevue/button";
import Menubar from "primevue/menubar";

// Import components
import TimeDisplay from "./TimeDisplay.vue";
import CurrentTaskCard from "./CurrentTaskCard.vue";
import TodaysDeadlines from "./TodaysDeadlines.vue";
import TodaysSchedule from "./TodaysSchedule.vue";
import AddTodoForm from "./AddTodoForm.vue";
import TodoCard from "./TodoCard.vue";

// Types
interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate?: string;
}

interface Deadline {
  id: string;
  title: string;
  time: string;
  completed: boolean;
}

interface ScheduleItem {
  id: string;
  time: string;
  title: string;
  description: string;
  status: "upcoming" | "current" | "completed";
}

// Reactive state
const filter = ref<"all" | "active" | "completed">("all");

// Menu items for filter
const menuItems = ref([
  {
    label: "All Tasks",
    icon: "pi pi-list",
    command: () => setFilter("all"),
    class: filter.value === "all" ? "active" : "",
  },
  {
    label: "Active",
    icon: "pi pi-clock",
    command: () => setFilter("active"),
    class: filter.value === "active" ? "active" : "",
  },
  {
    label: "Completed",
    icon: "pi pi-check",
    command: () => setFilter("completed"),
    class: filter.value === "completed" ? "active" : "",
  },
]);

const todos = ref<Todo[]>([
  {
    id: "1",
    title: "Complete project proposal presentation",
    description:
      "Finalize slides and prepare talking points for Monday's client meeting",
    completed: false,
    priority: "high",
    dueDate: "2025-08-23",
  },
  {
    id: "2",
    title: "Review marketing materials",
    description: "Check the new branding guidelines",
    completed: false,
    priority: "medium",
    dueDate: "2025-08-23",
  },
  {
    id: "3",
    title: "Submit expense report",
    description: "Upload receipts and submit monthly expenses",
    completed: true,
    priority: "low",
    dueDate: "2025-08-22",
  },
]);

const deadlines = ref<Deadline[]>([
  {
    id: "1",
    title: "Review marketing materials",
    time: "3:30 PM",
    completed: false,
  },
  {
    id: "2",
    title: "Team standup meeting",
    time: "4:00 PM",
    completed: false,
  },
  {
    id: "3",
    title: "Submit expense report",
    time: "6:00 PM",
    completed: false,
  },
]);

const scheduleItems = ref<ScheduleItem[]>([
  {
    id: "1",
    time: "9:00 AM",
    title: "Morning planning session",
    description: "Review daily priorities and goals",
    status: "completed",
  },
  {
    id: "2",
    time: "11:00 AM",
    title: "Client call - Project Alpha",
    description: "Discuss requirements and timeline",
    status: "completed",
  },
  {
    id: "3",
    time: "2:30 PM",
    title: "Complete project proposal",
    description: "Current task - in progress",
    status: "current",
  },
  {
    id: "4",
    time: "4:00 PM",
    title: "Team standup meeting",
    description: "Daily sync with development team",
    status: "upcoming",
  },
  {
    id: "5",
    time: "5:30 PM",
    title: "Wrap-up and planning",
    description: "Review completed tasks and plan tomorrow",
    status: "upcoming",
  },
]);

// Computed properties
const filteredTodos = computed(() => {
  switch (filter.value) {
    case "active":
      return todos.value.filter((todo) => !todo.completed);
    case "completed":
      return todos.value.filter((todo) => todo.completed);
    default:
      return todos.value;
  }
});

const stats = computed(() => ({
  total: todos.value.length,
  completed: todos.value.filter((todo) => todo.completed).length,
  active: todos.value.filter((todo) => !todo.completed).length,
}));

// Methods
const setFilter = (newFilter: "all" | "active" | "completed") => {
  filter.value = newFilter;
  // Update menu items active state
  menuItems.value.forEach((item) => {
    item.class = "";
  });
  const activeItem = menuItems.value.find(
    (item) =>
      (newFilter === "all" && item.label === "All Tasks") ||
      (newFilter === "active" && item.label === "Active") ||
      (newFilter === "completed" && item.label === "Completed")
  );
  if (activeItem) {
    activeItem.class = "active";
  }
};

const handleAddTodo = (todoData: {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  dueDate: string;
}) => {
  const newTodo: Todo = {
    id: Date.now().toString(),
    title: todoData.title,
    description: todoData.description,
    completed: false,
    priority: todoData.priority,
    dueDate: todoData.dueDate,
  };
  todos.value.push(newTodo);
};

const handleToggleTodo = (id: string) => {
  const todo = todos.value.find((t) => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
  }
};
</script>
<template>
  <div
    class="h-full p-6 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"
  >
    <!-- Time Display Component -->
    <TimeDisplay class="mt-8" />

    <div class="grid lg:grid-cols-3 gap-6">
      <!-- Left Column - Current Task & Deadlines -->
      <div class="lg:col-span-1 flex flex-col gap-y-6">
        <CurrentTaskCard
          title="Complete project proposal presentation"
          description="Finalize slides and prepare talking points for Monday's client meeting"
          status="In Progress"
          startedTime="1h ago"
          dueTime="5:00 PM today"
        />

        <TodaysDeadlines :deadlines="deadlines" />

        <TodaysSchedule :scheduleItems="scheduleItems" />
      </div>

      <!-- Right Column - Todo Management -->
      <div class="lg:col-span-2 gap-y-6 flex flex-col">
        <!-- Add Todo Form -->
        <AddTodoForm @add="handleAddTodo" />

        <!-- Stats Cards -->
        <div class="grid grid-cols-3 gap-4">
          <Card class="!bg-slate-800 !text-white">
            <template #content>
              <div class="p-4 text-center">
                <div class="text-2xl font-bold text-primary mb-1">
                  {{ stats.total }}
                </div>
                <div class="text-sm text-muted-foreground">Total Tasks</div>
              </div>
            </template>
          </Card>
          <Card class="!bg-slate-800 !text-white">
            <template #content>
              <div class="p-4 text-center">
                <div class="text-2xl font-bold text-green-400 mb-1">
                  {{ stats.completed }}
                </div>
                <div class="text-sm text-muted-foreground text-white">
                  Completed
                </div>
              </div>
            </template>
          </Card>
          <Card class="!bg-slate-800 !text-white">
            <template #content>
              <div class="p-4 text-center">
                <div class="text-2xl font-bold text-yellow-400 mb-1">
                  {{ stats.active }}
                </div>
                <div class="text-sm text-muted-foreground">Active</div>
              </div>
            </template>
          </Card>
        </div>

        <!-- Filter Menubar -->
        <div class="flex items-center justify-between">
          <Menubar :model="menuItems"></Menubar>

          <!-- <div class="flex items-center gap-x-2">
            <Button variant="outlined" size="small">
              <i class="pi pi-search mr-2"></i>
              Search
            </Button>
            <Button variant="outlined" size="small">
              <i class="pi pi-filter mr-2"></i>
              Filter
            </Button>
          </div> -->
        </div>

        <!-- Todo List -->
        <div class="gap-y-3 flex flex-col">
          <template v-if="filteredTodos.length === 0">
            <Card class="!bg-slate-800 !text-white">
              <template #content>
                <div class="p-8 text-center">
                  <i
                    class="pi pi-check-circle text-5xl text-muted-foreground mb-4"
                  ></i>
                  <h3 class="text-lg font-semibold text-foreground mb-2">
                    {{
                      filter === "completed"
                        ? "No completed tasks"
                        : "No tasks yet"
                    }}
                  </h3>
                  <p class="text-muted-foreground">
                    {{
                      filter === "completed"
                        ? "Complete some tasks to see them here."
                        : "Add your first task to get started with TaskFlow."
                    }}
                  </p>
                </div>
              </template>
            </Card>
          </template>
          <template v-else>
            <TodoCard
              v-for="todo in filteredTodos"
              :key="todo.id"
              v-bind="todo"
              @toggle="handleToggleTodo"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
