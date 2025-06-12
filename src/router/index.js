import { createRouter, createWebHistory } from "vue-router";
import { constantRouter } from "./routes";

let router = createRouter({
    history: createWebHistory(),
    routes: constantRouter
})

export default router