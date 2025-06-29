<script setup>
import { ref, reactive } from 'vue';
import { ElSteps, ElStep } from "element-plus"
import { useRouter } from "vue-router"

const router = useRouter()
const activeStep = ref(0)
const form = reactive({
    name: "",
    address:"",
    phone:"",
    email:"",
    message:""
})

const nextStep = () => {
    if(activeStep.value < 2){
        activeStep.value ++
    } else {
        submitOrder()
    }
}

const prevStep = () => {
    if(activeStep.value > 0) {
        activeStep.value --
    } else {
        router.push("/cart")
    }
}

const submitOrder = () => {

}

</script>

<template>
    <div class="container">

        <ElSteps style="max-width: 600px" :active="activeStep" align-center>
            <ElStep title="Step 1" description="收件資訊" />
            <ElStep title="Step 2" description="配送方式" />
            <ElStep title="Step 3" description="付款資訊" />
        </ElSteps>

        <div class="step-content">
            <template v-if="activeStep === 0">
                <ElCard>
                    <h3>收件資訊</h3>
                    <ElForm :model="form" label-width="auto" >
                        <ElFormItem label="收件人姓名">
                            <ElInput v-model="form.name" placeholder="收件人姓名" />
                        </ElFormItem>
                        <ElFormItem label="收件地址">
                            <ElInput v-model="form.address" placeholder="地址" />
                        </ElFormItem>
                        <ElFormItem label="連絡電話">
                            <ElInput v-model="phone" placeholder="連絡電話"  />
                        </ElFormItem>
                        <ElFormItem label="Email">
                            <ElInput v-model="email" placeholder="電子郵件"  />
                        </ElFormItem>
                        <ElFormItem label="想說的話">
                            <ElInput v-model="message" type="textarea"/>
                        </ElFormItem>
                    </ElForm>
                </ElCard>
            </template>

            <template v-else-if="activeStep === 1">
                <ElCard>
                    <h3>配送方式</h3>
                    <ElRadioGroup v-model="form.delivery">
                        <ElRadio label="宅配">宅配</ElRadio>
                        <ElRadio label="超商取貨">超商取貨</ElRadio>
                    </ElRadioGroup>
                </ElCard>

            </template>

            <template v-else-if="activeStep === 2">
                <ElCard>
                    <h3>付款資訊</h3>
                    <ElRadioGroup v-model="form.payment">
                        <ElRadio label="信用卡">信用卡</ElRadio>
                        <ElRadio label="貨到付款">貨到付款</ElRadio>
                    </ElRadioGroup>
                </ElCard>
            </template>
        </div>

        <div class="step-actions">
            <ElButton @click="prevStep">
                {{ activeStep> 0 ? "上一步" : "返回購物車" }}
            </ElButton>
            <ElButton type="primary" @click="nextStep">
                {{ activeStep === 2 ? "送出訂單" : "下一步" }}
            </ElButton>
        </div>

        <ElCard>
            <h5>訂單摘要</h5>
            <ElCollapse >
                <ElCollapseItem title="商品內容">
                    <p>A</p>
                </ElCollapseItem>
            </ElCollapse>
        </ElCard>
    </div>
</template>

<style scoped lang="scss">
.container {
    display: block;
    margin: $base-header-height auto;
    padding-top: 10px;
    width: 90%;

    .el-steps {
        margin: 2rem auto;
    }

    .step-content {

        .el-form {
            margin-top: 10px;
        }
    }

    .el-card {
        margin: 2rem auto;

    }

    .el-collapse {
        margin: 20px auto;
    }
}
</style>