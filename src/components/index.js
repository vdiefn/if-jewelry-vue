import * as ElementPlusIconsVue from '@element-plus/icons-vue'

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

export { default as DialogAdminProduct } from "./DialogAdminProduct.vue"
export { default as DialogAdminCoupon } from "./DialogAdminCoupon.vue"