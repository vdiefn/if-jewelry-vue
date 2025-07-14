<script setup>
import { ElButton } from "element-plus";
import { ref } from "vue";

const showCoupon = ref(true)

const close = () => {
    showCoupon.value = false
}

defineExpose({ close })
</script>

<template>
    <div v-if="showCoupon" class="custom-dialog">
        <div class="dialog-header">
            <ElButton class="close-btn" @click="close" size="small">X</ElButton>
        </div>
        <section class="dialog-body">
            <div class="top">
                <font-awesome-icon :icon="['fas', 'cake-candles']" />
                <h5>If Jewelry 生日快樂!</h5>
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

<style scope lang="scss" >
.custom-dialog {
    position: fixed;
    top: 45vh;
    left: 10px;
    background-color: white;
    border-radius: 3px;
    border: 1px solid lightgray;
    z-index: 99;
    box-shadow: 0 2px 12px rgb(0 0 0 / 0.2);
    background: url(https://plus.unsplash.com/premium_photo-1663839411959-884b1e1667f5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D);
    object-fit: cover;

    .dialog-header {
        display: flex;
        justify-content:flex-end;
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
            justify-content: center;
            align-items: center;
            margin: 0 5px;
            gap: 5px;
            padding: 3px;
        }

        .coupon-info {
            border: 1px solid lightgray;
            height: 2rem;
            margin: 10px;
            padding: 0 10px;

            p {
                text-align: left;
                line-height: 2rem;
                font-size: 1.2rem;
            }
        }
    }

    .dialog-footer {
        display: flex;
        justify-content: flex-end;
        margin: 5px 8px;
    }
}
</style>