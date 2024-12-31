<template>
  <div class="h-[100dvh] w-[100dvw] overflow-x-hidden no-scrollbar">
    <div class="size-full flex overflow-hidden min-h-fit">
      <!-- Left Side -->
      <div
        class="w-full h-full min-h-fit lg:w-1/2 bg-radial p-6 md:p-12 flex flex-col gap-6"
      >
        <div>
          <NuxtImg class="w-[164px]" src="/images/logo/logo.svg" alt="Logo" />
        </div>
        <div class="flex-1">
          <!-- steps -->
          <RegisterForm
            v-if="steps === 'register'"
            @setForm="(value) => setFormData(value)"
            @setPhoneNumber="(value) => setPhoneNumber(value)"
            @setSelectedOption="(value) => setSelectedOption(value)"
          />
          <OtpVerification
            v-else-if="steps === 'otp_varification'"
            :phoneNumber="phoneNumber"
            :selectedOption="selectedOption"
            @goBack="steps = 'register'"
            @OtpConfirm="(value) => OtpConfirm(value)"
          />
        </div>
      </div>
      <!-- Right side  -->
      <div class="hidden lg:block lg:w-1/2">
        <RightSideInformation />
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
      const phoneError = error.response?.data.errors.msisdn?.[0];
      const emailError = error.response?.data.errors.email?.[0];
      let errorMessage = "Something went wrong";
      if (phoneError && emailError) {
        errorMessage = "The email and phone number are already registered";
      } else if (phoneError) {
        errorMessage = "The phone number is already registered";
      } else if (emailError) {
        errorMessage = "The email is already registered";
      }
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
.bg-radial {
  background: radial-gradient(
      122.03% 137.69% at 74.31% 20.12%,
      rgba(131, 128, 255, 0) 53.55%,
      #8380ff 100%
    ),
    var(--background-page-neutral, #111113);
}
</style>
