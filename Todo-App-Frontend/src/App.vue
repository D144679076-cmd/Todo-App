<script setup>
import { RouterView } from "vue-router";
import { ref } from "vue";

// Reactive property to track authentication status
const isAuthenticated = ref(false);

// Function to check authentication
const checkAuth = () => {
  const token = localStorage.getItem("token");
  isAuthenticated.value = !!token;
};

// Call checkAuth on component setup
checkAuth();
</script>

<template>
  <template v-if="!isAuthenticated">
    <RouterView />
  </template>
  <template v-else>
    <header></header>
    <main>
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
