<template>
  <div class="relative">
    <p v-if="label" class="font-medium mb-1.5 text-[#E2E6FF]">{{ label }}</p>
    <div
      @click="isDropdownOpen = !isDropdownOpen"
      @touchstart.prevent="isDropdownOpen = !isDropdownOpen"
      class="bg-transparent h-12 border-b-[1.5px] border-[#e0e0e0] py-2 w-full transition-colors duration-150 ease-in-out flex justify-between items-center cursor-pointer relative"
      :class="{
        '!bg-[#f8f8f8] pointer-events-none': disabled,
        'shadow-dropdown-dropShadow': isDropdownOpen,
        '!border-[#9CA2FF]': isDropdownOpen,
        '!border-[#EF4646]' : hasError && !selectedOption?.value && !isDropdownOpen
      }"
    >
      <div v-if="!selectedOption?.value" class="flex-1">
        <p class="text-[#979797] text-left">{{ placeholder }}</p>
      </div>
      <div v-else-if="selectedOption?.value && showCheckedLabel" class="flex-1">
        <p class="text-[#F3F3F3] text-left text-xs">
          {{ placeholder }}
        </p>
        <p class="text-[#F3F3F3] text-left w-[calc(100%-24px)] truncate">
          {{ selectedOption.label }}
        </p>
      </div>
      <div v-else class="flex-1">
        <p class="text-[#F3F3F3] text-left w-[calc(100%-24px)] truncate">
          {{ selectedOption.label }}
        </p>
      </div>
      <span
        :class="[
          isDropdownOpen
            ? 'absolute right-0 top-3 transition-transform duration-200 ease-in-out transform rotate-180'
            : 'absolute right-0 top-3 transition-transform duration-200 ease-in-out',
        ]"
      >
        <IconChevronDown v-if="!loading" height="18" width="18" />
        <!-- <BaseSpinner v-else color="#475569" width="22px" height="22px" /> -->
      </span>
    </div>
    <div
      v-if="isDropdownOpen"
      v-click-outside="closeDropdown"
      class="absolute left-0 w-full border border-[#e0e0e0] bg-[#1A1A1A] z-20 max-h-[400px] overflow-y-auto py-1.5 rounded-md"
      :class="[
        direction === 'upward'
          ? label
            ? 'bottom-12 mb-1'
            : 'bottom-full mb-1'
          : label
          ? 'top-[82px]'
          : 'top-[52px]',
      ]"
    >
      <div
        v-for="(item, index) in options"
        :key="index"
        class="flex items-center cursor-pointer border-b border-[#686868] last:border-0"
        :class="{
          'bg-[#14125C]':
            mode === 'tick' && selectedOption?.value === item.value,
        }"
      >
        <label
          class="text-[#5d5f65] text-left cursor-pointer w-full flex items-center gap-2 py-2.5 px-2 truncate"
          :class="{
            'justify-between': mode === 'tick',
          }"
        >
          <input
            type="radio"
            :value="item"
            v-model="selectedOption"
            @change="onChange"
            :checked="selectedOption?.value === item.value"
            class="min-w-5 h-5 cursor-pointer"
            :class="{ hidden: mode === 'tick' }"
          />
          <span
            class="truncate text-[#F3F3F3]"
            :class="{
              '!text-[#8380FF]': selectedOption?.value === item.value,
            }"
            >{{ item.label }}</span
          >
          <span v-if="selectedOption?.value === item.value && mode === 'tick'">
            <IconTick />
          </span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { OptionAttributes } from '~/types/home';

const props = defineProps({
  placeholder: {
    type: String,
    default: "Select Option",
  },
  options: {
    type: Array as PropType<OptionAttributes[]>,
    default: [],
  },
  modelValue: {
    type: Object as PropType<OptionAttributes | null>,
    default: null
  },
  label: {
    type: String,
    default: "",
  },
  showCheckedLabel: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  hasError: {
    type: Boolean,
    default: false,
  },
  direction: {
    type: String as PropType<"upward" | "downward">,
    default: "downward",
  },
  mode: {
    type: String as PropType<"tick" | "radio">,
    default: "tick",
  },
});

const emits = defineEmits<{
  (e: "update:modelValue", selectedOptions: OptionAttributes | null): void;
}>();

const isDropdownOpen = ref<boolean>(false);
const selectedOption = ref<OptionAttributes | null>(props.modelValue);

const closeDropdown = () => {
  isDropdownOpen.value = false;
};

const onChange = () => {
  closeDropdown();
  emits("update:modelValue", selectedOption.value);
};

watch(
  () => props.modelValue,
  (newValue) => {
    selectedOption.value = newValue ? newValue : null;
  }
);
</script>
