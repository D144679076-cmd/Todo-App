<script setup lang="ts">
import Card from "primevue/card";
import Divider from "primevue/divider";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";
import { ref } from "vue";
import $api from "@/plugins/axios";
import { useToast } from "primevue";
import router from "@/router";
import Toast from "primevue/toast";
import FloatLabel from "primevue/floatlabel";
import { useAuth } from "@/composables/useAuth";
import type { AuthData } from "@/composables/lib/type";

// Reactive properties for form inputs
const email = ref("");
const password = ref("");
const rememberMe = ref(false);
const toast = useToast();
const { setAuth } = useAuth();

// Function to handle form submission
const handleSubmit = () => {
  console.log("Email:", email.value);
  console.log("Password:", password.value);
  $api
    .post("/auth/login", {
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

      // Use the auth composable to set authentication data
      const authData: AuthData = {
        token: response.data.token,
        refreshToken: response.data.refreshToken,
        user_id: response.data.user_id,
        userEmail: email.value, // Store the user email for logout
        lifetime: Date.now() + response.data.lifeTime, // Convert to absolute timestamp
      };
      setAuth(authData);

      window.location.href = "/";
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
  <div
    class="min-h-screen flex bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"
  >
    <!-- Left side - Features section -->
    <div
      class="flex-1 p-12 flex flex-col justify-center relative overflow-hidden w-1/2"
    >
      <!-- Animated background elements -->
      <div class="absolute inset-0 opacity-5">
        <div
          class="absolute top-1/4 left-1/4 w-64 h-64 bg-cyan-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
        ></div>
        <div
          class="absolute top-3/4 right-1/4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"
        ></div>
        <div
          class="absolute bottom-1/4 left-1/3 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"
        ></div>
      </div>

      <!-- Geometric pattern overlay -->
      <div class="absolute inset-0 opacity-10">
        <svg
          class="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="tech-grid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="10"
                cy="10"
                r="1"
                fill="currentColor"
                class="text-cyan-400"
              />
              <path
                d="M10,0 L10,20 M0,10 L20,10"
                stroke="currentColor"
                stroke-width="0.2"
                class="text-cyan-400"
              />
            </pattern>
          </defs>
          <rect width="100" height="100" fill="url(#tech-grid)" />
        </svg>
      </div>

      <div class="relative z-10 max-w-lg flex flex-col gap-y-12">
        <!-- Logo and Brand -->
        <div class="mb-12">
          <!-- LYNXLAB Logo -->
          <div class="flex flex-col gap-y-12">
            <div
              class="w-24 h-24 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl flex items-center justify-center mb-6 border border-slate-700/50 shadow-2xl"
            >
              <!-- Lynx Head SVG -->
              <img
                src="../assets/logo.png"
                alt="Lynx Head"
                class="rounded-3xl"
              />
            </div>
            <div>
              <h1 class="text-5xl font-bold text-white mb-4 tracking-tight">
                Welcome to
                <span
                  class="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
                  >LYNXLAB</span
                >
              </h1>
              <p class="text-slate-300 text-md leading-relaxed">
                Advanced task management with intelligent automation. Transform
                your productivity with cutting-edge technology.
              </p>
            </div>
          </div>
        </div>

        <!-- Features -->
        <div class="gap-y-10 flex flex-col">
          <!-- Feature 1 -->
          <div class="flex items-start group gap-x-5">
            <div
              class="w-14 h-14 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-cyan-500/25 transition-all duration-300 mr-6"
            >
              <i class="pi pi-bolt text-white text-xl"></i>
            </div>
            <div class="flex-1 pt-1">
              <h3
                class="text-white font-semibold text-xl mb-3 group-hover:text-cyan-300 transition-colors"
              >
                Lightning Fast Performance
              </h3>
              <p class="text-slate-300 leading-relaxed text-base">
                Experience blazing-fast task processing with our optimized
                algorithms and intelligent caching system.
              </p>
            </div>
          </div>

          <!-- Feature 2 -->
          <div class="flex items-start group gap-x-5">
            <div
              class="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-indigo-500/25 transition-all duration-300 mr-6"
            >
              <i class="pi pi-shield text-white text-xl"></i>
            </div>
            <div class="flex-1 pt-1">
              <h3
                class="text-white font-semibold text-xl mb-3 group-hover:text-indigo-300 transition-colors"
              >
                Enterprise Security
              </h3>
              <p class="text-slate-300 leading-relaxed text-base">
                Bank-grade encryption and multi-layer security protocols protect
                your sensitive data and workflows.
              </p>
            </div>
          </div>

          <!-- Feature 3 -->
          <div class="flex items-start group gap-x-5">
            <div
              class="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-emerald-500/25 transition-all duration-300 mr-6"
            >
              <i class="pi pi-sync text-white text-xl"></i>
            </div>
            <div class="flex-1 pt-1">
              <h3
                class="text-white font-semibold text-xl mb-3 group-hover:text-emerald-300 transition-colors"
              >
                Real-time Collaboration
              </h3>
              <p class="text-slate-300 leading-relaxed text-base">
                Seamless team coordination with live updates, instant
                notifications, and collaborative workspaces.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right side - Login form -->
    <div
      class="flex-1 bg-gradient-to-br from-gray-50 to-white flex items-center justify-center p-12 relative w-1/2"
    >
      <!-- Subtle background pattern -->
      <div class="absolute inset-0 opacity-5">
        <svg class="w-full h-full" viewBox="0 0 60 60">
          <defs>
            <pattern
              id="dots"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="30" cy="30" r="1.5" fill="#1e293b" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div class="w-full max-w-md relative z-10">
        <div class="p-8 gap-y-4 flex flex-col">
          <!-- Header -->
          <div class="text-center mb-8 justify-items-center">
            <div
              class="rounded-2xl w-16 h-16 bg-gradient-to-br flex items-center justify-center mx-auto mb-6 shadow-lg"
            >
              <!-- Mini Lynx Logo -->
              <img
                src="../assets/logov2.png"
                alt="Lynx Head"
                class="rounded-2xl"
              />
            </div>
            <h2 class="text-3xl font-bold text-slate-800 mb-2">Welcome Back</h2>
            <p class="text-slate-600">Sign in to your LYNXLAB account</p>
          </div>

          <form
            @submit.prevent="handleSubmit"
            class="gap-y-5 flex flex-col mt-4"
          >
            <div class="flex flex-col gap-y-6">
              <!-- Email Field -->
              <div>
                <FloatLabel>
                  <InputText
                    id="email"
                    v-model="email"
                    type="email"
                    class="w-full"
                    :class="{
                      '!border-red-300 focus:!border-red-500 focus:!ring-red-500': false,
                    }"
                    required
                  />
                  <label for="email" class="!text-slate-600 !font-medium"
                    >Email Address</label
                  >
                </FloatLabel>
              </div>

              <!-- Password Field -->
              <div>
                <FloatLabel>
                  <InputText
                    input-id="password"
                    v-model="password"
                    type="password"
                    class="w-full"
                    required
                  />
                  <label for="password" class="!text-slate-600 !font-medium"
                    >Password</label
                  >
                </FloatLabel>
              </div>
            </div>

            <!-- Remember me and Forgot password -->
            <div class="flex items-center justify-between pt-2">
              <div class="flex items-center">
                <Checkbox
                  input-id="remember"
                  v-model="rememberMe"
                  :binary="true"
                  class="!mr-3"
                />
                <label
                  for="remember"
                  class="text-sm text-slate-600 font-medium cursor-pointer"
                >
                  Remember me
                </label>
              </div>
              <RouterLink
                to="/quen-mat-khau"
                class="text-sm text-cyan-600 hover:text-cyan-700 font-medium transition-colors duration-200"
              >
                Forgot password?
              </RouterLink>
            </div>

            <!-- Login Button -->
            <Button
              type="submit"
              label="Sign In"
              icon="pi pi-sign-in"
              class="w-full"
            />

            <!-- Divider -->
            <Divider align="center">
              <span class="!text-slate-400 !bg-white !px-4 !text-sm"
                >or continue with</span
              >
            </Divider>

            <!-- GitHub Login -->
            <Button
              type="button"
              label="GitHub"
              icon="pi pi-github"
              class="w-full"
            />

            <!-- Google Login -->
            <Button
              type="button"
              label="Google"
              icon="pi pi-google"
              class="w-full"
            />

            <!-- Sign up link -->
            <div class="text-center pt-4">
              <span class="text-slate-600">Don't have an account? </span>
              <RouterLink
                to="/dang-ky"
                class="font-semibold text-cyan-600 hover:text-cyan-700 transition-colors duration-200"
              >
                Create one now
              </RouterLink>
            </div>
          </form>
        </div>
      </div>
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
