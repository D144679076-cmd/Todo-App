import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { definePreset } from "@primeuix/themes";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import "./assets/main.css";
import ToastService from "primevue/toastservice";
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'
const app = createApp(App);
const newPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: "{cyan.50}",
      100: "{cyan.100}",
      200: "{cyan.200}",
      300: "{cyan.300}",
      400: "{cyan.400}",
      500: "{cyan.500}",
      600: "{cyan.600}",
      700: "{cyan.700}",
      800: "{cyan.800}",
      900: "{cyan.900}",
      950: "{cyan.950}",
    },
    colorScheme: {
      light: {
        surface: {
          0: "#ffffff",
          50: "{zinc.50}",
          100: "{zinc.100}",
          200: "{zinc.200}",
          300: "{zinc.300}",
          400: "{zinc.400}",
          500: "{zinc.500}",
          600: "{zinc.600}",
          700: "{zinc.700}",
          800: "{zinc.800}",
          900: "{zinc.900}",
          950: "{zinc.950}",
        },
        formField: {
          hoverBorderColor: "{primary.color}",
        },
      },
      dark: {
        surface: {
          0: "#ffffff",
          50: "{slate.50}",
          100: "{slate.100}",
          200: "{slate.200}",
          300: "{slate.300}",
          400: "{slate.400}",
          500: "{slate.500}",
          600: "{slate.600}",
          700: "{slate.700}",
          800: "{slate.800}",
          900: "{slate.900}",
          950: "{slate.950}",
        },
        formField: {
          hoverBorderColor: "{primary.color}",
        },
      },
    },
    focusRing: {
      width: "2px",
      style: "dashed",
      color: "{primary.color}",
      offset: "1px",
    },
  },
});
app.use(router);
app.use(PrimeVue, {
  ripple: true,
  theme: {
    preset: newPreset,
    options: {
      darkModeSelector: ".my-app-dark",
      cssLayer: false,
    },
  },
}); // Enable ripple effect
app.use(ToastService);

app.mount("#app");
const queryClient = new QueryClient()

app.use(VueQueryPlugin, {
  queryClient: queryClient
})