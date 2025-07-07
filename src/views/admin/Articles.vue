<script setup>
import { ref, onMounted, useTemplateRef } from "vue";
import { reqArticles } from "@/api/admin/article"
import {ElButton, ElCard} from "element-plus"
import { Edit, Delete } from "@element-plus/icons-vue";
import { DialogAdminArticle } from "@/components/admin";

const loading = ref(false)
const data = ref()
const pagination = ref()
const currentPage = ref(1)
const totalPages = ref(1)
const dialogAdminArticleRef = useTemplateRef("dialogAdminArticleRef")

const getArticles = async() => {
    loading.value = true

    try {
        const res = await reqArticles()
        if(res.success) {
            data.value = res.articles
            pagination.value = res.pagination
            currentPage.value = res.pagination.current_page
            totalPages.value = res.pagination.total_pages
        }
    } catch(errpr) {
        console.error(errpr)
    } finally {
        loading.value = false
    }
}

const addNewArticle = async() => {
    dialogAdminArticleRef.value.open()
}

const editArticle = async() => {
    loading.value = true
}

const deleteArticle = async() => {
    loading.value = true
}

onMounted(() => {
    getArticles()
})
</script>

<template>
    <ElCard class="card">
        <div class="top-area">
            <h3>文章列表</h3>
            <ElButton type="primary" @click="addNewArticle">
                新增文章
            </ElButton>
        </div>
        <div class="content-area">
            <ElTable
                :stripe="true"
                v-loading="loading"
                style="height: 100%"
                :data="data"
            >
                <ElTableColumn label="建立日期" prop="create_at">
                    <template #default="{row}">
                        {{ new Date(row.due_date * 1000).toISOString().slice(0, 10) }}
                    </template>
                </ElTableColumn>
                <ElTableColumn label="作者" prop="author"></ElTableColumn>
                <ElTableColumn label="文章名稱" prop="title"></ElTableColumn>
                <ElTableColumn label="標籤" prop="tag">
                    <template #default="{row}">
                        <ElTag v-for="(item ,index) in row.tag" :key="index" effect="light">{{item}}</ElTag>
                    </template>
                </ElTableColumn>
                <ElTableColumn>
                    <template #default="{ row }">
                        <ElButton
                            :icon="Edit"
                            size="small"
                            @click="editArticle(row)"
                        />
                        <ElButton
                            :icon="Delete"
                            type="danger"
                            size="small"
                            @click="deleteArticle(row)"
                        />
                    </template>
                </ElTableColumn>
            </ElTable>
        </div>
        <div class="bottom-area">
            <ElPagination
                class="pagination"
                v-model:current-page="currentPage"
                layout="prev, pager, next, jumper"
                :page-count="totalPages"
            />
        </div>
    </ElCard>
    <DialogAdminArticle ref="dialogAdminArticleRef" />
</template>

<style scoped lang="scss">
.card {
    height: 100%;

    .top-area {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;

        :deep(.el-input),
        :deep(.el-select) {
            width: 200px;
        }

        .top-left {
            display: flex;
            gap: 5px;
        }
    }

    .content-area {
        .check-icon {
            color: green;
        }

        .x-icon {
            color: red;
        }
    }

    .bottom-area {
        display: flex;
        justify-content: center;
        margin-top: 3rem;
    }
}
</style>