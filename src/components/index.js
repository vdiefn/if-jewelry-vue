import SvgIcon from "./SvgIcon/index.vue"
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const components = { SvgIcon }

export default {
  install(app) {
    Object.keys(components).forEach((key) => {
      app.component(key, components[key])
    })
    
    //將element-plus提供的icon註冊為全局組件
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
		  app.component(key, component)
		}
  },
}