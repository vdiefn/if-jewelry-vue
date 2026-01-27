import { defineStore } from "pinia";
import { reqLogin, reqUserCheck } from "@/api/admin/user";
import { ref } from "vue";
import { SET_COOKIES, GET_COOKIES, DELETE_COOKIES } from "@/utils/cookies";
import { constantRouter } from "@/router/routes";
import type { LoginForm } from "@/types/admin/user";

export const useUserStore = defineStore("User", () => {
  const token = ref<string | null>(GET_COOKIES('hexToken'));
  const menuRoutes = ref(constantRouter);
  const hasVerified = ref(false)



  const userLogin = async (data: LoginForm) => {
    try {
      const res = await reqLogin(data);

      if(res.data.success){
        const { token: t, expired } = res.data
        SET_COOKIES(t, expired)
        token.value = t
        hasVerified.value = true
        return "OK";
      }

    } catch(err){
      console.error(err)
    }
  };

  const userLogout = () => {
    token.value = null;
    hasVerified.value = false;
    DELETE_COOKIES()
  }

  const userCheck = async (): Promise<void> => {
    try {
      const res = await reqUserCheck();
      hasVerified.value = res.data.success;
    } catch (err) {
      console.error(err);
      hasVerified.value = false;
    }
  };

  return { token, hasVerified, userLogin, menuRoutes, userLogout, userCheck };
});
