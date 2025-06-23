import '@/assets/style/index.scss'
import { createApp } from 'vue'
import App from './App.vue'

/* Element Plus */
import ElementPlus from 'element-plus'
import '@/assets/style/element/index.scss'

/* fontawesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faCheck, faXmark, faCartShopping, faBars } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan} from "@fortawesome/free-regular-svg-icons";
import { faFacebook, faInstagram, faLine} from "@fortawesome/free-brands-svg-icons";

library.add(faCheck, faXmark, faFacebook, faInstagram, faLine, faCartShopping, faBars, faTrashCan)

import router from "./router"

import pinia from './store'

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
app.use(pinia)
app.use(ElementPlus)
import "./permission"
app.mount('#app')
