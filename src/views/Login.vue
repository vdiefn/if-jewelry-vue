<script setup>
import { ref, reactive } from "vue";
import { User, Lock } from "@element-plus/icons-vue";
import { useUserStore } from "@/store/modules/user";
import { ElNotification } from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter();
const loading = ref(false);

const loginForm = reactive({
  username: "ifjewelry@gmail.com",
  password: "test1234test",
});
const userStore = useUserStore();

const login = async () => {
  loading.value = true;
  try {
    await userStore.userLogin(loginForm);
    router.push("/");
    ElNotification({
      type: "success",
      message: "登入成功",
    });
  } catch (error) {
    ElNotification({
      type: "error",
      message: error.message,
    });
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="login-container">
    <ElForm class="login-form" :model="loginForm">
      <h1>HELLO</h1>
      <h2>歡迎使用後台管理系統</h2>
      <ElFormItem>
        <ElInput :prefix-icon="User" v-model="loginForm.username"></ElInput>
      </ElFormItem>
      <ElFormItem>
        <ElInput
          type="password"
          :prefix-icon="Lock"
          v-model="loginForm.password"
          show-password
        ></ElInput>
      </ElFormItem>
      <ElFormItem>
        <ElButton class="login-btn" type="primary" @click="login">
          登入
        </ElButton>
      </ElFormItem>
    </ElForm>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100vh;
  background: url("/background.jpg") no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-form {
    position: relative;
    width: 40%;
    top: 10vh;
    padding: 40px;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.2);

    h1 {
      color: #575f4b;
      font-size: 40px;
      font-weight: 700;
    }

    h2 {
      color: #575f4b;
      font-size: 20px;
      margin: 20px 0;
    }

    .login-btn {
      width: 100%;
    }
  }
}
</style>
