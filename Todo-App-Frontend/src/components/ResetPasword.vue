<script setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import $api from "@/plugins/axios";
import { useToast } from "primevue";

// Reactive properties
const email = ref("");
const toast = useToast();

// Function to handle password reset
const handlePasswordReset = () => {
  if (!email.value) {
    toast.add({
      severity: "warn",
      summary: "Email required",
      detail: "Please enter your email address.",
      life: 3000,
    });
    return;
  }

  $api
    .post("/password-reset", { email: email.value })
    .then(() => {
      toast.add({
        severity: "success",
        summary: "Reset Email Sent",
        detail: "Check your email for reset instructions.",
        life: 3000,
      });
    })
    .catch((error) => {
      console.error("Password reset failed:", error);
      toast.add({
        severity: "error",
        summary: "Error",
        detail: "Failed to send reset email. Please try again.",
        life: 3000,
      });
    });
};
</script>

<template>
  <div class="password-reset-container">
    <div
      class="w-full max-w-md p-6 bg-white shadow-md rounded-lg flex flex-col gap-y-1.5"
    >
      <div class="text-center mb-6">
        <i class="pi pi-envelope text-4xl text-gray-600"></i>
        <h2 class="text-2xl font-bold text-gray-800">Reset your password</h2>
        <p class="text-sm text-gray-500">
          Enter your email address, and we'll send you a link to reset your
          password.
        </p>
      </div>
      <div class="flex flex-col gap-y-2.5">
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email</label
          >
          <InputText
            id="email"
            v-model="email"
            type="email"
            placeholder="Enter your email"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <Button
          label="Send Reset Instructions"
          class="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          @click="handlePasswordReset"
        />
      </div>
      <div class="mt-4">
        <p class="text-center text-sm text-gray-500">
          Remember your password?
          <RouterLink to="/dang-nhap" class="text-blue-500 hover:underline"
            >Sign in</RouterLink
          >
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.password-reset-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Full height of the viewport */
  background-color: #f9f9f9; /* Optional: Add a light background */
}
</style>
