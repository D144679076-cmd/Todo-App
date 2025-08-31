<script setup lang="ts">
import { ref } from "vue";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Select from "primevue/select";
import Button from "primevue/button";
import DatePicker from "primevue/datepicker";
import FloatLabel from "primevue/floatlabel";

// Define the props
interface TodoData {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  dueDate: string;
}

// Define emits
const emit = defineEmits<{
  add: [todo: TodoData];
}>();

// Reactive state
const title = ref("");
const description = ref("");
const priority = ref<"low" | "medium" | "high">("medium");
const dueDate = ref<Date | null>(null);

// Priority options
const priorityOptions = [
  { label: "Low Priority", value: "low" },
  { label: "Medium Priority", value: "medium" },
  { label: "High Priority", value: "high" },
];

// Handle form submission
const handleSubmit = () => {
  if (!title.value.trim()) return;

  emit("add", {
    title: title.value.trim(),
    description: description.value.trim(),
    priority: priority.value,
    dueDate: dueDate.value ? dueDate.value.toISOString().split("T")[0] : "",
  });

  // Reset form
  title.value = "";
  description.value = "";
  priority.value = "medium";
  dueDate.value = null;
};
</script>

<template>
  <Card
    class="!bg-gradient-to-br !from-slate-700 !to-slate-800 !text-white !backdrop-blur-sm !border !border-gray-200/50 !shadow-lg"
  >
    <template #content>
      <div class="p-6 flex flex-col gap-y-8">
        <!-- Header -->
        <div class="flex items-center gap-x-3 mb-6">
          <div
            class="w-10 h-10 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg flex items-center justify-center shadow-lg"
          >
            <i class="pi pi-plus text-white text-lg"></i>
          </div>
          <h2 class="text-xl font-bold">Add New Task</h2>
        </div>

        <!-- Form -->
        <form
          @submit.prevent="handleSubmit"
          class="gap-y-8 flex flex-col !text-white"
        >
          <!-- Title Input -->
          <div>
            <InputText
              id="title"
              v-model="title"
              placeholder="Task title..."
              class="w-full !px-4 !py-3 !rounded-lg focus:!ring-2 focus:!ring-cyan-500 focus:!border-cyan-500 !transition-all !duration-300"
              required
            />
          </div>

          <!-- Description Textarea -->
          <div>
            <Textarea
              id="description"
              v-model="description"
              rows="3"
              placeholder="Description (optional)"
              class="w-full !px-4 !py-3 !rounded-lg focus:!ring-2 focus:!ring-cyan-500 focus:!border-cyan-500 !transition-all !duration-300 !resize-none"
            />
          </div>

          <!-- Priority and Due Date Grid -->
          <div class="grid grid-cols-2 gap-4">
            <!-- Priority Select -->
            <div>
              <FloatLabel>
                <Select
                  id="priority"
                  v-model="priority"
                  :options="priorityOptions"
                  optionLabel="label"
                  optionValue="value"
                  class="w-full hover:!opacity-95 focus:!opacity-95 !transition-opacity !duration-300 focus:!ring-cyan-500 focus:!border-cyan-500"
                >
                  <template #value="slotProps">
                    <div
                      v-if="slotProps.value"
                      class="flex items-center !text-black !gap-x-2"
                    >
                      <span
                        class="w-2 h-2 rounded-full mr-2"
                        :class="{
                          'bg-green-500': slotProps.value === 'low',
                          'bg-yellow-500': slotProps.value === 'medium',
                          'bg-red-500': slotProps.value === 'high',
                        }"
                      ></span>
                      {{
                        priorityOptions.find(
                          (option) => option.value === slotProps.value
                        )?.label
                      }}
                    </div>
                  </template>
                  <template #option="slotProps">
                    <div
                      class="flex items-center !text-black !gap-x-2 hover:opacity-90"
                    >
                      <span
                        class="w-2 h-2 rounded-full !mr-2"
                        :class="{
                          'bg-green-500': slotProps.option.value === 'low',
                          'bg-yellow-500': slotProps.option.value === 'medium',
                          'bg-red-500': slotProps.option.value === 'high',
                        }"
                      ></span>
                      {{ slotProps.option.label }}
                    </div>
                  </template>
                </Select>
                <label for="priority" class="!text-white">Priority</label>
              </FloatLabel>
            </div>

            <!-- Due Date Picker -->
            <div class="relative">
              <FloatLabel>
                <DatePicker
                  id="dueDate"
                  v-model="dueDate"
                  dateFormat="yy-mm-dd"
                  class="w-full focus:!ring-cyan-500 focus:!border-cyan-500"
                  :showIcon="false"
                />
                <label for="dueDate" class="text-black">Due date</label>
              </FloatLabel>
              <i
                class="pi pi-calendar absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"
              ></i>
            </div>
          </div>

          <!-- Submit Button -->
          <Button
            type="submit"
            :disabled="!title.trim()"
            class="w-full !bg-gradient-to-r !from-cyan-600 !to-blue-600 hover:!from-cyan-700 hover:!to-blue-700 !text-white !font-semibold !py-3 !px-6 !rounded-lg !transition-all !duration-300 !shadow-lg hover:!shadow-cyan-500/25 !border-0 disabled:!opacity-50 disabled:!cursor-not-allowed"
          >
            <i class="pi pi-plus mr-2"></i>
            Add Task
          </Button>
        </form>
      </div>
    </template>
  </Card>
</template>
