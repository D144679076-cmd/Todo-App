import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { definePreset } from "@primeuix/themes";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import "./assets/main.css";
import ToastService from "primevue/toastservice";
const app = createApp(App);

app.use(router);
app.use(PrimeVue, {
  ripple: true,
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: ".my-app-dark",
      cssLayer: false,
    },
  },
}); // Enable ripple effect
app.use(ToastService);

app.mount("#app");
