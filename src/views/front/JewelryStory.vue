<script setup lang="ts">
import { ref, onMounted } from "vue";
import { DefaultContainer } from "@/components/front/index.js";
import { reqAllArticles } from "@/api/front/article.js";
import { useRouter } from "vue-router";
import { ElCard, ElTag, ElMessage } from "element-plus";

type TagType = "primary" | "success" | "info" | "warning" | "danger";

const data = ref();
const router = useRouter();
const loading = ref(false);
const type: TagType[] = ["primary", "success", "info", "warning", "danger"];

const getType = (index: number): TagType => {
  return type[index % type.length];
};

const getAllArticles = async () => {
  loading.value = true;
  try {
    const res = await reqAllArticles();
    if (res.data.success) {
      data.value = res.data.articles;
    } else {
      ElMessage({
        type: "error",
        message: "res.message",
      });
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const goToArticle = (id: string) => {
  router.push(`/jewelryStory/${id}`);
};

onMounted(() => {
  getAllArticles();
});
</script>

<template>
  <DefaultContainer>
    <div class="outer-container">
      <h3>寶石小教室</h3>
      <ElCard
        v-for="item in data"
        :key="item.id"
        v-loading="loading"
        shadow="hover"
      >
        <div class="story-wrapper">
          <div class="title-wrapper">
            <h5>{{ item.title }}</h5>
            <div class="tag-wrapper">
              <ElTag
                v-for="(i, index) in item.tag"
                :key="index"
                effect="plain"
                round
                size="small"
                :type="getType(Number(index))"
              >
                {{ i }}
              </ElTag>
            </div>
          </div>
          <p>{{ item.description.slice(0, 50) }} ......</p>
          <span class="read-more" @click="goToArticle(item.id)">READ MORE</span>
        </div>
      </ElCard>
    </div>
  </DefaultContainer>
</template>

<style scoped lang="scss">
.outer-container {
  margin: 0 auto;
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;

  h3 {
    margin-top: 10px;
  }

  .el-card {
    --el-card-padding: 3px 5px;
  }

  .story-wrapper {
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    padding: 10px;

    .title-wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 5px;
      margin-bottom: 10px;

      h5 {
        font-weight: bold;
      }

      .tag-wrapper {
        align-self: flex-end;
        display: flex;
        gap: 3px;
      }
    }

    .read-more {
      margin-left: auto;
      color: $base-primary-color;
      cursor: pointer;
      font-size: 10px;
      transition: color 0.2s;
    }
  }
}

@media (min-width: $breakpoint-tablet) {
  .outer-container {
    width: 650px;

    .story-wrapper {
      .title-wrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        h5 {
          font-weight: bold;
        }

        .tag-wrapper {
          display: flex;
          gap: 5px;
        }
      }
    }
  }
}

@media (min-width: $breakpoint-desktop) {
  .outer-container {
    width: 900px;

    .story-wrapper {
      display: flex;

      .img-wrapper {
        width: 450px;
        aspect-ratio: 1/1;
      }
    }
  }
}
</style>
