<template>
  <div class="h-screen w-screen overflow-x-hidden no-scrollbar">
    <div
      class="size-full min-h-fit bg-black overflow-hidden isolate relative flex items-center overflow-x-hidden"
    >
      <div class="absolute inset-0 -z-10 bgRadial" />
      <div class="w-full h-fit min-h-fit text-[#F3F3F3]">
        <div class="p-6 size-full flex flex-col gap-6 items-center">
          <div class="md:max-w-[856px]">
            <video
              autoplay
              loop
              muted
              class="object-cover w-[300px] h-[230px] sm:h-auto sm:w-auto sm:aspect-video rounded-xl shadow-[0px_12px_120px_0px_rgba(128,128,236,0.20)]"
              src="../public/video/intro.mov"
            />
          </div>
          <h1
            class="w-[60%] text-[#F3F3F3] font-semibold text-2xl sm:text-3xl lg:text-[40px] text-center"
          >
            Join the exclusive waitlist to try the AI we cooked for your study
            abroad dream!
          </h1>
          <button
            @click="navigateTo('/signup')"
            class="text-[#F3F3F3] font-semibold bg-[#8380FF] rounded-lg p-3"
          >
            Sign up for waitlist
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const height = ref<number>(0);

const windowHeight = computed(() => {
  return height.value > 830;
});

const windowSize = () => {
  if (typeof window !== "undefined") {
    height.value = window.innerHeight;
  }
};

onMounted(() => {
  windowSize();
  window.addEventListener("resize", windowSize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", windowSize);
});
</script>
<style scoped>
.bgRadial {
  background: radial-gradient(
      88.44% 88.44% at 50% 141.23%,
      #3936b2 17.18%,
      rgba(57, 54, 178, 0) 100%
    ),
    radial-gradient(
      97.99% 85.4% at 50% -25.14%,
      rgba(99, 95, 237, 0.3) 0%,
      rgba(26, 26, 26, 0.3) 76.45%
    );
}
</style>
