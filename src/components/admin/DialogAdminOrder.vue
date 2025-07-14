<script setup>
import { ref, reactive, computed } from "vue"
import {ElButton, ElDialog, ElForm, ElFormItem, ElDatePicker, ElDivider, ElRow, ElCol, ElMessage} from "element-plus"
import { reqEditOrder } from "@/api/admin/order.js";

const dialogVisible = ref(false)
const loading = ref(false)
const emit = defineEmits(['order-update'])
const form = reactive({
    create_at: "",
    is_paid: false,
    paid_date:"",
    message: "",
    products: {},
    total: 0,
    user: {
        name: '',
        email: '',
        tel: '',
        address: ''
    },
})

const productList = computed(() => {
    return Object.values(form.products)
})

const open = (row) => {
    Object.assign(form, {
        ...row,
        create_at: row.create_at*1000,
        paid_date: row.paid_date*1000
    })
    dialogVisible.value = true
}

const confirm = async() => {
    loading.value = true

    const payload = {
        ...form,
        create_at: form.create_at/1000,
        paid_date: form.paid_date/1000
    }

    try {
        const res = await reqEditOrder(payload)
        if(res.success) {
            ElMessage({
                type: "success",
                message: res.message
            })
            emit("order-update")
        } else {
            ElMessage({
                type:"error",
                message: res.message
            })
        }
    } catch(error) {
        console.error(error)
    } finally {
        dialogVisible.value = false
    }
}

defineExpose({ open })
</script>

<template>
    <ElDialog
        v-model="dialogVisible"
        width="1000px"
        align-center
        v-loading="loading"
    >
        <template #header>
            <h3>修改訂單</h3>
        </template>
        <ElForm :model="form" label-width="auto">
            <ElRow>
                <ElDivider content-position="left">訂單資訊</ElDivider>
                <ElCol :span="12">
                    <ElFormItem label="建立時間">
                        <ElDatePicker
                            v-model="form.create_at"
                            type="datetime"
                            placeholder="選擇建立時間"
                            format="YYYY-MM-DD HH:mm:ss"
                            value-format="x"
                            disabled
                        />
                    </ElFormItem>
                </ElCol>
                <ElCol :span="12">
                    <ElFormItem label="付款時間">
                        <ElDatePicker
                            v-model="form.paid_date"
                            type="datetime"
                            placeholder="選擇付款時間"
                            format="YYYY-MM-DD HH:mm:ss"
                            value-format="x"
                            :disabled="form.is_paid"
                        />
                    </ElFormItem>
                </ElCol>
                <ElCol :span="24">
                    <ElFormItem label="是否付款">
                        <ElSwitch v-model="form.is_paid" active-text="已付款" inactive-text="未付款" />
                    </ElFormItem>
                </ElCol>
                <ElCol :span="24">
                    <ElFormItem label="留言">
                        <ElInput v-model="form.message" type="textarea" disabled/>
                    </ElFormItem>
                </ElCol>
                <ElDivider content-position="left">用戶資料</ElDivider>
                <ElCol :span="12">
                    <ElFormItem label="姓名">
                        <ElInput v-model="form.user.name" disabled/>
                    </ElFormItem>
                </ElCol>
                <ElCol :span="12">
                    <ElFormItem label="電話">
                        <ElInput v-model="form.user.tel" />
                    </ElFormItem>
                </ElCol>
                <ElCol :span="24">
                    <ElFormItem label="Email">
                        <ElInput v-model="form.user.email" />
                    </ElFormItem>
                </ElCol>
                <ElCol :span="24">
                    <ElFormItem label="地址">
                        <ElInput v-model="form.user.address" />
                    </ElFormItem>
                </ElCol>
                <ElDivider content-position="left">商品明細</ElDivider>
                <ElTable :data="productList" border table-layout="auto">
                    <ElTableColumn label="商品名稱">
                        <template #default="scope">
                            {{ scope.row.product.title }}
                        </template>
                    </ElTableColumn>
                    <ElTableColumn label="單價" prop="product.price" align="center" width="1"/>
                    <ElTableColumn label="數量" prop="qty" width="1" align="center"/>
                    <ElTableColumn label="小計" width="1" align="center">
                        <template #default="scope">
                            {{ scope.row.total }}
                        </template>
                    </ElTableColumn>
                    <ElTableColumn label="折扣後" width="1" align="center">
                        <template #default="scope">
                            {{ scope.row.final_total }}
                        </template>
                    </ElTableColumn>
                    <ElTableColumn label="優惠券" width="1" align="center">
                        <template #default="scope">
                            <span v-if="scope.row.coupon">{{ scope.row.coupon.code }} ({{ scope.row.coupon.percent }}%)</span>
                            <span v-else>無</span>
                        </template>
                    </ElTableColumn>
                </ElTable>

            <ElFormItem label="總金額" style="margin-top: 16px;">
                <ElInput v-model="form.total" disabled />
            </ElFormItem>
            </ElRow>
        </ElForm>
        <template #footer>
            <div class="dialog-footer">
                <ElButton @click="dialogVisible = false">關閉</ElButton>
                <ElButton type="primary" @click="confirm">
                    確認
                </ElButton>
            </div>
        </template>
    </ElDialog>

</template>

<style scoped lang="scss">
:deep(.cell) {
    white-space: nowrap;
}
</style>