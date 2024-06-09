<template>
  <section>
    <div class="flex gap-[8px] mb-[20px] mt-[40px] md:ml-[40px] ml-[5%] items-center">
      <h2 class="text-subtitle font-bold">Doel</h2>
      <a href="#" @click="openEditGoalPopup">
        <div><img src="/edit_no_fill.svg" alt="potlood" /></div>
      </a>
    </div>
    <div class="flex md:mx-[40px] ml-[5%] justify-center items-center bg-offWhite-light w-[90%] p-4 rounded"
      v-if="dataIsLoaded">
      <div v-for="label in labels" class="hidden md:block">
        <img :src="`/${label}-label.svg`" :alt="`epc label ${label}`" class="md:w-[100px] w-[20px] pr-[-50px]" :class="{
          'scale-[150%] md:scale-[150%] md:mx-7 mx-2 md:mt-10 mt-[54px] flex':
            label === currentLabel,
          'scale-[150%] md:scale-[150%] md:mx-7 mx-2 md:mt-16 mt-[54px] flex':
            label === goalLabel,
        }" />
        <p v-if="label === currentLabel"
          class="md:w-[150px] w-[20px] text-xs md:text-body flex justify-center pt-4 font-bold">
          Jouw label
        </p>
        <div v-else-if="label === goalLabel">
          <p class="md:w-[150px] w-[20px] text-xs md:text-body flex justify-center pt-4 font-bold">
            Jouw doel
          </p>
          <p class="md:w-[150px] w-[20px] text-xs md:text-body flex justify-center">
            Tegen {{ goalYear }}
          </p>
        </div>
      </div>
      <div class="md:hidden flex gap-3">
        <div>
          <div class="px-[12px] xs:px-[24px] flex justify-center items-center">
            <img :src="`/${currentLabel}-label.svg`" :alt="`epc label ${label}`" class="w-[100%] xxs:w-[70%] mt-5" />
          </div>
          <p class="w-[100%] text-xs flex justify-center pt-4 font-bold">
            Jouw label
          </p>
        </div>
        <div>
          <div class="px-[12px] xs:px-[24px] flex justify-center items-center">
            <img :src="`/${goalLabel}-label.svg`" :alt="`epc label ${label}`" class="w-[100%] xxs:w-[70%] mt-5" />
          </div>
          <p class="w-[100%] text-xs flex justify-center pt-4 font-bold">
            Jouw doel
          </p>
          <p class="w-[100%] text-xs flex justify-center">
            Tegen {{ goalYear }}
          </p>
        </div>
      </div>
    </div>
    <div v-else class="pulsing h-[156px] rounded-[5px] md:mx-[40px] ml-[5%]"></div>
  </section>
  <section>
    <div></div>
    <div class="flex gap-[8px] mb-[20px] mt-[40px] md:ml-[40px] ml-[5%] items-center">
      <h2 class="text-subtitle font-bold">Budget</h2>
      <a href="#" @click="openEditBudgetPopup">
        <div><img src="/edit_no_fill.svg" alt="potlood" /></div>
      </a>
    </div>
    <div v-if="dataIsLoaded" class="md:mx-[40px] mx-[5%] bg-offWhite-light w-[90%] pt-[40px] rounded mb-[40px]">
      <div class="flex justify-center mb-[40px]">
        <div class="md:flex w-[90%] justify-around">
          <div class="hidden md:flex justify-center items-center w-[35%]">
            <div>
              <p class="md:text-body font-bold">Resterend budget</p>
              <p class="text-xs" :class="{ 'text-secondary-red font-bold': currentBudget < 0 }">
                {{ formatFinancialNumber(currentBudget) }}
              </p>
            </div>
          </div>
          <div class="w-full md:flex block justify-center items-center">
            <div class="md:w-[90%]">
              <div class="bg-offWhite-dark md:w-full md:h-[52px] w-full h-[32px] rounded">
                <div class="h-full bg-primary-medium rounded animate-bar" :style="{ width: currentBudgetPercentage }">
                </div>
              </div>
            </div>
          </div>
          <div class="flex md:w-[35%] w-full self-center justify-between mt-5 md:mt-0">
            <div class="flex md:hidden">
              <div>
                <p class="md:text-body font-bold">Resterend budget</p>
                <p class="text-xs" :class="{ 'text-secondary-red font-bold': currentBudget < 0 }">
                  {{ formatFinancialNumber(currentBudget) }}
                </p>
              </div>
            </div>
            <div class="md:flex justify-center">
              <div class="text-right">
                <p class="md:text-body font-bold">Totale budget</p>
                <p class="text-xs">{{ formatFinancialNumber(totalBudget) }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a href="/account/expenses">
        <div
          class="w-full h-[48px] bg-primary-dark rounded-b-lg text-offWhite-light font-bold md:text-btn text-body flex justify-center items-center hover:bg-[#3390FF] active:bg-[#0056CC] transition duration-200 ease-in-out">
          Bekijk al je uitgaven
        </div>
      </a>
    </div>
    <div v-else class="pulsing h-[314px] rounded-[5px] md:mx-[40px] ml-[5%] mb-[32px]"></div>
  </section>
  <section>
    <div class="flex gap-[8px] mb-[20px] mt-[40px] md:ml-[40px] ml-[5%] items-center">
      <h2 class="text-subtitle font-bold">Aantal renovaties</h2>
    </div>
    <div v-if="dataIsLoaded" class="md:mx-[40px] mx-[5%] bg-offWhite-light w-[90%] pt-10 rounded mb-[40px]">
      <div class="md:flex md:w-full md:justify-center">
        <div class="mx-5 md:w-[60%]">
          <Graph :data="chartDataArray" />
        </div>
      </div>
      <a href="/projects/completed">
        <div
          class="w-full h-[48px] bg-primary-dark rounded-b-lg text-offWhite-light font-bold md:text-btn text-body flex justify-center items-center hover:bg-[#3390FF] active:bg-[#0056CC] transition duration-200 ease-in-out">
          Bekijk al je voltooide renovaties
        </div>
      </a>
    </div>
    <div v-else class="pulsing h-[314px] rounded-[5px] md:mx-[40px] ml-[5%] mb-[32px]"></div>
  </section>
  <ChangeGoal :showModal="showModal" :userId="userId" :userData="userData" @closeModal="closeModal" />
  <ChangeBudget :showBudgetModal="showBudgetModal" :userId="userId" @closeBudgetModal="closeBudgetModal" />
  <Confirm :showConfirm="showConfirm" title="Gefeliciteerd!" desc="Je hebt je doel behaald! Stel een nieuwe doel in"
    @closeConfirm="showConfirm = false" @confirmAction="openEditGoalPopup" :firstBtn="'Doel instellen'"
    :noCancel="true" />
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import { useRouter } from "vue-router";

import { isValidToken, getUser, checkEmailConfirmed, checkLabelUser } from "../../functions/user.js";
import { formatFinancialNumber } from "../../functions/helpers.js";
import { getCompletedRenovationsByMonth } from "../../functions/renovation.js";
import ChangeGoal from "../modals/ChangeGoal.vue";
import ChangeBudget from "../modals/ChangeBudget.vue";
import Graph from "../widgets/Line-graph.vue";
import Confirm from "../modals/Confirm.vue";

const router = useRouter();

const token = localStorage.getItem("token");
let userId = ref("");
let userData = ref({});
let currentLabel = ref("");
let goalLabel = ref("");
let currentBudget = ref(0);
let spentBudget = ref(0);
let totalBudget = ref();
let currentBudgetPercentage = ref("0%");
let showModal = ref(false);
let labels = ref(["F", "E", "D", "C", "B", "A", "A+"]);
let dataIsLoaded = ref(false);
let label = ref("");
let showBudgetModal = ref(false);
let chartDataArray = ref(new Array(12).fill(0)); // Initialize with 12 zeros, one for each month
let goalYear = ref("");
let showConfirm = ref(false);

onMounted(async () => {
  if (isValidToken(token)) {
    await getData();
  } else {
    router.push("/login");
  }

  const result = await getCompletedRenovationsByMonth(userId.value);

  // Populate the chartDataArray with the result data
  updateChartDataArray(result);

  // Calculate cumulative sum
  calculateCumulativeSum();

  checkGoal();
});

const checkGoal = () => {
  if (userData.value.label === 'A+') {
    return;
  }
  if (userData.value.goalLabel === userData.value.label) {
    showConfirm.value = true;
  }
};

const openEditBudgetPopup = () => {
  showBudgetModal.value = true;
};

const closeBudgetModal = () => {
  getData();
  showBudgetModal.value = false;
};

const openEditGoalPopup = () => {
  showModal.value = true;
};

const closeModal = async () => {
  await getData();
  checkGoal();
  showModal.value = false;
};

const getData = async () => {
  userData.value = await getUser(token);

  if (userData.value !== null) {
    let emailConfirmed = await checkEmailConfirmed(userData.value);
    if (!emailConfirmed) {
      router.push("/login");
      return;
    }

    let hasLabel = await checkLabelUser(userData.value);
    if (!hasLabel) {
      router.push("/determinelabelchoice");
      return;
    }

    currentLabel.value = userData.value.label;
    goalLabel.value = userData.value.goalLabel;
    goalYear.value = userData.value.goalLabel_by_year;
    currentBudget = userData.value.budget_current;
    spentBudget = userData.value.budget_spent;
    userId.value = userData.value._id;
    totalBudget = parseInt(currentBudget) + parseInt(spentBudget);
    let calculatedPercentage = (parseInt(currentBudget) / totalBudget) * 100;
    currentBudgetPercentage.value = `${calculatedPercentage < 0 ? 0 : calculatedPercentage.toFixed(2)}%`;

    await nextTick();

    const styleSheet = document.styleSheets[0];

    if (styleSheet && styleSheet.cssRules.length > 0) {
      try {
        styleSheet.deleteRule(0);
        styleSheet.deleteRule(0);
      } catch (error) {
        console.error("Error deleting rules: ", error);
      }

      styleSheet.insertRule(
        `@keyframes fillBar {
          from { width: 0; }
          to { width: ${currentBudgetPercentage.value}; }
        }`,
        0
      );
      styleSheet.insertRule(
        `.animate-bar {
          animation: fillBar 1s ease forwards;
        }`,
        0
      );
    } else {
      console.error("No stylesheets found or no rules to delete.");
    }

    dataIsLoaded.value = true;
  } else {
    router.push("/login");
  }
};

// Helper function to update chartDataArray
const updateChartDataArray = (result) => {
  let tempArray = new Array(12).fill(0);
  let previousRenovationsCount = 0;

  // Get the current date
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth(); // 0-based (0 = January, 11 = December)
  const currentYear = currentDate.getFullYear();

  // Create an array of last 12 months in "MM/YYYY" format
  let last12Months = [];
  for (let i = 11; i >= 0; i--) {
    const date = new Date(currentYear, currentMonth - i, 1);
    const month = date.getMonth() + 1; // 1-based
    const year = date.getFullYear();
    last12Months.push(`${String(month).padStart(2, "0")}/${year}`);
  }

  // Count renovations before the last 12 months
  for (const key in result) {
    const [month, year] = key.split("/").map(Number);
    const renovationDate = new Date(year, month - 1);
    if (renovationDate < new Date(currentYear, currentMonth - 11)) {
      previousRenovationsCount += result[key];
    }
  }

  // Iterate through the last 12 months and update tempArray with the result data
  last12Months.forEach((monthYear, index) => {
    if (result[monthYear] !== undefined) {
      tempArray[index] = result[monthYear];
    }
  });

  // Set the initial value based on previous renovations count
  chartDataArray.value = tempArray.map((value, index) => {
    if (index === 0) {
      return value + previousRenovationsCount;
    } else {
      return value;
    }
  });
};

// Helper function to calculate cumulative sum
const calculateCumulativeSum = () => {
  for (let i = 1; i < chartDataArray.value.length; i++) {
    chartDataArray.value[i] += chartDataArray.value[i - 1];
  }
};

const alertFunc = () => {
  alert('De uitgaven zijn nog niet af in deze versie, tegen de jury zullen deze geupdate worden in deze build.');
};
</script>
