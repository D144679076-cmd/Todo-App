<script setup lang="ts">
import { RouterView } from "vue-router";
import { ref } from "vue";
import NavBar from "./components/NavBar.vue";
import { Toast } from "primevue";
// Reactive property to track authentication status
const isAuthenticated = ref(false);

// Function to check authentication
const checkAuth = () => {
  const token = localStorage.getItem("auth_data");
  isAuthenticated.value = !!token;
};

// Call checkAuth on component setup
checkAuth();
</script>

<template>
  <Toast />
  <template v-if="!isAuthenticated">
    <RouterView />
  </template>
  <template v-else>
    <header class="w-full"><NavBar class="w-full" /></header>
    <main class="mt-16">
      <RouterView />
    </main>
    <footer></footer>
  </template>
</template>

<style scoped>
header {
  line-height: 1.5;
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
