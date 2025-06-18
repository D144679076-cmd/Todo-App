// filepath: /home/duy/Project/personal/Todo-App/Todo-App-Frontend/src/router/index.js
import { createRouter, createMemoryHistory } from "vue-router";
import Login from "../components/Login.vue";
import { createWebHistory } from "vue-router";
import Register from "@/components/Register.vue";
import ResetPasword from "@/components/ResetPasword.vue";
const checkAuth = () => {
  const token = localStorage.getItem("auth_data");
  return !!token;
};

const routes = [
  {
    path: "/dang-nhap",
    component: Login,
  },
  {
    path: "/dang-ky",
    component: Register,
  },
  {
    path: "/quen-mat-khau",
    component: ResetPasword,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === "/dang-nhap" && checkAuth()) {
    console.log("User is already logged in, redirecting to home page.");
    next({ path: "/" });
  } else if (to.path !== "/dang-nhap" && to.path !== "/dang-ky" && to.path !== "/quen-mat-khau" && !checkAuth()) {
    console.log("User is not logged in, redirecting to login page.");
    next({ path: "/dang-nhap" });
  } else {
    next();
  }
});

export default router;