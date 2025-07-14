<script setup>
import { ref, reactive } from 'vue';
import {ElSteps, ElStep, ElMessage} from "element-plus"
import { useRouter } from "vue-router"
import { reqAddOrder } from "@/api/front/order.js";
import { reqAddPayment } from "@/api/front/pay.js";
import { useCartStore } from "@/store/modules/cart.js";

const cartStore = useCartStore();
const router = useRouter()
const orderId = ref("")
const activeStep = ref(0)
const formRef = ref(null)
const creditCardFormRef = ref(null)
const form = reactive({
    name: "",
    address:"",
    phone:"",
    email:"",
    message:"",
    delivery:"home delivery",
    pickupStore:"",
    payment:"credit card"
})

const validatePhone = (rule, value, callback) => {
    if(!value) {
        return callback(new Error("請提供手機號碼!"))
    }
    const regex = /^09\d{8}$/
    if(!regex.test(value)) {
        return callback(new Error("手機號碼格式錯誤!"))
    }

    callback();
}

const validatePickupStore = (rule, value, callback) => {
    if(form.delivery === 'store pickup' && !value) {
        callback(new Error("請填寫超商店名"))
    } else {
        callback()
    }
}

const rules = reactive({
    name: [{ required: true, message:"請提供收件人姓名", trigger:"blur" }],
    address: [{ required: true, message:"請提供收件地址", trigger:"blur"}],
    phone:[{ validator: validatePhone, trigger: 'blur' }],
    email:[
        { required: true, message:"請提供Email", trigger:"blur"},
        { type: 'email', message: 'Email 格式錯誤', trigger: "blur" }
    ],
    delivery: [{ required: true, message: '請選擇寄送方式', trigger: 'change' }],
    pickupStore:[{ validator: validatePickupStore, trigger: "blur"}]
})

const creditCardForm = reactive({
    cardHolderName: "",
    cardNumber1: "",
    cardNumber2: "",
    cardNumber3: "",
    cardNumber4: "",
    expireMonth:"",
    expireYear: "",
    cvvNumber: "",
})

const validateCardNumber = (rule, value, callback) => {
    if(!value) {
        callback(new Error("請填寫卡號"))
    }
    const regex = /^\d{4}$/
    if(!regex.test(value)) {
        callback(new Error("卡號須為4個數字!"))
    } else {
        callback()
    }
}


const validateCvvNumber = (rule, value, callback) => {
    if(!value) {
        callback(new Error("請輸入卡片後三碼"))
    }
    const regex = /^\d{3}$/
    if(!regex.test(value)) {
        callback(new Error("後三碼須為3個數字"))
    } else {
        callback()
    }
}

const creditCardRules = {
    cardHolderName: [{ required: true, message: '請填寫持卡人姓名', trigger: 'blur' }],
    cardNumber1: [{ validator: validateCardNumber, trigger: 'blur' }],
    cardNumber2: [{ validator: validateCardNumber, trigger: 'blur' }],
    cardNumber3: [{ validator: validateCardNumber, trigger: 'blur' }],
    cardNumber4: [{ validator: validateCardNumber, trigger: 'blur' }],
    expireMonth: [
        { required: true, message: '請填寫月份', trigger: 'blur' },
        { pattern: /^(0[1-9]|1[0-2])$/, message: '月份需為 01-12', trigger: 'blur' }
    ],
    expireYear: [
        { required: true, message: '請填寫年份', trigger: 'blur' },
        { pattern: /^\d{2}$/, message:"年份須為兩位數", trigger:"blur" }
    ],
    cvvNumber: [{ validator: validateCvvNumber, trigger: 'blur' }]
};

const nextStep = async( formEl ) => {
    if (!formEl) return;

    try {
        if (activeStep.value === 0) {
            await formEl.validateField(['name', 'address', 'phone', 'email']);
        }

        if (activeStep.value === 1) {
            const fieldsToValidate = ['delivery'];
            if (form.delivery === 'store pickup') {
                fieldsToValidate.push('pickupStore');
            }
            await formEl.validateField(fieldsToValidate);
        }

        if (activeStep.value === 2 && form.payment === "credit card") {
            await creditCardFormRef.value.validate();
        }
        return true

    } catch (err) {
        console.error("驗證失敗", err);
        return false;
    }
}

const createOrder = async() => {
    try {
        const res = await reqAddOrder({
            data: {
                user: {
                    name: form.name,
                    email: form.email,
                    tel: form.phone,
                    address: form.address,
                },
                message: form.message,
            }
        })
        if(res.success){
            orderId.value = res.orderId
            ElMessage({
                type:"success",
                message: res.message
            })

        } else {
            ElMessage({
                type:"error",
                message:res.message
            })
        }
    } catch(error) {
        console.error(error)
    }
}

