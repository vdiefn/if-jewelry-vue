import './styles/index.scss'
import { createApp } from 'vue'
import App from './App.vue'

import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'

/* fontawesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'
import {} from '@fortawesome/free-solid-svg-icons'
import {} from "@fortawesome/free-regular-svg-icons";
import {} from "@fortawesome/free-brands-svg-icons";

library.add(faCheck, faXmark)

import router from "./router"

import pinia from './store'




const app = createApp(App)


app.component('font-awesome-icon', FontAwesomeIcon)
app.use(ElementPlus)
app.use(router)
app.use(pinia)
import "./permission"
app.mount('#app')
