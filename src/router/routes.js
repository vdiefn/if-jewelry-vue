import {
  Goods,
  Discount,
  Document,
  Monitor,
  Histogram
} from "@element-plus/icons-vue";
import { markRaw } from "vue"

export const constantRouter = [
  {
    path: "/login",
    component: () => import("@/views/Login.vue"),
    name: "login",
    meta: {
      title: "登入",
      hidden: true,
    },
  },
  {
    path: "/",
    component: () => import("@/layout/admin/index.vue"),
    name: "layout",
    meta:{
      title:"",
      hidden:true,
      icon:""
    },
    redirect:"/dashboard",
    children: [
      {
        path: "/dashboard",
        component:()=>import("@/views/admin/Dashboard.vue"),
          meta:{
            title:"Dashboard",
            hidden:false,
            icon:markRaw(Histogram)
          }
      },
      {
        path: "/coupons",
        component: () => import("@/views/admin/Coupons.vue"),
        name: "AdminCoupons",
        meta: {
          title: "折價券列表",
          hidden: false,
          icon: markRaw(Discount),
        },
      },
      {
        path: "/orders",
        component: () => import("@/views/admin/Orders.vue"),
        name: "AdminOrders",
        meta: {
          title: "訂單列表",
          hidden: false,
          icon: markRaw(Document),
        },
      },
      {
        path: "/products",
        component: () => import("@/views/admin/Products.vue"),
        name: "AdminProducts",
        meta: {
          title: "產品列表",
          hidden: false,
          icon: markRaw(Goods),
        },
      },
      {
        path: "/screen",
        component: () => import("@/views/admin/Screen.vue"),
        name: "Screen",
        meta: {
          title: "數據資料",
          hidden: false,
          icon: markRaw(Monitor),
        },
      },
    ]
  },
  {
    path: "/404",
    component: () => import("@/views/404.vue"),
    name: "404",
    meta: {
      title: "404",
      hidden: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    name: "any",
    meta: {
      title: "任意路由",
      hidden: true,
    },
  },
]