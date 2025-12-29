<script setup lang="ts">
import { ElButton } from "element-plus";
import { ref } from "vue";

type Close = typeof close;

interface CloseExpose {
  close: Close
}

const showCoupon = ref(true);

const close = () => {
  showCoupon.value = false;
};

defineExpose<CloseExpose>({ close });
</script>

<template>
  <div v-if="showCoupon" class="custom-dialog">
    <div class="dialog-header">
      <ElButton class="close-btn" @click="close" size="small">X</ElButton>
    </div>
    <section class="dialog-body">
      <div class="top">
        <h5>If Jewelry</h5>
        <h5>生日快樂!</h5>
      </div>
      <div class="coupon-info">
        <p>HBD2025</p>
      </div>
    </section>
    <div class="dialog-footer">
      <ElButton @click="close" size="small">關閉</ElButton>
    </div>
  </div>
</template>

<style scope lang="scss">
.custom-dialog {
  width: 110px;
  position: fixed;
  top: 45vh;
  left: 10px;
  background-color: white;
  border-radius: 15px;
  z-index: 99;
  box-shadow: 0 4px 20px 4px rgb(0 0 0 / 0.3);
  background-image: url("https://plus.unsplash.com/premium_photo-1677995700883-30df169c7517?q=80&w=923&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  opacity: 0.9;

  .dialog-header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 10px;
    margin: 0;

    .el-button {
      border: none;
      width: 15px;
      margin: 0;
      background: transparent;
    }
  }

  .dialog-body {
    display: column;
    gap: 5px;

    .top {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 0 5px;
      padding: 2px;
      color: #e6e6fa;

      h5 {
        color: #e6e6fa;
        font-weight: bold;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
      }
    }

    .coupon-info {
      border-radius: 3px;
      height: 1.5rem;
      margin: 10px;
      padding: 0 5px;
      background-color: whitesmoke;
      opacity: 0.8;

      p {
        text-align: center;
        line-height: 1.5rem;
        font-size: 1rem;
      }
    }
  }

  .dialog-footer {
    display: flex;
    justify-content: flex-end;
    margin: 5px 8px;

    .el-button {
      border: none;
      color: white;
      background: linear-gradient(
        135deg,
        #a18fff 0%,
        #7f9bff 50%,
        #a6c1ff 100%
      );
      flex: 1;

      &:hover {
        background: linear-gradient(
          135deg,
          #a6c1ff 0%,
          #7f9bff 50%,
          #a18fff 100%
        );
      }
    }
  }
}

@media (min-width: $breakpoint-tablet) {
  .custom-dialog {
    width: 150px;

    .dialog-body {
      display: column;
      gap: 5px;

      .top {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 3px;
        padding: 5px;
        color: #e6e6fa;
      }

      .coupon-info {
        border-radius: 3px;
        height: 1.5rem;
        margin: 10px;

        p {
          text-align: center;
          line-height: 1.5rem;
          font-size: 1.1rem;
        }
      }
    }
  }
}
</style>
