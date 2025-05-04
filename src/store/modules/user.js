import { defineStore } from "pinia"
import { reqLogin, reqUserCheck } from "@/api/user"
import { ref } from "vue"
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from "@/utils/token"
import { constantRouter } from "@/router/routes" 


export const useUserStore = defineStore("User", () => {
  const token = ref("")
  const menuRoutes = ref(constantRouter)
  const userLogin = async(data) => {
        const result = await reqLogin(data)
        if(result.success) {
          SET_TOKEN(result.token)
          token.value = GET_TOKEN()
          return "OK"
        } else {
          return Promise.reject(new Error(result.data.message))
        }   
  }

  const userLogout = () =>{
    token.value = ""
    REMOVE_TOKEN()
  }

  const userCheck = async() => {
    await reqUserCheck()
  }
  
  return { userLogin, token, menuRoutes, userLogout, userCheck }
})