<script setup lang="ts">
import {ref, computed} from 'vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import Menubar from 'primevue/menubar'

// Import components
import TimeDisplay from './TimeDisplay.vue'
import CurrentTaskCard from './CurrentTaskCard.vue'
import TodaysDeadlines from './TodaysDeadlines.vue'
import TodaysSchedule from './TodaysSchedule.vue'
import AddTodoForm from './AddTodoForm.vue'
import TodoCard from './TodoCard.vue'
import {useMutation, useQuery} from '@tanstack/vue-query'
import useAPI from '@/composables/api/useAPI'
import {TASK_STATUS} from '@/composables/lib/enums'
import {Tasks} from '@/composables/lib/respone'
import {useAuth} from '@/composables/useAuth'
import {useToast} from "primevue";

const {queryTasks, querySchedules, createTask, updateTask} = useAPI()

const filter = ref<'all' | 'active' | 'completed' | 'pending'>('all')

// Menu items for filter
const menuItems = ref([
  {
    label: 'All Tasks',
    icon: 'pi pi-list',
    command: () => setFilter('all'),
    class: filter.value === 'all' ? 'active' : '',
  },
  {
    label: 'Pending',
    icon: 'pi pi-bookmark-fill',
    command: () => setFilter('pending'),
    class: filter.value === 'pending' ? 'pending' : '',
  },
  {
    label: 'Active',
    icon: 'pi pi-clock',
    command: () => setFilter('active'),
    class: filter.value === 'active' ? 'active' : '',
  },
  {
    label: 'Completed',
    icon: 'pi pi-check',
    command: () => setFilter('completed'),
    class: filter.value === 'completed' ? 'active' : '',
  },
])

const {data: currentTask, isLoading, isError, refetch: currentRefetch} = useQuery({
  queryKey: ['current-task'],
  queryFn: () => queryTasks({
    user_id: useAuth().authData.value?.user_id,
    status: TASK_STATUS.IN_PROGRESS,
  }),
  select: data => data.data[0] as any as Tasks,
})
const {data: todos, isLoading: isLoadingTodo, isError: isErrorTodo, refetch: todoRefetch} = useQuery({
  queryKey: ['todo-task'],
  queryFn: () => queryTasks({
    user_id: useAuth().authData.value?.user_id,
    ...(filter.value && {
      status: filter.value === 'active'
          ? TASK_STATUS.IN_PROGRESS
          : filter.value === 'completed'
              ? TASK_STATUS.COMPLETED
              : filter.value === 'pending'
                  ? TASK_STATUS.PENDING
                  : undefined,
    }),
  }),
  select: data => data.data as any as Tasks[],
})

const {
  data: schedules,
  isLoading: isLoadingSchedule,
  isError: isErrorSchedule,
  refetch: schedulesRefetch,
} = useQuery({
  queryKey: ['schedules'],
  queryFn: () => querySchedules({
    user_id: useAuth().authData.value?.user_id,
  }),
  select: data => data.data as any,
})

const {
  data: deadlines,
  isLoading: isLoadingDeadlines,
  isError: isErrorDeadlines,
  refetch: refetchDeadlines,
} = useQuery({
  queryKey: ['todo-task'],
  queryFn: () => queryTasks({
    user_id: useAuth().authData.value?.user_id,
    deadline: new Date(Date.now()),
  }),
  select: data => data.data as any as Tasks[],
})

const {
  mutate: createTaskMutate, isPending, isError: isErrorCreateTask,
} = useMutation({
  mutationKey: ['create-task'],
  mutationFn: (newTodo: Partial<Tasks>) => createTask(newTodo),
})

const {mutate: updateData, isPending: isUpdatePending, isError: isUpdateError} = useMutation({
  mutationKey: ['update-task'],
  mutationFn: (updateData: Partial<Tasks>) => updateTask(updateData.id ?? 0, updateData),
})
// Computed properties
const stats = computed(() => {
  console.log('todos', todos.value)
  return {
    total: todos.value?.length,
    completed: todos.value?.filter((todo) => todo.status === TASK_STATUS.COMPLETED).length,
    active: todos.value?.filter((todo) => todo.status !== TASK_STATUS.COMPLETED).length,
  }
})

const filteredTodos = computed(() => {
  return todos.value || []
})

