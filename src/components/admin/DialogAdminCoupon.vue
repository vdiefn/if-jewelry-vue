<script setup>
import { ref, reactive } from 'vue';
import { ElDialog, ElButton, ElForm, ElFormItem, ElInput, ElDatePicker, ElRow, ElCol, ElMessage } from "element-plus"
import { reqAddNewCoupon, reqEditCoupon } from "@/api/admin/coupon.js"

const dialogVisible = ref(false)
const loading = ref(false)
const isEdit = ref(false)
const emit = defineEmits(["coupon-added"])
const initialForm = {
    id:"",
    title:"",
    is_enabled: true,
    percent: 0,
    due_date: Date.now(),
    code: ""
}
const form = reactive({ ...initialForm });

const shortcuts = [
    {
        text: '今日',
        value: new Date(),
    },
    {
        text: '明日',
        value: () => {
        const date = new Date()
        date.setTime(date.getTime() + 3600 * 1000 * 24)
        return date
        },
    },
    {
        text: '下週',
        value: () => {
        const date = new Date()
        date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
        return date
        },
    },
    {
        text: '下個月',
        value: () => {
        const date = new Date()
        date.setTime(date.getTime() + 3600 * 1000 * 24 * 7 * 4)
        return date
        },
    },
]

const open = (row) => {
    isEdit.value = false
    Object.assign(form, initialForm)
    if(row) {
        Object.assign(form, row)
        form.is_enabled = row.is_enabled === 1
        form.due_date = row.due_date * 1000
        isEdit.value = true
    }
    dialogVisible.value = true
}

const confirm = async() => {
    loading.value = true

    let payload = {
        ...form,
        is_enabled: form.is_enabled ? 1 : 0,
        percent: Number(form.percent),
        due_date: Math.floor(form.due_date / 1000),
    }

    try{
        const res = isEdit.value ? await reqEditCoupon(payload) :await reqAddNewCoupon(payload)
        if(res.success) {
            ElMessage({ type: "success", message: res.message })
            dialogVisible.value = false
            emit("coupon-added")
        } else {
            ElMessage({ type: "error", message: res.message })
        }
    } catch(error){
        console.error(error)
        const msg = error?.response?.data?.message || "操作失敗";
        ElMessage({ type: "error", message: msg });
    } finally {
        loading.value = false
    }
}

const disabledDate = (time) => {
    return time.getTime() < Date.now()
}

defineExpose({ open })

</script>

<template>
    <ElDialog
        v-model="dialogVisible"
        width="800"
    >
        <template #header>
            <h3>{{isEdit? "修改折價券" : "新增折價券"}}</h3>
        </template>
        <ElForm label-width="auto" :model="form">
            <ElRow :gutter="20">
                <ElCol :span="24">
                    <ElFormItem label="標題" label-position="left">
                        <ElInput placeholder="請輸入優惠券標題" v-model="form.title" />
                    </ElFormItem>
                </ElCol>
                <ElCol :span="12">
                    <ElFormItem label="折扣(%)" label-position="left">
                        <ElInput placeholder="請輸入優惠券折扣(%)" type="number" v-model="form.percent" />
                    </ElFormItem>
                </ElCol>
                <ElCol :span="12">
                    <ElFormItem label="優惠碼" label-position="left">
                        <ElInput placeholder="請輸入優惠碼" v-model="form.code" />
                    </ElFormItem>
                </ElCol>
                <ElCol :span="12">
                    <ElFormItem label="到期日" label-position="left">
                        <ElDatePicker
                            type="date"
                            placeholder="請選擇到期日期"
                            :disabled-date="disabledDate"
                            :shortcuts="shortcuts"
                            v-model="form.due_date"
                            format="YYYY/MM/DD"
                            value-format="x"
                        />
                    </ElFormItem>
                </ElCol>
                <ElFormItem label="是否啟用">
                    <ElSwitch v-model="form.is_enabled" />
                </ElFormItem>
            </ElRow>
        </ElForm>

        <template #footer>
        <div class="dialog-footer">
            <ElButton @click="dialogVisible = false">取消</ElButton>
            <ElButton type="primary" @click=confirm>
                確認
            </ElButton>
        </div>
        </template>
  </ElDialog>
</template>

<style scoped lang="scss">
.demo-date-picker {
  display: flex;
  width: 100%;
  padding: 0;
  flex-wrap: wrap;
}

.demo-date-picker .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  flex: 1;
}

.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>