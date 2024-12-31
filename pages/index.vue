<template>
  <div class="h-[100dvh] w-screen overflow-x-hidden no-scrollbar">
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
              playsinline
              class="object-cover w-[400px] h-[230px] sm:h-auto sm:w-auto sm:aspect-video rounded-xl shadow-[0px_12px_120px_0px_rgba(128,128,236,0.20)]"
              src="../public/video/intro.mp4"
              poster="../public/images/waitlist flow 1.png"
            />
          </div>
          <h1
            class="md:w-[60%] text-[#F3F3F3] font-semibold text-2xl sm:text-3xl lg:text-[40px] text-center"
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
