<script setup lang="ts">
import { RouterView } from "vue-router";
import { onMounted, onUnmounted } from "vue";
import NavBar from "./components/NavBar.vue";
import { Toast } from "primevue";
import { useAuth } from "./composables/useAuth";

const { isAuthenticated, initializeAuth, checkTokenExpiration, clearAuth } =
  useAuth();

// Function to handle auth logout event from axios interceptor
const handleAuthLogout = () => {
  clearAuth();
};

// Check token expiration periodically
let tokenCheckInterval: NodeJS.Timeout;

onMounted(() => {
  // Initialize authentication state
  initializeAuth();

  // Check token expiration every minute
  tokenCheckInterval = setInterval(checkTokenExpiration, 60000);

  // Listen for auth logout events from axios interceptor
  window.addEventListener("auth:logout", handleAuthLogout);
});

onUnmounted(() => {
  // Clean up interval and event listener
  if (tokenCheckInterval) {
    clearInterval(tokenCheckInterval);
  }
  window.removeEventListener("auth:logout", handleAuthLogout);
});
</script>

<template class="my-app-dark">
  <Toast position="top-right" />
  <template v-if="!isAuthenticated">
    <RouterView />
  </template>
  <template v-else>
    <header
      class="w-full h-fit fixed top-0 left-0 right-0 z-50 bg-white shadow-sm bottom-0"
    >
      <NavBar class="w-full h-full" />
    </header>
    <main
      class="min-h-screen flex flex-col"
      style="margin-top: calc(1rem + 0.75rem)"
    >
      <div>
        <RouterView />
      </div>
    </main>
    <footer></footer>
  </template>
</template>

<style scoped>
header {
  line-height: 2.5;
}
@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
