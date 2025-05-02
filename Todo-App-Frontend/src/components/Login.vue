<script setup>
import Card from "primevue/card";
import Divider from "primevue/divider";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import { ref } from "vue";
import $api from "@/plugins/axios";
import { useToast } from "primevue";
import router from "@/router";
import Toast from "primevue/toast";
// Reactive properties for form inputs
const email = ref("");
const password = ref("");
const toast = useToast();
// Function to handle form submission
const handleSubmit = () => {
  console.log("Email:", email.value);
  console.log("Password:", password.value);
  $api
    .post("/auth", {
      email: email.value,
      password: password.value,
    })
    .then((response) => {
      console.log("Login successful:", response.data);
      toast.add({
        severity: "success",
        summary: "Login successful",
        detail: "Welcome back!",
        life: 3000,
      });
      router.push("/"); // Redirect to the home page or dashboard
    })
    .catch((error) => {
      console.error("Login failed:", error);
      toast.add({
        severity: "error",
        summary: "Invalid email or password",
        detail: error,
        life: 3000,
      });
      // Handle login failure (e.g., show error message)
    });
};
</script>

<template>
  <Toast position="top-right" />
  <div class="login-container">
    <Card class="w-full p-6 bg-white shadow-md rounded-lg" style="width: 650px">
      <template #title>
        <Divider align="center">
          <p class="text-xl font-bold text-center text-gray-800">Login</p>
        </Divider>
      </template>
      <template #content>
        <div class="gap-y-1.5">
          <div class="flex flex-col mb-4 py-3">
            <label for="email" class="block text-md font-bold text-black">
              Email
            </label>
            <InputText
              id="email"
              v-model="email"
              type="email"
              placeholder="Enter your email"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div class="flex flex-col mb-6 py-3">
            <label for="password" class="block text-md font-bold text-black">
              Password
            </label>
            <InputText
              id="password"
              v-model="password"
              type="password"
              placeholder="Enter your password"
              class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </template>
      <template #footer>
        <div class="gap-y-4 py-4">
          <div class="flex flex-col">
            <Button
              label="Login"
              class="bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              @click="handleSubmit"
            />
          </div>
          <div
            class="text-sm text-gray-500 mt-6 justify-items-center pt-3 gap-y-5"
          >
            <div class="w-fit">
              <RouterLink
                to="/dang-ky"
                class="hover:underline w-fit hover:text-blue-600"
              >
                Don't have an account? Register one!
              </RouterLink>
            </div>
            <div class="w-fit">
              <RouterLink
                to="/quen-mat-khau"
                class="hover:underline w-fit hover:text-blue-600"
              >
                Forgot password? Reset!
              </RouterLink>
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full height of the viewport */
  background-color: #f9f9f9; /* Optional: Add a light background */
}
</style>