const handleStepAction = async() => {
    if(activeStep.value === 0) {
        const valid = await nextStep(formRef.value)
        if(valid) {
            await createOrder()
            activeStep.value++;
        }
    } else if (activeStep.value === 1) {
        const valid = await nextStep(formRef.value)
        if(valid) {
            activeStep.value++;
        }
    } else if (activeStep.value === 2) {
        if (form.payment === 'atm transfer') {
            await submitPayment();
        } else {
            const valid = await nextStep(creditCardFormRef.value);
            if (valid) {
                await submitPayment();
            }
        }
    }
}

const prevStep = () => {
    if(activeStep.value > 0) {
        activeStep.value --
    } else {
        router.push("/cart")
    }
}

const submitPayment = async() => {
    try {
        const res = await reqAddPayment(orderId.value)
        if(res.success){
            ElMessage({
                type:"success",
                message: res.message
            })
            cartStore.clearCart()
            await router.push({ path: "/success", query: { orderId: orderId.value}})
        } else {
            ElMessage({
                type:"error",
                message: res.message
            })
        }
    } catch(error) {
        console.error(error);
    }
}

</script>

<template>
    <div class="container">
        <ElSteps style="" :active="activeStep" align-center>
            <ElStep title="Step 1" description="收件資訊" />
            <ElStep title="Step 2" description="配送方式" />
            <ElStep title="Step 3" description="付款資訊" />
        </ElSteps>

        <div class="step-content">
            <template v-if="activeStep === 0">
                <ElCard>
                    <h3>收件資訊</h3>
                    <ElForm :model="form" label-width="auto" :rules="rules" ref="formRef">
                        <ElFormItem label="收件人姓名" prop="name">
                            <ElInput v-model="form.name" placeholder="收件人姓名" />
                        </ElFormItem>
                        <ElFormItem label="收件地址" prop="address">
                            <ElInput v-model="form.address" placeholder="地址" />
                        </ElFormItem>
                        <ElFormItem label="連絡電話" prop="phone">
                            <ElInput v-model="form.phone" placeholder="0912345678"  />
                        </ElFormItem>
                        <ElFormItem label="Email" prop="email">
                            <ElInput v-model="form.email" placeholder="電子郵件"  />
                        </ElFormItem>
                        <ElFormItem label="想說的話">
                            <ElInput v-model="form.message" type="textarea"/>
                        </ElFormItem>
                    </ElForm>
                </ElCard>
            </template>

            <template v-else-if="activeStep === 1">
                <ElCard>
                    <ElForm :model="form" label-width="auto" :rules="rules" ref="formRef">
                        <ElFormItem label="寄送方式" prop="delivery">
                            <ElRadioGroup v-model="form.delivery">
                                <ElRadio label="宅配" value="home delivery">宅配</ElRadio>
                                <ElRadio label="超商取貨不付款" value="store pickup">全家取貨不付款</ElRadio>
                            </ElRadioGroup>
                        </ElFormItem>
                        <ElFormItem label="超商店名" prop="pickupStore" v-if="form.delivery === 'store pickup'">
                            <ElInput v-model="form.pickupStore" style="width:200px;"/>
                        </ElFormItem>
                    </ElForm>
                </ElCard>
            </template>

            <template v-else-if="activeStep === 2">
                <ElCard>
                    <ElForm label-width="100px" :model="form" :rules="rules">
                        <ElFormItem label="付款方式" prop="payment">
                            <ElRadioGroup v-model="form.payment">
                                <ElRadio label="信用卡" value="credit card">信用卡</ElRadio>
                                <ElRadio label="ATM轉帳" value="atm transfer">ATM轉帳</ElRadio>
                            </ElRadioGroup>
                        </ElFormItem>
                        <template v-if="form.payment === 'credit card'">
                            <ElForm :model="creditCardForm" label-width="100px" class="credit-card-info-wrapper" ref="creditCardFormRef" :rules="creditCardRules">
                                <ElFormItem label="持卡人姓名" class="card-holder-wrapper" prop="cardHolderName">
                                    <ElInput v-model="creditCardForm.cardHolderName" placeholder="持卡人姓名"/>
                                </ElFormItem>
                                <ElFormItem label="信用卡卡號" class="credit-card-grid-wrapper">
                                    <div class="credit-card-grid">
                                        <ElFormItem prop="cardNumber1" label-width="0">
                                            <ElInput v-model="creditCardForm.cardNumber1" placeholder="1234" maxlength="4" />
                                        </ElFormItem>
                                        <ElFormItem prop="cardNumber2" label-width="0">
                                            <ElInput v-model="creditCardForm.cardNumber2" placeholder="5678" maxlength="4" />
                                        </ElFormItem>
                                        <ElFormItem prop="cardNumber3" label-width="0">
                                            <ElInput v-model="creditCardForm.cardNumber3" placeholder="9012" maxlength="4" />
                                        </ElFormItem>
                                        <ElFormItem prop="cardNumber4" label-width="0">
                                            <ElInput v-model="creditCardForm.cardNumber4" placeholder="3456" maxlength="4" />
                                        </ElFormItem>
                                    </div>
                                </ElFormItem>
                                <div class="expire-date-wrapper">
                                    <ElFormItem label="到期月份" prop="expireMonth">
                                        <ElInput
                                            v-model="creditCardForm.expireMonth"
                                            placeholder="MM"
                                            maxlength="2"
                                        />
                                    </ElFormItem>
                                    <ElFormItem label="到期年份" prop="expireYear">
                                        <ElInput
                                            v-model="creditCardForm.expireYear"
                                            placeholder="YY"
                                            maxlength="2"
                                        />
                                    </ElFormItem>
                                </div>

                                <ElFormItem label="後三碼" class="cvv-wrapper" prop="cvvNumber">
                                    <ElInput v-model="creditCardForm.cvvNumber" placeholder="後三碼" maxlength="3" show-password/>
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
                            <ElCard>
                                <h6>注意事項：</h6>
                                <p>付款完成後須主動與客服人員聯繫，確認款項無誤後才會出貨</p>
                                <p>Email: support@if-jewelry.com</p>
                                <p>電話: 02-8765-4321</p>
                                <p>服務時間: 週一~週五 09:00 - 18:30</p>
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
            <template v-if="activeStep === 0">
                <ElButton type="primary" @click="handleStepAction">
                    建立訂單
                </ElButton>
            </template>
            <template v-else>
                <ElButton type="primary" @click="handleStepAction">
                    {{ activeStep === 2 ? "送出訂單" : "下一步" }}
                </ElButton>
            </template>
        </div>

        <ElCard>
            <ElCollapse >
                <ElCollapseItem class="order-info-container">
                    <template #title>
                        <h5>訂單摘要</h5>
                    </template>
                    <div v-for="item in cartStore.cartList" :key="item.id" class="product-wrapper">
                        <div class="image-wrapper">
                            <img :src="item.product.imagesUrl[0]" alt="product picture" />
                        </div>
                        <div class="info-wrapper">
                            <h5>{{ item.product.title }}</h5>
                            <p>NTD{{ item.product.price }} x {{item.qty}}</p>
                        </div>
                    </div>
                    <div class="final-info">
                        <h6>使用優惠券: {{cartStore.couponCode? cartStore.couponCode : " 無 "}}</h6>
                        <h6>總金額: {{Math.round(cartStore.cartData.final_total)}}</h6>
                    </div>
                </ElCollapseItem>
            </ElCollapse>
        </ElCard>
    </div>
