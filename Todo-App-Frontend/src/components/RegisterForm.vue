<script setup lang="ts">
import { ref } from "vue";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";
import Divider from "primevue/divider";
import FloatLabel from "primevue/floatlabel";
import Toast from "primevue/toast";
import { useToast } from "primevue";
import $api from "@/plugins/axios";

const toast = useToast();

// Reactive properties for form inputs
const formData = ref({
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  agreeToTerms: false,
});

// Function to handle form submission
const handleSubmit = () => {
  if (!formData.value.agreeToTerms) {
    toast.add({
      severity: "warn",
      summary: "Terms Required",
      detail: "You must accept the terms and conditions to register.",
      life: 3000,
    });
    return;
  }

  if (formData.value.password !== formData.value.confirmPassword) {
    toast.add({
      severity: "error",
      summary: "Password Mismatch",
      detail: "Passwords do not match.",
      life: 3000,
    });
    return;
  }

  console.log("Registration data:", formData.value);

  $api
    .post("/auth/register", {
      fullName: formData.value.fullName,
      email: formData.value.email,
      password: formData.value.password,
    })
    .then((response) => {
      console.log("Registration successful:", response.data);
      toast.add({
        severity: "success",
        summary: "Registration successful",
        detail: "You can now log in with your credentials.",
        life: 3000,
      });
      window.location.href = "/login";
    })
    .catch((error) => {
      console.error("Registration failed:", error);
      toast.add({
        severity: "error",
        summary: "Registration failed",
        detail:
          error.response?.data?.message ||
          "An error occurred during registration.",
        life: 3000,
      });
    });
};
</script>

<template>
  <Toast position="top-right" />
  <div class="w-full max-w-md mx-auto">
    <div class="p-8 flex flex-col gap-y-6">
      <!-- Header -->
      <div class="text-center mb-8 justify-items-center">
        <div
          class="w-16 h-16 flex items-center justify-center justify-items-center mb-4 rounded-2xl"
        >
          <img src="../assets/logov2.png" alt="Lynx Head" class="rounded-2xl" />
        </div>
        <h1 class="text-2xl font-bold text-gray-900 mb-2">
          Create Your Account
        </h1>
        <p class="text-gray-600">Join LYNXLAB to transform your productivity</p>
      </div>
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="gap-y-6 flex flex-col">
          <!-- Full Name Field -->
          <div>
            <FloatLabel>
              <InputText
                id="fullName"
                v-model="formData.fullName"
                type="text"
                class="w-full !px-4 !py-3 !h-12 !border-gray-200 !rounded-lg focus:!ring-2 focus:!ring-cyan-500 focus:!border-cyan-500 !bg-white/70 !backdrop-blur-sm !transition-all !duration-300"
                required
              />
              <label for="fullName" class="!text-gray-700 !font-medium"
                >Full Name</label
              >
            </FloatLabel>
          </div>

          <!-- Email Field -->
          <div>
            <FloatLabel>
              <InputText
                id="email"
                v-model="formData.email"
                type="email"
                class="w-full !px-4 !py-3 !h-12 !border-gray-200 !rounded-lg focus:!ring-2 focus:!ring-cyan-500 focus:!border-cyan-500 !bg-white/70 !backdrop-blur-sm !transition-all !duration-300"
                required
              />
              <label for="email" class="!text-gray-700 !font-medium"
                >Email Address</label
              >
            </FloatLabel>
          </div>

          <!-- Password Field -->
          <div>
            <FloatLabel>
              <InputText
                id="password"
                v-model="formData.password"
                type="password"
                class="w-full !px-4 !py-3 !h-12 !border-gray-200 !rounded-lg focus:!ring-2 focus:!ring-cyan-500 focus:!border-cyan-500 !bg-white/70 !backdrop-blur-sm !transition-all !duration-300"
                required
              />
              <label for="password" class="!text-gray-700 !font-medium"
                >Password</label
              >
            </FloatLabel>
          </div>

          <!-- Confirm Password Field -->
          <div>
            <FloatLabel>
              <InputText
                id="confirmPassword"
                v-model="formData.confirmPassword"
                type="password"
                class="w-full !px-4 !py-3 !h-12 !border-gray-200 !rounded-lg focus:!ring-2 focus:!ring-cyan-500 focus:!border-cyan-500 !bg-white/70 !backdrop-blur-sm !transition-all !duration-300"
                required
              />
              <label for="confirmPassword" class="!text-gray-700 !font-medium"
                >Confirm Password</label
              >
            </FloatLabel>
          </div>
        </div>

        <!-- Terms and Conditions -->
        <div class="flex items-start gap-x-3 pt-2">
          <Checkbox
            input-id="termsCheckbox"
            v-model="formData.agreeToTerms"
            :binary="true"
          ></Checkbox>
          <label
            for="termsCheckbox"
            class="text-sm text-gray-600 leading-relaxed cursor-pointer"
          >
            I agree to the
            <RouterLink
              to="/terms"
              class="text-cyan-600 hover:underline font-medium"
            >
              Terms of Service
            </RouterLink>
            and
            <RouterLink
              to="/privacy"
              class="text-cyan-600 hover:underline font-medium"
            >
              Privacy Policy
            </RouterLink>
          </label>
        </div>

        <!-- Create Account Button -->
        <Button
          type="submit"
          label="Create Account"
          icon="pi pi-user-plus"
          :disabled="!formData.agreeToTerms"
          class="w-full !bg-gradient-to-r !from-cyan-600 !to-blue-600 hover:!from-cyan-700 hover:!to-blue-700 !text-white !font-semibold !py-3 !h-12 !px-6 !rounded-lg !transition-all !duration-300 !shadow-lg hover:!shadow-cyan-500/25 !border-0 disabled:!opacity-50 disabled:!cursor-not-allowed"
        />

        <!-- Divider -->
        <Divider align="center" class="!my-6">
          <span class="!text-gray-400 !bg-white !px-4 !text-sm"
            >or continue with</span
          >
        </Divider>

        <!-- Social Login Buttons -->
        <div class="flex flex-col gap-y-3">
          <Button
            type="button"
            label="GitHub"
            icon="pi pi-github"
            class="w-full !bg-slate-800 hover:!bg-slate-900 !text-white !font-medium !py-3 !h-12 !px-6 !rounded-lg !transition-all !duration-300 !shadow-lg hover:!shadow-slate-500/25 !border-0"
          />

          <Button
            type="button"
            label="Google"
            icon="pi pi-google"
            class="w-full !bg-white !border-2 !border-gray-200 hover:!border-gray-300 !text-gray-700 hover:!text-gray-800 !font-medium !py-3 !h-12 !px-6 !rounded-lg !transition-all !duration-300 !shadow-sm hover:!shadow-md"
          />
        </div>

        <!-- Sign in link -->
        <div class="text-center pt-4">
          <span class="text-gray-600">Already have an account? </span>
          <RouterLink
            to="/login"
            class="font-medium text-cyan-600 hover:text-cyan-700 transition-colors duration-200"
          >
            Sign in here
          </RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
/* Custom animations and styles */
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

/* Glassmorphism effect */
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Custom gradient text */
.gradient-text {
  background: linear-gradient(45deg, #06b6d4, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Input focus glow effect */
.glow-on-focus:focus {
  box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1), 0 0 20px rgba(6, 182, 212, 0.2);
}

/* Button hover effects */
.btn-hover-lift:hover {
  transform: translateY(-2px);
}
</style>
