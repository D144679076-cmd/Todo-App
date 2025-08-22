<script setup lang="ts">
import { ref } from "vue";
import Button from "primevue/button";
import Avatar from "primevue/avatar";
import Menubar from "primevue/menubar";

const activeTab = ref("Tasks");

const menuItems = [
  { label: "Tasks", icon: "pi pi-list", to: "/task-list" },
  { label: "Projects", icon: "pi pi-folder", to: "/project-list" },
  { label: "Calendar", icon: "pi pi-calendar", to: "/calendar" },
];
const authData = JSON.parse(localStorage.getItem("auth_data") || "{}");
</script>
<template>
  <div class="navbar">
    <div class="grid grid-cols-6 flex-col w-full">
      <div class="col-span-1">
        <div class="flex w-full">
          <RouterLink to="/" class="logo-text hover:opacity-70 w-full h-full">
            <div class="flex items-center gap-2">
              <img src="../assets/logov2.png" class="w-7 h-7" />
              <p class="flex font-bold">Task Manager</p>
            </div>
          </RouterLink>
        </div>
      </div>
      <div class="col-span-4 h-full">
        <div class="w-full flex justify-center h-full">
          <RouterLink
            v-for="item in menuItems"
            :key="item.label"
            :to="`${item.to}`"
            class="hover:opacity-70 text-black flex flex w-fit justify-center hover:border-b-2 hover:border-blue-500 px-20 items-center"
            :class="{ active: activeTab === item.label }"
            @click="activeTab = item.label"
          >
            {{ item.label }}
          </RouterLink>
        </div>
      </div>
      <div class="col-span-1 navbar-right flex justify-end items-center">
        <Avatar
          :image="authData.avatarLinks"
          shape="circle"
          class="mr-5"
          v-if="authData.avatarLinks"
        />
        <Avatar icon="pi pi-user" shape="circle" class="mr-5" v-else />
      </div>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 2rem;
  background-color: #ffffff;
  border-bottom: 1px solid #f0f0f0;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  max-height: 49px;
}

.navbar-left {
  display: flex;
  align-items: center;
  gap: 3rem;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.logo-text {
  font-size: 1.25rem;
  font-weight: 600;
  color: black;
}

:deep(.p-menubar) {
  background: transparent;
  border: none;
  padding: 0;
}

:deep(.p-menubar-root-list) {
  display: none;
}

.nav-items {
  display: flex;
  gap: 2rem;
}

.navbar-right {
  display: flex;
  align-items: center;
}
</style>
