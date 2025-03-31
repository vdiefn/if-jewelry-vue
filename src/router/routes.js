export const constantRouter = [
    {
      path: "/login",
      component: ()=>import("@/views/Login.vue"),
      name: "login"
    },
    {
      path: "/",
      component: ()=>import ("@/views/Home.vue"),
      name: "home"
    },
    {
      path: "/404",
      component: ()=>import("@/views/404.vue"),
      name: "404"
    },
    {
			path: "/:pathMatch(.*)*",
			redirect: "/404",
			name: "any" 
		},
  ]