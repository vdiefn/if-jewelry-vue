<script setup>
import { DefaultContainer } from "@/components/front/index.js";
import { useRoute } from "vue-router"
import { ref, onMounted, watch } from "vue";
import { reqArticle } from "@/api/front/article.js"
import { ElBreadcrumb, ElBreadcrumbItem, ElBacktop, ElTag } from "element-plus";

const route = useRoute()
const data = ref()
const loading = ref(false)

const getType = (index) => {
    const type = ["primary", "success", "info", "warning", "danger"]
    return type[index%5]
}

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
            <div class="title-wrapper">
                <h4>{{data?.title}}</h4>
                <div class="tag-wrapper">
                    <ElTag v-for="(item, index) in data?.tag" :key="index" effect="plain" round :type="getType(index)">
                        {{ item }}
                    </ElTag>
                </div>
            </div>
            <h6>{{data?.description}}</h6>
            <p>{{data?.content}}</p>
        </div>
    </div>
    <ElBacktop :right="20" :bottom="70" />

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
    margin: 1rem auto;

    .text-wrapper {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        white-space: pre-line;
        word-break: break-word;
        gap: 10px;
        margin: 1rem;
        padding: 1rem;

        .title-wrapper {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 5px;
            margin-bottom: 10px;

            .tag-wrapper{
                align-self: flex-end;
                display: flex;
                gap: 3px;
            }
        }

        h6 {
            width: 100%;
        }
    }


}

@media(min-width: $breakpoint-tablet){
    .el-breadcrumb, .story-wrapper {
        margin: 0 auto;
    }

    .el-breadcrumb {
        width: 100%;
    }

    .story-wrapper {
        width: 650px;
        margin: 0 auto;

        .title-wrapper {

            h4 {
                flex: 0 1 auto;
                font-weight: bold;
            }

            .tag-wrapper {
                display: flex;
                gap: 5px;
            }
        }

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