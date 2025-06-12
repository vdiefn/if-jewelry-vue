import router from "@/router"
import pinia from "./store"
import { useUserStore } from "./store/modules/user"
import setting from "@/setting"

const userStore = useUserStore(pinia)

let isUserChecked = false

router.beforeEach(async(to, from) => {
    const token = userStore.token
    document.title = `${setting.title}`

    const isBackendRoute = to.path.startsWith("/admin")

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