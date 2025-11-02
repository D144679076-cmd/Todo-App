<script setup lang="ts">
import { ref } from "vue";
import Button from "primevue/button";
import Menubar from "primevue/menubar";
import Menu from "primevue/menu";
import router from "@/router";
import { useAuth } from "@/composables/useAuth";

const activeTab = ref(0);
const { logout, authData } = useAuth();

const menuItems = [
  {
    label: "Tasks",
    icon: "pi pi-list",
    command: () => {
      router.push("/task-list");
    },
  },
  {
    label: "Projects",
    icon: "pi pi-folder",
    command: () => {
      router.push("/project-list");
    },
  },
  {
    label: "Calendar",
    icon: "pi pi-calendar",
    command: () => {
      router.push("/calendar");
    },
  },
];

// User menu for profile dropdown
const userMenu = ref();
const userMenuItems = [
  {
    label: "Profile",
    icon: "pi pi-user",
    command: () => {
      // Navigate to profile page
      console.log("Navigate to profile");
    },
  },
  {
    label: "Settings",
    icon: "pi pi-cog",
    command: () => {
      // Navigate to settings page
      console.log("Navigate to settings");
    },
  },
  {
    separator: true,
  },
  {
    label: "Logout",
    icon: "pi pi-sign-out",
    command: () => {
      logout();
    },
  },
];

const toggleUserMenu = (event: Event) => {
  userMenu.value.toggle(event);
};
</script>
<template>
  <div
    class="navbar w-full h-fit py-2 bg-gradient-to-br from-slate-500 via-blue-500 to-slate-300"
  >
    <div class="mx-auto px-6 py-3 w-full">
      <div class="flex items-center justify-between h-14 w-full">
        <!-- Logo and Title -->
        <RouterLink to="/" class="hover:opacity-80">
          <div class="flex items-center gap-x-3">
            <div
              class="w-7 h-7 rounded-xl shadow-lg flex items-center justify-center"
            >
              <img
                src="../assets/logov2.png"
                alt="Lynxlab Logo"
                class="w-7 h-7 rounded-lg"
              />
            </div>
            <div>
              <h1
                class="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text !text-white"
              >
                Lynxlab
              </h1>
            </div>
          </div>
        </RouterLink>

        <!-- Navigation Tabs -->
        <Menubar :model="menuItems" class="rounded-2xl" />

        <!-- Action Buttons -->
        <div class="flex items-center gap-x-1">
          <Button
            class="!text-slate-800 hover:text-slate-700 hover:bg-white/60 rounded-xl hover:opacity-80 w-fit h-fit !p-0"
            aria-label="Notifications"
            icon="pi pi-bell"
            text
          />
          <Button
            class="!text-slate-800 hover:text-slate-700 hover:bg-white/60 hover:opacity-80 rounded-xl w-fit h-fit !p-0"
            aria-label="User Profile"
            icon="pi pi-user"
            text
            @click="toggleUserMenu"
          />
          <Menu
            ref="userMenu"
            :model="userMenuItems"
            :popup="true"
            class="w-48"
          />
        </div>
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
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  max-height: 49px;
}

:deep(.p-menubar) {
  border: none;
  background: transparent;
  color: white;
}

:deep(.p-menubar-root-list) {
  border: none;
  background: transparent;
  gap: 0.5rem;
  margin: 0;
  list-style: none;
}

:deep(.p-menubar-item) {
  margin: 0;
}

:deep(.p-menubar-item.p-focus .p-menubar-item-link) {
  padding: 0.625rem 1.5rem;
  border: none;
  border-radius: 0.75rem;
  background: transparent;
  color: rgb(30, 41, 59);
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  display: flex;
  align-items: center;
}

:deep(.p-menubar-item-link) {
  padding: 0.625rem 1.5rem;
  border: none;
  border-radius: 0.75rem;
  background: transparent;
  color: white;
  font-weight: 600;
  font-size: 0.875rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-decoration: none;
  display: flex;
  align-items: center;
}

:deep(.p-menubar-item-link:hover) {
  background: rgba(255, 255, 255, 0.8);
  color: rgb(30, 41, 59);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transform: scale(1.02);
}

:deep(.p-menubar-item-icon) {
  margin-right: 0.5rem;
  color: white;
}
</style>
