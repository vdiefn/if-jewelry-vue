<script setup lang="ts">
import { ref, onMounted, useTemplateRef } from "vue";
import { reqArticles, reqDeleteArticle, reqArticle } from "@/api/admin/article"
import { ElButton, ElCard, ElMessage, ElMessageBox } from "element-plus"
import { Edit, Delete } from "@element-plus/icons-vue";
import { DialogAdminArticle } from "@/components/admin";
import type { ArticleData } from "@/types/admin/article";
import type { Pagination } from "@/types/admin/coupon"

const loading = ref(false)
const data = ref<ArticleData[]>([])
const pagination = ref<Pagination>()
const currentPage = ref(1)
const totalPages = ref(1)
const dialogAdminArticleRef = useTemplateRef<InstanceType<typeof DialogAdminArticle>>("dialogAdminArticleRef")

const getAllArticles = async() => {
    loading.value = true

    try {
        const res = await reqArticles({ page: currentPage.value })
        if(res.data.success) {
            data.value = res.data.articles
            pagination.value = res.data.pagination
            currentPage.value = res.data.pagination.current_page
            totalPages.value = res.data.pagination.total_pages
        }
    } catch(err) {
        console.error(err)
    } finally {
        loading.value = false
    }
}

const addNewArticle = async() => {
    if(dialogAdminArticleRef.value){
        dialogAdminArticleRef.value.open()
    }
}

const editArticle = async(row:ArticleData) => {
    try {
        const res = await reqArticle(row.id)
        if(res.data.success){
            dialogAdminArticleRef.value?.open(res.data.article)
        }
    } catch(error){
        console.error(error)
    }
}

const deleteArticle = async(row:ArticleData) => {
    await ElMessageBox.confirm(`請確認是否刪除文章：${row.title}`, "Warning", {
        confirmButtonText: "確認",
        cancelButtonText: "取消",
        type: "warning",
        beforeClose: async (action, instance, done) => {
            if (action !== "confirm") return done()
            instance.confirmButtonLoading = true;
            try {
                const res = await reqDeleteArticle(row.id)
                if (res.data.success) {
                    ElMessage({ type: "success", message: res.data.message });
                    done()
                    await getAllArticles();
                } else {
                    ElMessage({ type: "error", message: res.data.message });
                    done()
                }
            } catch (error) {
                console.error(error);
                ElMessage({ type: "error", message: "刪除失敗" });
                done()
            } finally {
                instance.confirmButtonLoading = false;
            }
        },
    });
}

onMounted(() => {
    getAllArticles()
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
                table-layout="auto"
            >
                <ElTableColumn label="建立日期" prop="create_at">
                    <template #default="{row}">
                        {{ new Date(row.create_at * 1000).toLocaleDateString().slice(0, 10) }}
                    </template>
                </ElTableColumn>
                <ElTableColumn label="作者" prop="author" />
                <ElTableColumn label="文章名稱" prop="title" />
                <ElTableColumn label="標籤" prop="tag">
                    <template #default="{row}">
                        <ElTag v-for="(item ,index) in row.tag" :key="index" effect="plain" class="tag">
                            {{item}}
                        </ElTag>
                    </template>
                </ElTableColumn>
                <ElTableColumn label="是否公開" prop="isPublic" align="center">
                    <template #default="{ row }">
                        <ElIcon v-if="row.isPublic" class="check-icon">
                            <font-awesome-icon :icon="['fas', 'check']" />
                        </ElIcon>
                        <ElIcon v-else class="x-icon">
                            <font-awesome-icon :icon="['fas', 'xmark']" />
                        </ElIcon>
                    </template>
                </ElTableColumn>
                <ElTableColumn width="1">
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
    <DialogAdminArticle ref="dialogAdminArticleRef" @article-update="getAllArticles"/>
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
        :deep(.cell) {
            white-space: nowrap;
        }

        .tag {
            margin-right: 5px;
        }

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