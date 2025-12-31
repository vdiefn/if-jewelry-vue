import { defineStore } from "pinia";
import { reqLogin, reqUserCheck } from "@/api/admin/user";
import { ref } from "vue";
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from "@/utils/token";
import { constantRouter } from "@/router/routes";
import type { LoginForm } from "@/types/admin/user";

export const useUserStore = defineStore("User", () => {
  const token = ref<string | null>("");
  const menuRoutes = ref(constantRouter);
  const userLogin = async (data: LoginForm) => {
    try {
      const res = await reqLogin(data);
      if (res.data.success) {
        SET_TOKEN(res.data.token);
        token.value = GET_TOKEN();
        return "OK";
      }
    } catch(err){
      console.error(err)
    }
  };

  const userLogout = () => {
    token.value = "";
    REMOVE_TOKEN();
  };

  const userCheck = async () => {
    await reqUserCheck();
  };

  return { userLogin, token, menuRoutes, userLogout, userCheck };
});
