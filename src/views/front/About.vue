<script setup lang="ts">
</script>

<template>
  <div class="wrapper">
    <section class="first">
      <div class="image-wrapper">
        <img
          src="https://images.unsplash.com/photo-1504194104404-433180773017?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="picture"
        />
      </div>
      <div class="text-wrapper">
        <h4>如果珠寶 If Jewelry</h4>
        <p>
          如果珠寶（If
          Jewelry）成立於一個充滿創意和夢想的城市，以獨特的設計理念和卓越的工藝技術著稱。我們的故事始於對珠寶藝術的熱愛和對生活中「如果」這個字的思考。每一件珠寶都承載著一個「如果」的故事，象徵著人們對未來的期許與想像。
        </p>
        <p>
          我們對珠寶充滿著熱情，相信每一件珠寶都有講述故事的力量，這些故事源於設計師的靈感和每位佩戴者的獨特經歷。「如果」這個字代表著無限的可能性，它鼓勵人們去探索、去追求夢想、去創造未來。
        </p>
      </div>
    </section>
    <section class="second">
      <div class="image-wrapper">
        <img
          src="https://images.unsplash.com/photo-1532039956299-1614b86a6d2f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="picture"
        />
      </div>
      <div class="text-wrapper">
        <h4>我們的堅持</h4>
        <p>
          如果珠寶（If
          Jewelry）的設計靈感來自於大自然的奇妙和人類情感的深刻。我們堅持選用最優質的材料，並結合現代科技與傳統手工藝，為顧客創造出獨一無二且富有意義的珠寶作品。我們的珠寶不僅是裝飾品，更是一種情感的寄託與表達。
        </p>
        <p>
          每一位佩戴如果珠寶的顧客都是我們故事的一部分，他們的生活因這些珠寶而更加璀璨。無論是紀念一個重要的時刻，還是象徵一段特殊的關係，我們的珠寶都能讓人感受到那份珍貴與獨特。
        </p>
        <p>
          如果珠寶（If
          Jewelry）將繼續以「如果」為靈感，致力於創造更多富有情感和故事的珠寶作品，陪伴每一位追尋夢想、珍視生活的顧客。
        </p>
      </div>
    </section>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  margin: 0 auto;
  padding: 0.5rem 1rem;

  .image-wrapper,
  .text-wrapper {
    padding: 0.5rem;
  }

  .text-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}

@media (min-width: $breakpoint-tablet) {
  .wrapper {
    margin: 0 50px;
  }
}

@media (min-width: $breakpoint-desktop) {
  .wrapper {
    margin: 0 150px;

    section {
      display: flex;
      flex-direction: row;
      align-items: center;

      &.second {
        flex-direction: row-reverse;
      }
    }
    .image-wrapper {
      width: 100%;
      max-width: 500px;
      min-width: 350px;
      margin: 0 auto;
    }
  }
}
</style>
