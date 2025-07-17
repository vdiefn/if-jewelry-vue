import { createRouter, createWebHistory } from "vue-router";
import { constantRouter } from "./routes";

let router = createRouter({
    history: createWebHistory(),
    routes: constantRouter,
    scrollBehavior(to, from, savedPosition) {
        return { top: 0 }
    }
})

export default router