import {
  Goods,
  Discount,
  Document,
  Monitor,
  Histogram,
  Reading,
} from "@element-plus/icons-vue";
import { markRaw } from "vue";

export const constantRouter = [
  {
    path: "/admin/login",
    component: () => import("@/views/admin/Login.vue"),
    name: "login",
    meta: {
      title: "登入",
      hidden: true,
    },
  },
  {
    path: "/admin",
    component: () => import("@/layout/admin/index.vue"),
    name: "layout",
    meta: {
      title: "",
      hidden: true,
      icon: "",
    },
    redirect: "/admin/dashboard",
    children: [
      {
        path: "/admin/dashboard",
        component: () => import("@/views/admin/Dashboard.vue"),
        name: "dashboard",
        meta: {
          title: "Dashboard",
          hidden: false,
          icon: markRaw(Histogram),
        },
      },
      {
        path: "/admin/products",
        component: () => import("@/views/admin/Products.vue"),
        name: "AdminProducts",
        meta: {
          title: "產品列表",
          hidden: false,
          icon: markRaw(Goods),
        },
      },
      {
        path: "/admin/orders",
        component: () => import("@/views/admin/Orders.vue"),
        name: "AdminOrders",
        meta: {
          title: "訂單列表",
          hidden: false,
          icon: markRaw(Document),
        },
      },
      {
        path: "/admin/coupons",
        component: () => import("@/views/admin/Coupons.vue"),
        name: "AdminCoupons",
        meta: {
          title: "折價券列表",
          hidden: false,
          icon: markRaw(Discount),
        },
      },
      {
        path: "/admin/articles",
        component: () => import("@/views/admin/Articles.vue"),
        name: "AdminArticles",
        meta: {
          title: "文章列表",
          hidden: false,
          icon: markRaw(Reading),
        },
      },
      {
        path: "/admin/screen",
        component: () => import("@/views/admin/Screen.vue"),
        name: "Screen",
        meta: {
          title: "數據資料",
          hidden: false,
          icon: markRaw(Monitor),
        },
      },
    ],
  },
  {
    path: "/",
    component: () => import("@/layout/front/frontLayout.vue"),
    name: "frontLayout",
    hidden: false,
    meta: {
      title: "首頁",
      hidden: false,
    },
    redirect: "/home",
    children: [
      {
        path: "home",
        component: () => import("@/views/front/Home.vue"),
        name: "Home",
        meta: {
          title: "首頁",
          hidden: true,
        },
      },
      {
        path: "products",
        component: () => import("@/views/front/Products.vue"),
        name: "FrontProducts",
        meta: {
          title: "產品列表",
          hidden: true,
        },
      },
      {
        path: "product/:id",
        component: () => import("@/views/front/ProductDetail.vue"),
        name: "ProductDetail",
        meta: {
          title: "產品詳情",
          hidden: true,
        },
      },
      {
        path: "cart",
        component: () => import("@/views/front/Cart.vue"),
        name: "Cart",
        meta: {
          title: "購物車",
          hidden: true,
        },
      },
      {
        path: "checkout",
        component: () => import("@/views/front/Checkout.vue"),
        name: "Checkout",
        meta: {
          title: "結帳",
          hidden: true,
        },
      },
      {
        path: "success",
        component: () => import("@/views/front/Success.vue"),
        name: "Success",
        meta: {
          title: "購物完成",
          hidden: true,
        },
      },
      {
        path: "faq",
        component: () => import("@/views/front/Faq.vue"),
        name: "Faq",
        meta: {
          title: "FAQ 常見問題",
          hidden: true,
        },
      },
      {
        path: "shippingAndPayment",
        component: () => import("@/views/front/ShippingAndPayment.vue"),
        name: "ShippingAndPayment",
        meta: {
          title: "運送及付款方式",
          hidden: true,
        },
      },
      {
        path: "about",
        component: () => import("@/views/front/About.vue"),
        name: "About",
        meta: {
          title: "品牌故事",
          hidden: true,
        },
      },
      {
        path: "jewelryStory",
        component: () => import("@/views/front/JewelryStory.vue"),
        name: "JewelryStory",
        meta: {
          title: "珠寶小教室",
          hidden: true,
        },
      },
      {
        path: "jewelryStory/:id",
        component: () => import("@/views/front/StoryDetail.vue"),
        name: "storyDetail",
        meta: {
          title: "珠寶文章",
          hidden: true,
        },
      },
      {
        path: "/404",
        component: () => import("@/views/front/404.vue"),
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
    ],
  },
];
