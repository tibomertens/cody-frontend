<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { isValidToken, getUser } from "../../functions/user.js";

import Project from "../widgets/Project.vue";
import Calendar from "../widgets/Calendar.vue";

import { getActiveRenovations, getUserRenovation } from "../../functions/renovation.js";

const router = useRouter();

const token = localStorage.getItem("token");
let userData = ref({});
let activeRenovations = ref([]);
let userId = ref("");
let renovationsLoaded = ref(false);

onMounted(async () => {
  if (isValidToken(token)) {
    userData.value = await getUser(token);
    userId.value = userData.value._id;

    if (userData.value !== null) {
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
  'Budget',
  'Startdatum'
];

const doneLabelArray = [
  'Budget',
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
  return [
    '€' + data.budget,
    data.startDate,
    data.amount_total,
    data.amount_done
  ];
};

const getDoneTextArray = async (renovation) => {
  let data = await getUserRenovation(userId.value, renovation._id);
  return [
    '€' + data.budget,
    data.endDate,
    data.amount_total,
    data.amount_done
  ];
};

const getStateFetcher = (renovation) => async () => {
  let data = await getUserRenovation(userId.value, renovation._id);
  return data.status;
};
</script>

<template>
  <div class="m-[32px] md:m-[40px]">
    <section class="mb-[32px] md:mb-[40px]">LABEL + BUDGET</section>
    <section class="mb-[32px] md:mb-[40px]">
      <Calendar />
    </section>
    <section>
      <h2 class="text-subtitle font-bold pb-[20px]">Actieve projecten</h2>
      <div v-if="renovationsLoaded">
        <router-link v-for="(renovation, i) in activeRenovations" :key="i" :to="'/projects/' + renovation._id">
          <Project :name="renovation.title" :desc="renovation.description" :src="getSrcArray(renovation)"
            :activeSrc="getActiveSrcArray(renovation)" :doneSrc="getDoneSrcArray(renovation)" :label="labelArray"
            :activeLabel="activeLabelArray" :doneLabel="doneLabelArray" :text="getTextArray(renovation)"
            :activeText="getActiveTextArray(renovation)" :doneText="getDoneTextArray(renovation)"
            :stateFetcher="getStateFetcher(renovation)" />
        </router-link>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
