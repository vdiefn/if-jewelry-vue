<script setup lang="ts">
import { ContentContainer } from "@/components/front/index.js";
import { useRoute } from "vue-router";
import { ref, onMounted, watch } from "vue";
import { reqArticle } from "@/api/front/article.js";
import { ElBreadcrumb, ElBreadcrumbItem, ElBacktop, ElTag } from "element-plus";
import type { ArticleData } from "@/types/front/article";

type TagType = "primary" | "success" | "info" | "warning" | "danger";

const route = useRoute();
const data = ref<ArticleData>();
const loading = ref(false);
const type: TagType[] = ["primary", "success", "info", "warning", "danger"];

const getType = (index: number): TagType => {
  return type[index % type.length];
};

const getArticle = async () => {
  loading.value = true;
  try {
    const res = await reqArticle(route.params.id as string);
    console.log(res);
    if (res.data.success) {
      data.value = res.data.article;
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

watch(
  () => route.params.id,
  () => {
    getArticle();
  }
);

onMounted(() => {
  getArticle();
});
</script>

<template>
  <ContentContainer>
    <ElBreadcrumb separator="/">
      <ElBreadcrumbItem :to="{ path: '/' }"
        ><font-awesome-icon :icon="['fas', 'house']"
      /></ElBreadcrumbItem>
      <ElBreadcrumbItem :to="{ path: '/jewelryStory' }"
        >寶石小教室</ElBreadcrumbItem
      >
      <ElBreadcrumbItem>{{ data?.title }}</ElBreadcrumbItem>
    </ElBreadcrumb>
    <div class="story-wrapper" v-loading="loading">
      <div class="img-wrapper">
        <img :src="data?.image" alt="story picture" />
      </div>
      <div class="text-wrapper">
        <div class="title-wrapper">
          <h4>{{ data?.title }}</h4>
          <div class="tag-wrapper">
            <ElTag
              v-for="(item, index) in data?.tag"
              :key="index"
              effect="plain"
              round
              :type="getType(Number(index))"
            >
              {{ item }}
            </ElTag>
          </div>
        </div>
        <h6>{{ data?.description }}</h6>
        <p>{{ data?.content }}</p>
      </div>
    </div>
    <ElBacktop :right="20" :bottom="70" />
  </ContentContainer>
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

      .tag-wrapper {
        align-self: flex-end;
        display: flex;
        gap: 3px;
      }
    }
  }
}

@media (min-width: $breakpoint-tablet) {
  .el-breadcrumb {
    width: 100%;
  }
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
</style>
