<script setup>
import Project from '../widgets/Project.vue';
import Searchbar from '../UI/Searchbar.vue';
import AdvancedFilter from '../UI/Advanced-filter.vue';

import { ref, reactive, onMounted, onBeforeUnmount, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { isValidToken, getUser } from '../../functions/user.js';
import { getRenovations, getRecommendedRenovations, getActiveRenovations, getSavedRenovations, getCompletedRenovations, getUserRenovation } from '../../functions/renovation.js';

const route = useRoute();
const router = useRouter();

const token = localStorage.getItem('token');

let userData = reactive({});
let renovations = reactive([]);
let renovationsLoaded = ref(false);
let budget = ref('€' + 0);
let userId = ref('');

const screenWidth = ref(window.innerWidth);

const fetchData = async () => {
  if (isValidToken(token)) {
    userData.value = await getUser(token);
    if (userData.value !== null) {
      budget.value = '€' + userData.value.budget;
      userId.value = userData.value._id;
    } else {
      router.push('/login');
    }

    if (route.path === '/projects/recommended') {
      renovations.value = await getRecommendedRenovations(userId.value);
    } else if (route.path === '/projects/active') {
      renovations.value = await getActiveRenovations(userId.value);
    } else if (route.path === '/projects/completed') {
      renovations.value = await getCompletedRenovations(userId.value);
    } else if (route.path === '/projects/saved') {
      renovations.value = await getSavedRenovations(userId.value);
    } else {
      renovations.value = await getRenovations();
    }

    // sort the renovations based on the impact
    renovations.value.sort((a, b) => {
      if (a.impact === 'Hoogste impact' && b.impact !== 'Hoogste impact') {
        return -1;
      } else if (a.impact !== 'Hoogste impact' && b.impact === 'Hoogste impact') {
        return 1;
      } else {
        return 0;
      }
    });

    renovationsLoaded.value = true;
  } else {
    router.push('/login');
  }
};

const handleResize = () => {
  screenWidth.value = window.innerWidth;
};

onMounted(() => {
  fetchData();
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});

watch(route, () => {
  fetchData();
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
    budget.value
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

const handleFilter = (filteredRenovations) => {
  renovations.value = filteredRenovations;
};
</script>

<template>
  <section class="m-[32px] md:m-[40px]">
    <div class="mb-[32px] md:mb-[40px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px] md:gap-[40px]">
      <Searchbar class="lg:col-span-2" />
      <div v-if="renovationsLoaded">
        <AdvancedFilter class="lg:col-span-1" :renovations="renovations.value" @filtered="handleFilter"
          :userBudget="budget" />
      </div>
    </div>
    <div v-if="renovationsLoaded">
      <router-link v-for="(renovation, i) in renovations.value" :key="i" :to="'/projects/' + renovation._id">
        <Project :name="renovation.title" :desc="renovation.description" :src="getSrcArray(renovation)"
          :activeSrc="getActiveSrcArray(renovation)" :doneSrc="getDoneSrcArray(renovation)" :label="labelArray"
          :activeLabel="activeLabelArray" :doneLabel="doneLabelArray" :text="getTextArray(renovation)"
          :activeText="getActiveTextArray(renovation)" :doneText="getDoneTextArray(renovation)"
          :stateFetcher="getStateFetcher(renovation)" />
      </router-link>
    </div>
  </section>
</template>

<style scoped></style>
