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
    message:"",
    delivery:""

})
const creditCardForm = reactive({
    cardHolderName: "",
    cardNumber1: "",
    cardNumber2: "",
    cardNumber3: "",
    cardNumber4: "",
    cvvNumber: "",
    expireMonth:"",
    expireYear: "",
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
                    <ElForm :model="form" label-width="auto">
                        <ElFormItem label="寄送方式">
                            <ElRadioGroup v-model="form.delivery">
                                <ElRadio label="宅配" border>宅配</ElRadio>
                                <ElRadio label="超商取貨不付款" border>超商取貨不付款</ElRadio>
                            </ElRadioGroup>
                        </ElFormItem>
                    </ElForm>
                </ElCard>

            </template>

            <template v-else-if="activeStep === 2">
                <ElCard>
                    <ElForm label-width="100px">
                        <ElFormItem label="付款方式">
                            <ElRadioGroup v-model="form.payment">
                                <ElRadio label="信用卡" value="credit card" border>信用卡</ElRadio>
                                <ElRadio label="ATM轉帳" value="atm transfer" border>ATM轉帳</ElRadio>
                            </ElRadioGroup>
                        </ElFormItem>
                        <template v-if="form.payment === 'credit card'">
                            <ElForm :model="creditCardForm" label-width="100px">
                                <ElFormItem label="持卡人姓名">
                                    <ElInput v-model="creditCardForm.cardHolderName" placeholder="請輸入持卡人姓名" style="width: 30%;"/>
                                </ElFormItem>
                                <ElFormItem label="信用卡卡號">
                                    <ElRow :gutter="10">
                                        <ElCol :span="6">
                                            <ElInput v-model="creditCardForm.cardNumber1" placeholder="1234" maxlength="4" />
                                        </ElCol>
                                        <ElCol :span="6">
                                            <ElInput v-model="creditCardForm.cardNumber2" placeholder="5678" maxlength="4" />
                                        </ElCol>
                                        <ElCol :span="6">
                                            <ElInput v-model="creditCardForm.cardNumber3" placeholder="9012" maxlength="4" />
                                        </ElCol>
                                        <ElCol :span="6">
                                            <ElInput v-model="creditCardForm.cardNumber4" placeholder="3456" maxlength="4" />
                                        </ElCol>
                                    </ElRow>
                                </ElFormItem>
                                <ElFormItem label="到期年月">
                                    <div style="display: flex; gap: 10px; width: 30%;">
                                        <ElSelect
                                            v-model="creditCardForm.expireMonth"
                                            placeholder="月 (MM)"
                                            style="flex: 1"
                                        >
                                            <ElOption v-for="month in months" :key="month" :label="month" :value="month" />
                                        </ElSelect>

                                        <ElSelect
                                            v-model="creditCardForm.expireYear"
                                            placeholder="年 (YYYY)"
                                            style="flex: 1"
                                        >
                                            <ElOption v-for="year in years" :key="year" :label="year" :value="year" />
                                        </ElSelect>
                                    </div>
                                </ElFormItem>
                                <ElFormItem label="後三碼">
                                    <ElInput v-model="creditCardForm.cvvNumber" placeholder="請輸入後三碼" maxlength="3" show-password style="width: 30%;"/>
                                </ElFormItem>
                            </ElForm>
                        </template>
                        <template v-else-if="form.payment === 'atm transfer'">
                            <ElCard class="account-info">
                                <h6>帳戶資訊</h6>
                                <p>銀行名稱: OX銀行 (ox分行)</p>
                                <p>銀行代碼: 999</p>
                                <p>銀行帳號: 1234567654321</p>
                            </ElCard>
                        </template>
                    </ElForm>
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

    .step-actions {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .el-button {
            margin: 5px 0;
            width: 150px;
        }
    }

    .el-card {
        margin: 2rem auto;

    }

    .el-collapse {
        margin: 20px auto;
    }
}

@media (min-width: $breakpoint-tablet) {
    .container {
        max-width: 750px;
        width: 100%;
    }
}

@media (min-width: $breakpoint-desktop) {
    .container {
        max-width: 1000px;
        width: 100%;
    }
}
</style>