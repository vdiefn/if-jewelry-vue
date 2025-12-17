<script setup>
  import { onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { ElMessage } from "element-plus"
  import { useUserStore } from "@/store/modules/user";

  const userStore = useUserStore();
  const router = useRouter()
  const isSuccess = ref(false)

  const checkLoginStatus = async () => {
    try {
      await userStore.userCheck()
    } catch (error) {
      ElMessage({ type: "error", message:"請重新登入" })
      console.error(error)
      router.push('/login')
    } finally {
      isSuccess.value = true
    }
  }

  onMounted(() => {
    checkLoginStatus()
  })
</script>

<template>
    <div>Dashboard</div>
</template>

<style scoped></style>
