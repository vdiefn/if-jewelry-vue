import { defineStore } from "pinia"
import { reqLogin } from "@/api/user"
import { ref } from "vue"
import { SET_TOKEN, GET_TOKEN } from "@/utils/token"
import { constantRouter } from "@/router/routes" 


export const useUserStore = defineStore("User", () => {
  const token = ref("")
  const menuRoutes = ref(constantRouter)
  const userLogin = async(data) => {
      const res = await reqLogin(data)

      if(res.success) {
        SET_TOKEN(res.token)
        token.value = GET_TOKEN()
        return "OK"
      } else {
        return Promise.reject(new Error(res.message))
      }
      
  }
  
  return { userLogin, token, menuRoutes }
})