const toast = useToast()
// Methods
const setFilter = (newFilter: 'all' | 'active' | 'completed' | 'pending') => {
  filter.value = newFilter
  // Update menu items active state
  menuItems.value.forEach((item) => {
    item.class = ''
  })
  const activeItem = menuItems.value.find(
      (item) =>
          (newFilter === 'all' && item.label === 'All Tasks') ||
          (newFilter === 'active' && item.label === 'Active') ||
          (newFilter === 'completed' && item.label === 'Completed'),
  )
  if (activeItem) {
    activeItem.class = 'active'
  }
  todoRefetch()
}

const handleAddTodo = (todoData: Partial<Tasks>) => {
  createTaskMutate(todoData, {
    onSuccess: () => {
      toast.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Task created successfully',
        life: 3000,
      })
      todoRefetch()
      currentRefetch()
    },
    onError: (error) => {
      toast.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to create task',
        life: 3000,
      })
    },
  })
}

const handleToggleTodo = (id: number) => {
  const todo = todos.value?.find((t) => t.id === id)
  if (!todo) return

  const newStatus = todo.status === TASK_STATUS.COMPLETED
    ? TASK_STATUS.PENDING
    : TASK_STATUS.COMPLETED

  updateData(
    { id, status: newStatus },
    {
      onSuccess: () => {
        toast.add({
          severity: 'success',
          summary: 'Success',
          detail: `Task ${newStatus === TASK_STATUS.COMPLETED ? 'completed' : 'reopened'}`,
          life: 3000,
        })
        todoRefetch()
        currentRefetch()
      },
      onError: (error) => {
        toast.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to update task',
          life: 3000,
        })
      },
    }
  )
}
const menuCustomsBar = ref({
  light: {
    root: {
      background: '{cyan.600}', // Gradient background
      item: {
        color: '#ffffff',
        icon: {
          color: '#ffffff',
        },
      },
      border: {
        color: '{cyan.600}',
      },
    },
  },
  dark: {
    root: {
      background: '{cyan.600}', // Gradient background
      item: {
        color: '#ffffff',
        icon: {
          color: '#ffffff',
        },
      },
      border: {
        color: '{cyan.600}',
      },
    },
  },
})
</script>
<template>
  <div
      class="h-full p-6 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"
  >
    <!-- Time Display Component -->
    <TimeDisplay class="mt-8"/>

    <div class="grid lg:grid-cols-3 gap-6">
      <!-- Left Column - Current Task & Deadlines -->
      <div class="lg:col-span-1 flex flex-col gap-y-6">
        <CurrentTaskCard
            v-if="currentTask"
            :title="currentTask?.title"
            :description="currentTask?.description"
            :status="currentTask?.status"
            :startedTime="currentTask?.created_at"
            :dueTime="currentTask?.deadline"
        />
        <div v-else>
          <Card class="!bg-slate-800 !text-white">
            <template #content>
              <div class="p-8 text-center">
                <i
                    class="pi pi-tasks text-5xl text-muted-foreground mb-4"
                ></i>
                <h3 class="text-lg font-semibold text-foreground mb-2">
                  No Current Task
                </h3>
                <p class="text-muted-foreground">
                  You have no tasks in progress. Start a new task to see it here.
                </p>
              </div>
            </template>
          </Card>
        </div>
        <TodaysDeadlines :deadlines="deadlines"/>

        <TodaysSchedule :scheduleItems="schedules"/>
      </div>

      <!-- Right Column - Todo Management -->
      <div class="lg:col-span-2 gap-y-6 flex flex-col">
        <!-- Add Todo Form -->
        <AddTodoForm @add="handleAddTodo"/>

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
          <Menubar :model="menuItems" :dt="menuCustomsBar"></Menubar>

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
          <template v-if="filteredTodos?.length === 0">
            <Card class="!bg-slate-800 !text-white">
              <template #content>
                <div class="p-8 text-center">
                  <i
                      class="pi pi-check-circle text-5xl text-muted-foreground mb-4"
                  ></i>
                  <h3 class="text-lg font-semibold text-foreground mb-2">
                    {{
                      filter === 'completed'
                          ? 'No completed tasks'
                          : 'No tasks yet'
                    }}
                  </h3>
                  <p class="text-muted-foreground">
                    {{
                      filter === 'completed'
                          ? 'Complete some tasks to see them here.'
                          : 'Add your first task to get started with TaskFlow.'
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
