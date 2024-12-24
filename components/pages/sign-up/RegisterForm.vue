<template>
  <div class="flex flex-col gap-6 h-full" :class="{'mt-6' : windowHeight}" >
    <div>
      <h1
        class="font-semibold mb-3 text-[#F3F3F3]"
        :class="[windowHeight ? 'text-5xl lg:text-6xl' : 'text-5xl']"
      >
        Getting to<br />
        know you
      </h1>
      <p class="text-[#AEAEAE] font-medium">
        A few quick details to personalize your experience
      </p>
    </div>
    <div class="remove-shadow flex flex-wrap gap-4">
      <div class="w-full">
        <label class="uppercase font-medium text-[#E2E6FF]">Your name</label>
        <input
          name="userName"
          type="text"
          v-model="answers.userName"
          autofocus
          placeholder="Enter your name"
          class="mt-1 bg-transparent focus:outline-none focus:ring-0 rounded-none border-b border-[#E1E1E1] py-2 w-full outline-none focus:border-[#8380FF] transition-all ease-in-out duration-150 appearance-none text-white"
        />
      </div>
      <div class="w-[calc(50%-8px)]">
        <label class="uppercase font-medium text-[#E2E6FF]">Email</label>
        <input
          name="email"
          type="text"
          v-model="answers.email"
          autofocus
          placeholder="Fill in your email"
          class="mt-1 bg-transparent focus:outline-none focus:ring-0 rounded-none border-b border-[#E1E1E1] py-2 w-full outline-none focus:border-[#8380FF] transition-all ease-in-out duration-150 appearance-none text-white"
        />
      </div>
      <!--  -->
      <div class="relative w-[calc(50%-8px)]">
        <label class="uppercase font-semibold text-[#E2E6FF] mb-1.5">
          Phone number
        </label>
        <div
          class="remove-shadow relative border-b border-[#D0D5DD] outline-none flex items-center gap-2 py-0.5"
          tabindex="0"
        >
          <div class="flex gap-3 items-center justify-center">
            <div
              class="flex justify-between items-center cursor-pointer rounded bg-[#212121] px-1 py-1 gap-1"
              @click="isDropdownOpen = !isDropdownOpen"
              @touchstart.prevent="isDropdownOpen = !isDropdownOpen"
            >
              <div>
                <img
                  v-if="selectedOption"
                  :src="selectedOption?.flag"
                  :alt="`${selectedOption?.title}_flag_selected`"
                  class="min-h-6 min-w-6 h-6 w-6"
                />
                <div v-else class="min-w-6 min-h-6">
                  <IconSpinner
                    class="animate-spin"
                    height="24"
                    width="24"
                    bgColor="white"
                    stroke="#5836F5"
                  />
                </div>
              </div>
              <IconChevronDown
                width="16"
                height="16"
                stroke="#C5C5C5"
                class="transition-all ease-in-out duration-200"
                :class="{ 'transform rotate-180': isDropdownOpen }"
              />
            </div>
            <div
              :class="[
                phoneNumber.length > 0 ? 'text-[#ffffff]' : 'text-[#999999]',
              ]"
            >
              ({{ selectedOption?.phone_code || "-" }})
            </div>
          </div>
          <Transition name="fade">
            <div
              class="absolute left-0 bottom-[52px] w-full border border-[#e0e0e0] bg-white z-20 max-h-[250px] overflow-y-auto rounded-lg"
              v-if="isDropdownOpen"
              v-click-outside="closeDropdown"
            >
              <!-- <div class="border-b border-[#E0E0E0] p-2 sticky -top-0.5 sm:top-0 bg-white flex gap-[5px]">
                    <IconSearch />
                    <input type="text" placeholder="Search for country" v-model="search"
                        class="w-full outline-none" />
                </div> -->
              <div
                v-for="country in countryCodes"
                :key="country.id"
                class="flex gap-1 items-center cursor-pointer hover:bg-[#F1F5F9] p-2 rounded-md active:bg-[#CBD5E1]"
                @click="selectCountry(country)"
              >
                <div>
                  <img
                    :src="country.flag"
                    :alt="`${country.title}_flag`"
                    class="h-6 w-6"
                  />
                </div>
                <div class="text-[#667085] text-sm">
                  {{ country.title }} ({{ country.phone_code }})
                </div>
              </div>
            </div>
          </Transition>
          <input
            name="phoneNumber"
            inputmode="numeric"
            @input="(event) => validateNumber(event)"
            autofocus
            class="w-full pr-4 py-2 outline-none text-white bg-transparent placeholder:text-[#999999]"
            placeholder="000-000-000"
          />
        </div>
      </div>
      <BaseSelectRadio
        label="GRADE"
        :options="classGrades"
        v-model="answers.selectedGrade"
        placeholder="Select your grade"
        class="w-[calc(50%-8px)]"
      />
      <BaseSelectRadio
        label="ANNUAL BUDGET"
        :options="budget"
        v-model="answers.selectedBudget"
        placeholder="Select your budget"
        class="w-[calc(50%-8px)]"
      />
      <BaseSelectRadio
        label="COUNTRY PREFERENCE"
        :options="countries"
        v-model="answers.selectedCountry"
        direction="upward"
        placeholder="Select destination country"
        class="w-full"
      />
    </div>
    <!--  -->
    <div>
      <button
        @click="onSubmit"
        type="submit"
        :disabled="isDisabled"
        class="cursor-pointer disabled:opacity-70 w-full text-xl bg-[#8380FF] text-[#F3F3F3] rounded-lg font-semibold py-3 flex gap-2 justify-center items-center transition-all ease-in-out duration-200"
      >
        Join Waitlist
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import axios from "axios";
import type { Country, FormData } from "~/types/home";

