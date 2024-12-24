<template>
  <div v-if="isLoading" class="flex justify-start gap-3 items-center">
    <span
      :style="{ borderColor: color, width: width, height: height }"
      :class="['w-[${width}] h-[${height}] bg-[${color}]']"
      class="spinner-animation rounded-[50%] inline-block relative border-[5px] border-dotted"
    >
    </span>
    <h6 v-if="text" class="m-0" :class="['text-[${color}]']">{{ text }}</h6>
  </div>
</template>

<script setup lang="ts">
defineProps({
  color: {
    type: String,
    default: "#000",
  },
  width: {
    type: String,
    default: "24px",
  },
  height: {
    type: String,
    default: "24px",
  },
  text: {
    type: String,
    default: "",
  },
  isLoading: {
    type: Boolean,
    default: true,
  },
});
</script>

<style scoped>
.spinner-animation {
  animation: spinner 2s linear infinite;
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>
