<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.6667 5L7.50004 14.1667L3.33337 10"
      :stroke="stroke"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
<script setup lang="ts">
defineProps({
  height: {
    type: String,
    default: "20",
  },
  width: {
    type: String,
    default: "20",
  },
  stroke: {
    type: String,
    default: "#DCDCDC",
  },
  strokeWidth: {
    type: String,
    default: "1.66667",
  },
});
</script>
