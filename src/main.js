import './styles/index.scss'
import { createApp } from 'vue'
import App from './App.vue'

import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import router from "./router"

import pinia from "./store"

import {  } from '@fortawesome/free-solid-svg-icons'
import {} from "@fortawesome/free-regular-svg-icons";
import {} from "@fortawesome/free-brands-svg-icons";


const app = createApp(App)

library.add()

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(ElementPlus)
app.use(router)
app.use(pinia)
app.mount('#app')
