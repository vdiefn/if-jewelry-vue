import router from "@/router"
import { useUserStore } from "./store/modules/user"
import setting from "@/setting.ts"



let isUserChecked = false

router.beforeEach(async(to, from) => {
    const userStore = useUserStore()
    const token = userStore.token

    const isBackendRoute = to.path.startsWith("/admin")

    if(isBackendRoute) {
        document.title = `${setting.backendTitle}`
    } else {
        document.title = `${setting.frontendTitle}`
    }

    if(isBackendRoute && !token && to.name !== "login") {
        return { name: "login"}
    }

    if(token && to.name === "login") {
        return { name: "dashboard"}
    }

    if(token && !isUserChecked && isBackendRoute) {
        try {
            await userStore.userCheck()
            isUserChecked = true
        } catch (error) {
            userStore.userLogout()
            return { name: "login" }
        }
    }

    return true
})