import { createRouter, createWebHistory } from "vue-router";
import { constantRouter } from "./routes.ts";

let router = createRouter({
  history: createWebHistory(),
  routes: constantRouter,
  scrollBehavior(_to, _from, _savedPosition) {
    return { top: 0 };
  },
});

export default router;
