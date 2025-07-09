<script setup>
import { DefaultContainer } from "@/components/front/index.js";
import { useRoute } from "vue-router"
import { ref, onMounted, watch } from "vue";
import { reqArticle } from "@/api/front/article.js"
import { ElBreadcrumb, ElBreadcrumbItem, ElBacktop } from "element-plus";

const route = useRoute()
const data = ref()
const loading = ref(false)

const getArticle = async() => {
    loading.value = true
    try {
        const res = await reqArticle(route.params.id)
        if(res.success){
            data.value = res.article
        }
    } catch(error){
        console.error(error)
    } finally {
        loading.value = false
    }
}

watch(()=>route.params.id, (value) => {
    getArticle()
})

onMounted(() => {
    getArticle()
})

</script>

<template>
<DefaultContainer>
    <ElBreadcrumb separator="/">
        <ElBreadcrumbItem :to="{ path: '/' }"><font-awesome-icon :icon="['fas', 'house']" /></ElBreadcrumbItem>
        <ElBreadcrumbItem :to="{ path: '/jewelryStory'}">寶石小教室</ElBreadcrumbItem>
        <ElBreadcrumbItem>{{ data?.title }}</ElBreadcrumbItem>
    </ElBreadcrumb>
    <div class="story-wrapper" v-loading="loading">
        <div class="img-wrapper">
            <img :src="data?.image" alt="story picture" />
        </div>
        <div class="text-wrapper">
            <h4>{{data?.title}}</h4>
            <h6>{{data?.description}}</h6>
            <p>{{data?.content}}</p>
        </div>
    </div>
    <ElBacktop :right="100" :bottom="100" />

</DefaultContainer>
</template>

<style scoped lang="scss">
.el-breadcrumb {
    padding: 1rem;
}


.story-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;

    .text-wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
        padding: 1rem;
    }
}

@media(min-width: $breakpoint-tablet){
    .el-breadcrumb, .story-wrapper {
        margin: 0 auto;
    }

    .el-breadcrumb {
        width: 850px;
    }

    .story-wrapper {
        width: 650px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        .img-wrapper {
            padding: 1rem;
        }

    }
}

@media(min-width: $breakpoint-desktop){
    .el-breadcrumb {
        width: 900px;
    }

    .story-wrapper {
        width: 900px;
    }
}

</style>