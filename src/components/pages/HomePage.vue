<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import { isValidToken, getUser } from "../../functions/user.js";
import { formatFinancialNumber } from "../../functions/helpers.js";

import Project from "../widgets/Project.vue";
import Calendar from "../widgets/Calendar.vue";

import { getActiveRenovations, getUserRenovation } from "../../functions/renovation.js";
import { convertDate } from "../../functions/helpers.js";

import Empty_state from '../widgets/Empty_state.vue';

const router = useRouter();

const token = localStorage.getItem("token");
let userData = ref({});
let activeRenovations = ref([]);
let userId = ref("");
let renovationsLoaded = ref(false);
let mainDataLoaded = ref(false);

onMounted(async () => {
  if (isValidToken(token)) {
    userData.value = await getUser(token);
    mainDataLoaded.value = true;

    if (userData.value !== null) {
      userId.value = userData.value._id;
      activeRenovations.value = await getActiveRenovations(userId.value);
      renovationsLoaded.value = true;
    } else {
      router.push('/login');
    }
  } else {
    router.push("/login");
  }
});

const labelArray = [
  'Impact',
  'Geschatte kost',
  'Jouw budget'
];

const activeLabelArray = [
  'Toegewezen budget',
  'Startdatum'
];

const doneLabelArray = [
  'Uitgegeven budget',
  'Einddatum'
];

const getSrcArray = (renovation) => {
  // Logic for generating srcArray based on renovation data
  return [
    renovation.impact === 'Hoogste impact' ? '/highImpact.svg' : '/lowImpact.svg',
    renovation.cost === 'high' ? '/highCost.svg' : '/lowCost.svg',
    '/budgetBlue.svg'
  ];
};

const getActiveSrcArray = (renovation) => {
  // Logic for generating srcArray based on renovation data
  return [
    '/budgetBlue.svg',
    '/calendar.svg'
  ];
};

const getDoneSrcArray = (renovation) => {
  // Logic for generating srcArray based on renovation data
  return [
    '/budgetBlue.svg',
    '/calendar.svg'
  ];
};

const getTextArray = (renovation) => {
  // Logic for generating textArray based on renovation data
  return [
    renovation.impact,
    renovation.estimated_cost,
    'budget'
  ];
};

const getActiveTextArray = async (renovation) => {
  // Logic for generating textArray based on renovation data
  let data = await getUserRenovation(userId.value, renovation._id);
  let startDate = convertDate(data.startDate);
  return [
    data.budget,
    startDate,
    data.amount_total,
    data.amount_done
  ];
};

const getDoneTextArray = async (renovation) => {
  let data = await getUserRenovation(userId.value, renovation._id);
  return [
    data.budget,
    convertDate(data.endDate),
    data.amount_total,
    data.amount_done
  ];
};

const getStateFetcher = (renovation) => async () => {
  let data = await getUserRenovation(userId.value, renovation._id);
  return data.status;
};

const navigateTo = (path) => {
  router.push(path);
};
</script>

<template>
  <div class="m-[32px] md:m-[40px]">
    <section class="mb-[32px] md:mb-[40px]">
      <h2 class="text-subtitle font-bold pb-[20px]">Algemene info</h2>
      <div class="xs:flex gap-[32px] xs:h-[196px]">
        <div v-if="!mainDataLoaded" class="pulsing xs:w-1/2 rounded-[5px] w-full h-[196px] mb-[32px]"></div>
        <div v-if="mainDataLoaded" @click="navigateTo('/account')"
          class="bg-offWhite-light xs:w-1/2 mb-[32px] xs:mb-0 h-[196px] flex justify-center rounded items-center cursor-pointer">
          <div><img :src="'/' + userData.label + '-label.svg'" alt="epc label" class="w-[140px]"></div>
        </div>
        <div v-if="!mainDataLoaded" class="pulsing xs:w-1/2 rounded-[5px] w-full h-[196px]"></div>
        <div v-if="mainDataLoaded" @click="navigateTo('/account')"
          class="bg-offWhite-light xs:w-1/2 h-[196px] flex justify-center rounded items-center gap-[32px] cursor-pointer">
          <div class="w-[60px] xs:w-[80px]">
            <img src="/wallet.svg" alt="budget icon">
          </div>
          <div>
            <p class="text-[18px] font-bold">Huidig budget</p>
            <p v-if="userData.budget_current || userData.budget_current === 0" class="text-[14px]"
              :class="{ 'text-secondary-red font-bold': userData.budget_current < 0 }">{{
                formatFinancialNumber(userData.budget_current) }}</p>
          </div>
        </div>
      </div>
    </section>
    <section class="mb-[32px] md:mb-[40px]">
      <Calendar />
    </section>
    <section>
      <h2 class="text-subtitle font-bold pb-[20px]">Actieve projecten</h2>
      <div v-if="renovationsLoaded && activeRenovations.length > 0">
        <router-link v-for="(renovation, i) in activeRenovations" :key="i" :to="'/projects/' + renovation._id">
          <Project :name="renovation.title" :desc="renovation.description" :src="getSrcArray(renovation)"
            :activeSrc="getActiveSrcArray(renovation)" :doneSrc="getDoneSrcArray(renovation)" :label="labelArray"
            :activeLabel="activeLabelArray" :doneLabel="doneLabelArray" :text="getTextArray(renovation)"
            :activeText="getActiveTextArray(renovation)" :doneText="getDoneTextArray(renovation)"
            :stateFetcher="getStateFetcher(renovation)" />
        </router-link>
      </div>
      <div v-else-if="!renovationsLoaded" class="pulsing rounded-[5px] h-[196px]"></div>
      <div v-else>
        <Empty_state :text="'Er zijn geen actieve projecten'" />
      </div>
    </section>
  </div>
</template>

<style scoped></style>
