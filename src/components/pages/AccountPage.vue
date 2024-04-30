<template>
  <section>
    <div class="flex gap-[8px] mb-[20px] mt-[40px] md:ml-[40px] ml-[5%] items-center">
      <h2 class="text-subtitle font-bold">Doel</h2>
      <a href="#">
        <div><img src="/edit_no_fill.svg" alt="potlood"></div>
      </a>
    </div>
    <div class="flex md:mx-[40px] ml-[5%] justify-center items-center bg-offWhite-light w-[90%] p-4 rounded">
      <div v-for="label in labels" :key="label" class="hidden md:block">
        <img :src="`/${label}-label.svg`" :alt="`epc label ${label}`" class="md:w-[100px] w-[20px] pr-[-50px]"
          :class="{ 'scale-[150%] md:scale-[150%] md:mx-7 mx-2 md:mt-10 mt-[54px] flex': label === currentLabel || label === goalLabel }">
        <p v-if="label === currentLabel" class="md:w-[150px] w-[20px] text-xs md:text-body flex justify-center pt-4">
          Jouw label</p>
        <p v-else-if="label === goalLabel" class="md:w-[150px] w-[20px] text-xs md:text-body flex justify-center pt-4">
          Jouw doel</p>
      </div>
      <div class="md:hidden flex gap-3">
        <div>
          <div class="px-[12px] xs:px-[24px] flex justify-center items-center">
            <img :src="`/${currentLabel}-label.svg`" :alt="`epc label ${label}`" class="w-[100%] xxs:w-[70%] mt-5">
          </div>
          <p class="w-[100%] text-xs flex justify-center pt-4">
            Jouw label</p>
        </div>
        <div>
          <div class="px-[12px] xs:px-[24px] flex justify-center items-center">
            <img :src="`/${goalLabel}-label.svg`" :alt="`epc label ${label}`" class="w-[100%] xxs:w-[70%] mt-5">
          </div>
          <p class="w-[100%] text-xs flex justify-center pt-4">
            Jouw doel</p>
        </div>
      </div>
    </div>
  </section>
  <section>
    <div class="flex gap-[8px] mb-[20px] mt-[40px] md:ml-[40px] ml-[5%] items-center">
      <h2 class="text-subtitle font-bold">Budget</h2>
      <a href="#">
        <div><img src="/edit_no_fill.svg" alt="potlood"></div>
      </a>
    </div>
    <div class=" md:mx-[40px] mx-[5%] bg-offWhite-light w-[90%] pt-10 rounded mb-[40px]">
      <div class="bg-offWhite-dark md:mx-[20%] mx-[15%] mt-[40px] md:w-[60%] md:h-[52px] w-[70%] h-[32px] rounded">
        <!-- Add a wrapper div for the animated bar -->
        <div class="h-full bg-primary-medium rounded animate-bar" :style="{ width: currentBudgetPercentage }"></div>
      </div>
      <div class="flex justify-center">
        <div class="flex w-[90%] justify-between mt-[20px] px-4 mb-14 gap-4">
          <div class="md:flex md:gap-[32px]">
            <div><img src="/money.svg" alt="huidig budget" class="md:w-[58px] w-[40px] hidden xs:block"></div>
            <div>
              <p class="md:text-body text-xs font-bold">Resterend budget</p>
              <p class="md:text-xs text-[0.6rem]">{{ currentBudget }} EUR</p>
            </div>
          </div>
          <div class="md:flex md:gap-[32px]">
            <div><img src="/moneyLight.svg" alt="uitgegeven budget" class="md:w-[58px] w-[40px] hidden xs:block"></div>
            <div>
              <p class="md:text-body text-xs font-bold">Uitgegeven budget</p>
              <p class="md:text-xs text-[0.6rem]">{{ spentBudget }} EUR</p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="w-full h-[48px] bg-primary-dark rounded-b-lg text-offWhite-light font-bold md:text-btn text-body flex justify-center items-center">
        <a href="#">Bekijk al je uitgaven</a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { isValidToken, getUser } from "../../functions/user.js";

const router = useRouter();

const token = localStorage.getItem("token");
let userData = ref({});
let currentLabel = ref("");
let goalLabel = ref("");
let currentBudget;
let spentBudget;
let currentBudgetPercentage = ref('0%');

onMounted(async () => {
  if (isValidToken(token)) {
    userData.value = await getUser(token);
    if (userData.value !== null) {
      currentLabel.value = userData.value.label;
      goalLabel.value = userData.value.goalLabel;
      currentBudget = userData.value.budget_current;
      spentBudget = userData.value.budget_spent;
      let totalBudget = parseInt(currentBudget) + parseInt(spentBudget);
      currentBudgetPercentage.value = `${((parseInt(currentBudget) / totalBudget) * 100).toFixed(2)}%`;
      document.styleSheets[0].insertRule(`@keyframes fillBar {
      from { width: 0; }
      to { width: ${currentBudgetPercentage.value}; }
    }`, 0);
      document.styleSheets[0].insertRule(`.animate-bar {
      animation: fillBar 1s ease forwards;
    }`, 0);
    } else {
      router.push('/login');
    }
  } else {
    router.push("/login");
  }
});

const labels = ['F', 'E', 'D', 'C', 'B', 'A', 'A+'];
</script>