</template>

<style scoped lang="scss">
.container {
    display: block;
    margin: $base-header-height auto;
    padding: 10px 20px;
    width: 100%;

    .el-steps {
        margin: 2rem auto;
        width: 100%;
    }

    .step-content {

        .el-form {
            margin-top: 10px;

            .credit-card-info-wrapper {
                .card-holder-wrapper, .cvv-wrapper {
                    width: 100%;
                    max-width: 320px;

                }

                .credit-card-grid {
                    display: grid;
                    gap: 1.2rem;

                    :deep(.el-form-item__content) {
                        flex: auto;
                    }
                }

                .expire-date-wrapper {
                    display: flex;
                    width: 100%;
                    flex-direction: column;

                    :deep(.el-form-item__content) {
                        gap: 5px;
                    }
                    :deep(.el-input) {
                        width: 150px;
                        gap: 5px;
                    }
                }
            }
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

        h6 {
            font-weight: bold;
            font-size: 1.1rem;
        }

    }

    .el-collapse {
        margin: 20px auto;
    }
}

.order-info-container {
    display: flex;
    flex-direction: column;

    :deep(.el-collapse-item__wrap) {
        border-bottom: none;

        .el-collapse-item__content {
            padding-bottom: 0;
        }
    }

    .product-wrapper {
        display: flex;
        flex-direction: row;

        .image-wrapper {
            min-width: 40px;
            max-width: 60px;
            width: 100%;
            aspect-ratio: 1/1;
            border: 1px solid whitesmoke;

            img {
                object-fit: cover;
            }
        }

        .info-wrapper {
            display: flex;
            flex-direction: column;
            width: 100%;
            padding: 0 10px;

            p {
                text-align: end;
                display: block;
                font-size: 0.8rem;
            }

        }
    }

    .final-info {
        margin: 10px 0;
        padding: 0 10px;
        text-align: end;
    }

}

@media (min-width: $breakpoint-tablet) {
    .container {
        max-width: 750px;

        .el-steps {
            max-width: 750px;
        }

        .credit-card-info-wrapper {
            .credit-card-grid {
                width: 100%;
                display: grid;
                grid-template-columns: repeat(2, 1fr);

                .el-form-item {
                    margin-bottom: 0;
                    width: auto;
                }
            }

            .expire-date-wrapper {
                display: flex;
                flex-direction: row !important;
                align-items: flex-start;

                :deep(.el-form-item__content) {
                    gap: 5px;
                }
            }
        }

    }
}

@media (min-width: $breakpoint-desktop) {
    .container {
        max-width: 1000px;

        .el-steps {
            max-width: 1000px;
        }

        .credit-card-info-wrapper {
            .credit-card-grid {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
            }
        }
    }
}
</style>