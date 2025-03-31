import { defineStore } from "pinia"
import { reqLogin } from "@/api/user"
import { ref } from "vue"


export const useUserStore = defineStore("User", () => {
  const token = ref("")
  const userLogin = async(data) => {
      const res = await reqLogin(data)
      
      if(res.success) {
        localStorage.setItem("TOKEN", res.token)
        token.value = localStorage.getItem("TOKEN")
        return "OK"
      } else {
        return Promise.reject(new Error(res.message))
      }
      
  }
  
  return { userLogin, token }
})