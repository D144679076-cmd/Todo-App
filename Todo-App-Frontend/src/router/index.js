// filepath: /home/duy/Project/personal/Todo-App/Todo-App-Frontend/src/router/index.js
import { createRouter, createMemoryHistory } from "vue-router";
import Login from "../components/Login.vue";

const checkAuth = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

const routes = [
  {
    path: "/dang-nhap",
    component: Login,
  },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === "/dang-nhap" && checkAuth()) {
    next({ path: "/" });
  } else if (to.path !== "/dang-nhap" && !checkAuth()) {
    next({ path: "/dang-nhap" });
  } else {
    next();
  }
});

export default router;