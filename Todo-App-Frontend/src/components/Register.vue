<script setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Select from "primevue/select";
import Checkbox from "primevue/checkbox";
import Button from "primevue/button";
import $api from "@/plugins/axios";
import DatePicker from "primevue/datepicker";
import { useToast } from "primevue";
import Toast from "primevue/toast";
const toast = useToast();
// Reactive properties for form inputs
const fullName = ref("");
const birthday = ref("");
const email = ref("");
const password = ref("");
const gender = ref(null);
const termsAccepted = ref(false);

// Gender options
const genderOptions = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
];

// Interest options
const interestOptions = ["Technology", "Sports", "Arts"];

// Function to handle form submission
const handleRegister = () => {
  if (!termsAccepted.value) {
    alert("You must accept the terms and conditions to register.");
    return;
  }

  console.log({
    fullName: fullName.value,
    birthday: birthday.value,
    email: email.value,
    password: password.value,
    gender: gender.value,
  });
  $api
    .post("/auth/register", {
      fullName: fullName.value,
      birthday: birthday.value,
      email: email.value,
      password: password.value,
      gender: gender.value,
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
    });
};
</script>

<template>
  <Toast position="top-right" />
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div
      class="w-full max-w-md p-6 bg-white shadow-md rounded-lg flex flex-col gap-y-3"
    >
      <div class="text-center mb-6">
        <i class="pi pi-user text-4xl text-gray-600"></i>
        <h2 class="text-2xl font-bold text-gray-800">Create your account</h2>
        <p class="text-sm text-gray-500">
          Fill in your information to get started
        </p>
      </div>
      <div class="gap-y-3.5 flex flex-col">
        <div class="mb-4">
          <label for="fullName" class="block text-sm font-medium text-gray-700"
            >Full Name</label
          >
          <InputText
            id="fullName"
            v-model="fullName"
            placeholder="Enter your full name"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div class="mb-4">
          <label for="birthday" class="block text-sm font-medium text-gray-700"
            >Birthday</label
          >
          <DatePicker
            id="birthday"
            v-model="birthday"
            placeholder="dd/mm/yyyy"
            dateFormat="dd/mm/yy"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-sm font-medium text-gray-700"
            >Email address</label
          >
          <InputText
            id="email"
            v-model="email"
            type="email"
            placeholder="Enter your email"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-sm font-medium text-gray-700"
            >Password</label
          >
          <InputText
            id="password"
            v-model="password"
            type="password"
            placeholder="Enter your password"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div class="mb-4">
          <label for="gender" class="block text-sm font-medium text-gray-700"
            >Gender</label
          >
          <Select
            id="gender"
            v-model="gender"
            :options="genderOptions"
            placeholder="Select gender"
            option-label="label"
            option-value="value"
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div class="mb-4">
          <Checkbox v-model="termsAccepted" class="mr-2" binary />
          <span class="text-sm text-gray-700">
            I agree to the
            <a href="#" class="text-blue-500 hover:underline">Terms</a> and
            <a href="#" class="text-blue-500 hover:underline">Privacy Policy</a>
          </span>
        </div>
        <div style="margin-top: 10px">
          <Button
            label="Create Account"
            class="w-full bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            type="submit"
            @click="handleRegister"
          />
        </div>
      </div>
      <div class="mt-6 text-center">
        <p class="text-sm text-gray-500">
          Already have an account?
          <a href="/login" class="text-blue-500 hover:underline">Login</a>
        </p>
      </div>
    </div>
  </div>
</template>
