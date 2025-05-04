import router from "@/router"
import pinia from "./store"
import { useUserStore } from "./store/modules/user"
import setting from "@/setting"

const userStore = useUserStore(pinia)

let isUserChecked = false

router.beforeEach(async(to, from) => {
  const token = userStore.token
  document.title = `${setting.title}`

  if(!token && to.name !== "login") {
    return { name: "login"}
  }

  if(token){
    if(to.name === "login"){
      return { path: "/" }
    }
    if (!isUserChecked) {
      try {
        await userStore.userCheck()
        isUserChecked = true
      } catch(error) {
        userStore.userLogout()
        return { path: "/login" }
      }
    }
  }
})