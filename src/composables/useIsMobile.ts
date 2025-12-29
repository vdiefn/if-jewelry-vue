import { ref, onMounted } from "vue";

export const useIsMobile = () => {
  const isMobile = ref(window.innerWidth <= 768);

  const check = () => {
    isMobile.value = window.innerWidth <= 768;
  };

  onMounted(() => {
    window.addEventListener("resize", check);
  });

  return { isMobile };
};