const emits = defineEmits(["setForm", "setSelectedOption", "setPhoneNumber"]);

const { api } = useApi();
const { showToast } = useToast();

const height = ref<number>(0);
const isDropdownOpen = ref<boolean>(false);
const selectedOption = ref<Country | null>(null);
const search = ref<string>("");
const countryOptions = ref<Country[]>([]);
const phoneNumber = ref<string>("");
const answers = ref<FormData>({
  userName: '',
  email: '',
  selectedGrade: null,
  selectedBudget: null,
  selectedCountry: null,
});

const budget = [
  {
    value: "0-10000",
    label: "0 - 10,000",
  },
  {
    value: "0-20000",
    label: "0 - 20,000",
  },
  {
    value: "0-30000",
    label: "0 - 30,000",
  },
];
const countries = [
  {
    value: "182",
    label: "United States",
  },
  {
    value: "92",
    label: "United Kingdom",
  },
  {
    value: "156",
    label: "Canada",
  },
];
const classGrades = ref([]);

const windowHeight = computed(() => {
  return height.value > 830;
});

const countryCodes = computed(() => {
  if (search.value) {
    return countryOptions.value.filter((item) => {
      return item.title.toLowerCase().includes(search.value.toLowerCase());
    });
  } else {
    return countryOptions.value;
  }
});

const isDisabled = computed(() => {
  return !answers.value.userName || !answers.value.email || !answers.value.selectedGrade;
});

const closeDropdown = () => {
  isDropdownOpen.value = false;
};

const selectCountry = (country: Country) => {
  isDropdownOpen.value = false;
  selectedOption.value = country;
};

const validateNumber = (event: Event) => {
  const input = (event as InputEvent).target as HTMLInputElement;
  const value = input.value;

  const regex = /^[0-9 ]+$/;
  const cleanedValue = value.replace(/\s+/g, "");

  if (regex.test(value)) {
    input.value = value;
  } else {
    input.value = value.slice(0, -1);
  }
  phoneNumber.value = cleanedValue;
};

const onSubmit = async () => {
  try {
    if (selectedOption.value?.id) {
      emits("setSelectedOption", selectedOption.value);
    }
    emits("setPhoneNumber", phoneNumber.value);
    emits("setForm", answers.value);
    const response = await api.post(`/v2/send_otp`, {
      msisdn: `${selectedOption.value?.phone_code ?? ""}${
        phoneNumber.value ?? ""
      }`,
      id: selectedOption.value?.id,
      sender: "https://waitlist.arrowster.com"
    });
  } catch (error) {
    if(axios.isAxiosError(error)) {
      showToast(error.response?.data.message);
    }
  }
};

const getCountries = async () => {
  try {
    const response = await api.get(`/v1/country_codes`);
    countryOptions.value = response.data.data.all_phone_codes;
    selectedOption.value = response.data.data.current_country_code;
  } catch (error) {
    console.error(error);
  }
};

const getClassGrades = async () => {
  try {
    const response = await api.get(`/v1/sign-up/get-class-grades`);
    classGrades.value = response.data.data.map((item : {id:number , class_name: string }) => {
        return {
          value: item.id,
          label: item.class_name,
        };
      });
  } catch (error) {
    console.error(error);
  }
};

const windowSize = () => {
  if (typeof window !== "undefined") {
    height.value = window.innerHeight;
  }
};

onMounted(() => {
  windowSize();
  getCountries();
  getClassGrades();
  window.addEventListener("resize", windowSize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", windowSize);
});
</script>
