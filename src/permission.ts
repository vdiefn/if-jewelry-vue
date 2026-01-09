import router from "@/router";
import { useUserStore } from "./store/modules/user";
import setting from "@/setting.ts";

router.beforeEach(async (to, _from) => {
  const userStore = useUserStore();
  const token = userStore.token;
  const isBackendRoute = to.path.startsWith("/admin");

  if (isBackendRoute) {
    document.title = `${setting.backendTitle}`;
  } else {
    document.title = `${setting.frontendTitle}`;
  }

  if (isBackendRoute && !token && to.name !== "login") {
    return { name: "login" };
  }

  if (token && to.name === "login") {
    return { name: "dashboard" };
  }

  if (isBackendRoute && token && !userStore.hasVerified) {
    await userStore.userCheck();
    if (!userStore.hasVerified) {
      userStore.userLogout();
      return { path: "/admin/login" };
    }
  }

  return true;
});
