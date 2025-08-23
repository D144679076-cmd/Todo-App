<script setup lang="ts">
import { computed } from "vue";
import Card from "primevue/card";

// Define the props interface
interface FeatureCardProps {
  icon: string; // PrimeIcons class name (e.g., 'pi pi-home')
  title: string;
  description: string;
  gradient?: "primary" | "accent" | "success";
}

const props = withDefaults(defineProps<FeatureCardProps>(), {
  gradient: "primary",
});

// Gradient classes mapping
const gradientClasses = computed(() => {
  const gradients = {
    primary: "bg-gradient-to-br from-blue-500 to-purple-600",
    accent: "bg-gradient-to-br from-purple-500 to-pink-600",
    success: "bg-gradient-to-br from-green-500 to-emerald-600",
  };
  return gradients[props.gradient];
});
</script>

<template>
  <Card
    class="bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out group hover:scale-105"
  >
    <template #content>
      <div class="p-6 space-y-4">
        <div
          :class="[
            'w-12 h-12 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 ease-bounce',
            gradientClasses,
          ]"
        >
          <i :class="[props.icon, 'text-white text-xl']" />
        </div>

        <div class="space-y-2">
          <h3 class="text-xl font-bold text-gray-900 dark:text-white">
            {{ title }}
          </h3>
          <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
            {{ description }}
          </p>
        </div>
      </div>
    </template>
  </Card>
</template>

<style scoped>
/* Custom bounce transition */
.ease-bounce {
  transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

/* Additional gradient backgrounds for card */
.bg-gradient-card {
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.05) 100%
  );
}
</style>
