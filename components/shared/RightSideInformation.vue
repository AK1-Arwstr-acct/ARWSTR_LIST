<template>
  <div
    class="bgRadical relative bg-[#211F7A] h-full overflow-hidden flex justify-center items-center"
  >
    <NuxtImg
      src="/images/shared/radial-image.png"
      class="absolute inset-0 object-bottom object-cover size-full"
    />
    <!-- <div
    class="bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-[rgba(149,126,255)] via-[#6240FF] to-[#14125C] h-full overflow-hidden flex justify-center items-center"
  > -->
    <div
      class="relative z-10 flex justify-center items-center gap-8 w-full p-12"
    >
      <div class="flex flex-col gap-6 w-full">
        <div class="flex items-center gap-3 w-full pr-10">
          <div
            class="p-3 flex items-center gap-3 bg-[#211F7A] border border-white w-full rounded-2xl"
          >
            <div
              class="h-[104px] min-w-[104px] rounded-xl bg-[#D3A921] flex justify-center items-center"
            >
              <IconClock :themeDark="true" />
            </div>
            <div>
              <h1
                class="text-xl sm:text-[32px] sm:leading-[40px] text-[#FEE75C] font-semibold mb-1 leading-5"
              >
                Save 20+ Hours
              </h1>
              <p class="text-[#FAFAFA] font-medium leading-5 text-xl">
                {{ "Find your best-fit college in <5 min" }}
              </p>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-3 self-end w-full pl-10">
          <div
            class="p-3 flex items-center gap-3 bg-[#211F7A] border border-white w-full rounded-2xl"
          >
            <div
              class="h-[104px] min-w-[104px] rounded-xl bg-[#2AD6B8] flex justify-center items-center"
            >
              <IconPercentage :themeDark="true" />
            </div>
            <div class="py-[10px]">
              <h1
                class="text-xl sm:text-[32px] sm:leading-[40px] text-[#8DFFEB] font-semibold mb-1 leading-5"
              >
                95% Perfect Match
              </h1>
              <p class="text-[#FAFAFA] font-medium leading-5 text-xl">
                AI that actually works
              </p>
            </div>
          </div>
        </div>
        <div class="flex items-center gap-3 w-full pr-10">
          <div
            class="p-3 flex items-center gap-3 bg-[#211F7A] border border-white w-full rounded-2xl"
          >
            <div
              class="h-[104px] min-w-[104px] rounded-xl bg-[#F9656B] flex justify-center items-center"
            >
              <IconUser :themeDark="true" />
            </div>
            <div>
              <h1
                class="text-xl sm:text-[32px] sm:leading-[40px] text-[#F9656B] font-semibold mb-1 leading-5"
              >
                Deep Dives
              </h1>
              <p class="text-[#FAFAFA] font-medium leading-5 text-xl">
                Personal analysis of your profile
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- <style scoped>
.bgRadical{
  background: radial-gradient(118.74% 117.1% at 74.31% 20.12%, #211F7A 73.38%, #6240FF 100%);
}
</style> -->
