<script setup>
import { ref, onMounted } from 'vue';
import { DefaultContainer } from "@/components/front/index.js";
import { reqAllArticles } from "@/api/front/article.js"
import { useRouter } from "vue-router";

const data = ref()
const router = useRouter();
const loading = ref(false);

const getAllArticles = async() => {
    loading.value = true;
    try {
        const res = await reqAllArticles();
        if(res.success) {
            data.value = res.articles
        } else {

        }
    } catch(error) {
        console.error(error);
    } finally {
        loading.value = false;
    }
}

const goToArticle = (id) => {
    router.push(`/jewelryStory/${id}`)
}

onMounted(() => {
    getAllArticles()
})
</script>

<template>
    <DefaultContainer>
        <div class="outer-container">
            <h3>寶石小教室</h3>

            <div class="story-wrapper" v-for="item in data" :key="item.id" v-loading="loading">
                <div class="img-wrapper">
                    <img :src="item.image" alt="story picture" />
                </div>
                <div class="text-wrapper">
                    <h5>{{item.title}}</h5>
                    <p>{{item.description}}</p>
                    <small class="read-more" @click="goToArticle(item.id)">READ MORE</small>
                </div>
            </div>
        </div>

    </DefaultContainer>
</template>

<style scoped lang="scss">
.outer-container {
    margin: 0 auto;
    width: 100%;
    padding: 10px;

    .story-wrapper {
        margin-top: 1rem;

        .text-wrapper {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: 5px;
            padding: 10px;

            .read-more {
                align-self: flex-end;
                color: $base-primary-color;
                cursor: pointer;
                font-size: 12px;
                transition: color 0.2s;
            }
        }
    }
}

@media(min-width: $breakpoint-tablet){
    .outer-container {
        width: 650px;
    }
}

@media(min-width: $breakpoint-desktop){
    .outer-container {
        width: 900px;

        .story-wrapper {
            display: flex;
        }
    }
}
</style>