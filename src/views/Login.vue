<script setup>
import { ref, reactive } from "vue";
import { User, Lock } from "@element-plus/icons-vue";
import { useUserStore } from "@/store/modules/user";
import { ElNotification } from "element-plus";
import { useRouter } from "vue-router";
import { getTime } from "@/utils/time";

const router = useRouter();
const loading = ref(false);
const ruleFormRef = ref();

const loginForm = reactive({
  username: "ifjewelry@gmail.com",
  password: "test1234test",
});
const userStore = useUserStore();

const login = async (formEl) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      loading.value = true;
      try {
        await userStore.userLogin(loginForm);
        router.push("/");
        ElNotification({
          type: "success",
          message: `${getTime()}，歡迎登入`,
        });
      } catch (error) {
        ElNotification({
          type: "error",
          message: error.message,
        });
      } finally {
        loading.value = false;
      }
    } else {
      console.error("Error Submit", fields);
    }
  });
};

const rules = {
  username: [
    { required: true, message: "使用者帳號不可為空", trigger: "blur" },
    {
      type: "email",
      message: "請輸入有效的Email格式",
      trigger: ["blur", "change"],
    },
  ],
  password: [
    {
      required: true,
      min: 6,
      max: 20,
      message: "密碼長度為6-20位英文/數字",
      trigger: "change",
    },
  ],
};
</script>

<template>
  <div class="login-container">
    <ElForm
      class="login-form"
      :model="loginForm"
      :rules="rules"
      ref="ruleFormRef"
    >
      <h1>HELLO</h1>
      <h2>歡迎使用後台管理系統</h2>
      <ElFormItem prop="username">
        <ElInput :prefix-icon="User" v-model="loginForm.username"></ElInput>
      </ElFormItem>
      <ElFormItem prop="password">
        <ElInput
          type="password"
          :prefix-icon="Lock"
          v-model="loginForm.password"
          show-password
        ></ElInput>
      </ElFormItem>
      <ElFormItem>
        <ElButton
          class="login-btn"
          type="primary"
          @click="login(ruleFormRef)"
          :loading="loading"
        >
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
