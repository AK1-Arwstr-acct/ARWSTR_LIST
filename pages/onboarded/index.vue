<template>
  <div class="h-[100dvh] w-[100dvw] overflow-x-hidden no-scrollbar">
    <div class="size-full bg-[#1A1A1A] overflow-hidden text-center relative">
      <div class="backShadowsTop absolute inset-0 bgAnimateTop" />
      <div class="backShadowsBottom absolute inset-0 bgAnimateBottom" />
      <!-- part one -->
      <div
        :class="{ 'slide-up-fade': timer }"
        class="absolute inset-0 size-full flex flex-col justify-center items-center gap-10 slide-up transform translate-y-1/4 opacity-0 overflow-auto no-scrollbar"
      >
        <div class="flex flex-col justify-center items-center h-max">
          <IconArrowster />
          <h1 class="text-[#F3F3F3] font-semibold text-3xl md:text-5xl px-5">
            Make study abroad accessible to all. Here's the only AI Roadmap you
            need to go study abroad.
          </h1>
        </div>
      </div>
      <!-- part two -->
      <div
        class="size-full slide-up delay-2 transform translate-y-1/4 opacity-0 flex items-center overflow-auto no-scrollbar"
      >
        <div
          class="flex flex-col justify-center items-center gap-6 lg:gap-8 h-max px-5 mx-auto text-[#F3F3F3]"
        >
          <div class="flex flex-col items-center">
            <IconArrowster />
            <h1 class="font-semibold text-5xl lg:text-[72px] md:leading-[80px]">
              <span class="text-[#8380FF]">You’re on the</span> Waitlist
            </h1>
          </div>
          <p
            class="text-xl md:text-[32px] lg:text-[40px] leading-[28px] md:leading-[38px] lg:leading-[48px]"
          >
            We'll contact you immediately for this exclusive trial!
          </p>
          <div
            class="font-semibold text-xl flex flex-col-reverse md:flex-row gap-2 text-[#F3F3F3] w-full md:w-auto"
          >
            <a
              href="https://arrowster.com/"
              class="py-3 px-3.5 bg-[#8380FF] rounded-lg w-full md:w-max text-nowrap"
              target="_blank"
              >Join our mentorship program
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({
  middleware: "access",
});

const timer = ref<boolean>(false);

onMounted(() => {
  setTimeout(() => {
    timer.value = true;
  }, 5000);
});
</script>
<style scoped>
.backShadowsTop {
  background: radial-gradient(
    circle at 50% -10%,
    hsl(241, 100%, 75%, 0.6),
    transparent 50%
  );
}
.backShadowsBottom {
  background: radial-gradient(
    circle at 50% 110%,
    hsl(241, 100%, 75%, 0.6),
    transparent 50%
  );
}

.bgAnimateTop {
  animation: topMove 0.8s ease-in-out forwards;
}
.bgAnimateBottom {
  animation: BottomMove 0.8s ease-in-out forwards;
}

@keyframes topMove {
  from {
    transform: translateY(-50%);
  }
  to {
    transform: translateY(0%);
  }
}
@keyframes BottomMove {
  from {
    transform: translateY(50%);
  }
  to {
    transform: translateY(0%);
  }
}

@keyframes slideUp {
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slideUpFade {
  0% {
    transform: translateY(0);
    opacity: 1;
  }

  100% {
    transform: translateY(-25%);
    opacity: 0;
  }
}

.slide-up {
  animation: slideUp 0.8s ease-in-out forwards;
}

.slide-up-fade {
  animation: slideUpFade 0.8s ease-in-out forwards;
}

.delay-2 {
  animation-delay: 5.6s;
}
</style>
