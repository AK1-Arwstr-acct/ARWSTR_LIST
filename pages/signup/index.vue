<template>
  <div
    class="relative h-screen flex justify-center py-8 px-1 md:px-5 lg:px-28 overflow-y-auto no-scrollbar"
    :class="{ 'items-center': windowHeight }"
  >
    <div class="fixed inset-0 -z-20">
      <NuxtImg
        src="/images/shared/background-image.png"
        class="size-full object-cover"
        alt="Background Image"
      />
    </div>
    <div
      class="bgGradient size-auto min-h-fit h-full max-h-[800px] w-[1200px] p-0.5 rounded-2xl"
    >
      <div
        class="bg-[#1A1A1A] size-full flex rounded-2xl overflow-hidden min-h-fit"
      >
        <!-- Left Side -->
        <div
          class="w-full h-fit lg:w-1/2 bg-[#1A1A1A] rounded-l-2xl rounded-r-2xl lg:rounded-r-none overflow-hidden p-6 flex flex-col gap-6"
        >
          <div>
            <NuxtImg
              class="w-[164px] invert"
              src="/images/logo/logo.svg"
              alt="Logo"
            />
          </div>
          <div class="flex-1">
            <!-- steps -->
            <RegisterForm
              v-if="steps === 'register'"
              @setForm="(value) => setFormData(value)"
              @setPhoneNumber="(value) => setPhoneNumber(value)"
              @setSelectedOption="(value) => setSelectedOption(value)"
            />
            <OtpVarification
              v-else-if="steps === 'otp_varification'"
              :phoneNumber="phoneNumber"
              :selectedOption="selectedOption"
              @goBack="steps = 'register'"
              @OtpConfirm="(value) => OtpConfirm(value)"
            />
          </div>
        </div>
        <!-- Right side  -->
        <div class="hidden lg:block lg:w-1/2 rounded-r-2xl overflow-hidden">
          <RightSideInformation :isFullwidth="steps === 'otp_varification'" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import axios from "axios";
import type { Country, FormData } from "~/types/home";

const { api } = useApi();
const { showToast } = useToast();

const steps = ref<"register" | "otp_varification">("register");
const formData = ref<FormData>();
const selectedOption = ref<Country>();
const phoneNumber = ref<string>("");
const height = ref<number>(0);

const setSelectedOption = (selectedCountry: Country) => {
  selectedOption.value = selectedCountry;
};
const setPhoneNumber = (Number: string) => {
  phoneNumber.value = Number;
};

const setFormData = (data: FormData) => {
  formData.value = {
    ...data,
    phoneNumber: `${selectedOption.value?.phone_code}${phoneNumber.value}`,
  };
  steps.value = "otp_varification";
};

const OtpConfirm = async (verify_token: string) => {
  try {
    const budget = formData.value?.selectedBudget?.value;
    if (!budget) {
      return;
    }
    const [min, max] = budget.split("-");
    let payload = {
      name: formData.value?.userName,
      email: formData.value?.email,
      msisdn: formData.value?.phoneNumber,
      current_class_grade_id: formData.value?.selectedGrade?.value,
      verify_token: verify_token,
      annual_min_budget: min,
      annual_max_budget: max,
      destination_country_ids: [Number(formData.value?.selectedCountry?.value)],
    };
    await api.post("/v1/sign-up/enrollment", payload);

    navigateTo("/onboarded");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = (error.response?.data.errors.msisdn[0] || error.response?.data.errors.email[0]) ? "The email or phone number is already registered" : "Something went wrong";
      showToast(errorMessage, {
        type: "warning",
      });
    }
    steps.value = "register";
  }
};
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
.bgGradient {
  background: radial-gradient(
      68.44% 78.44% at 10% 141.23%,
      #ffffff 17.18%,
      rgba(57, 54, 178, 0) 100%
    ),
    radial-gradient(
      97.99% 85.4% at 10% -15.14%,
      rgba(255, 255, 255) 10.18%,
      rgba(26, 26, 26, 0.3) 76.45%
    );
}
</style>
