<script setup>
import Project from '../widgets/Project.vue';
import Searchbar from '../UI/Searchbar.vue';
import AdvancedFilter from '../UI/Advanced-filter.vue';
import Empty_state from '../widgets/Empty_state.vue';
import Error_state from '../widgets/Error_state.vue';

import { ref, reactive, onMounted, onBeforeUnmount, watch, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { isValidToken, getUser } from '../../functions/user.js';
import { getRenovations, getRecommendedRenovations, getActiveRenovations, getSavedRenovations, getCompletedRenovations, getUserRenovation } from '../../functions/renovation.js';
import { convertDate } from '../../functions/helpers.js';

const route = useRoute();
const router = useRouter();

const token = localStorage.getItem('token');

let userData = reactive({});
let renovations = reactive([]);
let renovationsLoaded = ref(false);
let budget = ref(0);
let userId = ref('');
let empty_text = ref('Er zijn geen projecten gevonden, probeer een andere filter.');
let unexpected_error = ref(false);
let beforeSearch = ref([]);

const screenWidth = ref(window.innerWidth);

const fetchData = async () => {
  try {
    if (isValidToken(token)) {
      userData.value = await getUser(token);

      if (userData.value !== null) {
        budget.value = userData.value.budget_current;
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

      // Define the order of impact levels
      const impactOrder = ['Hoogste impact', 'Middelmatige impact', 'Laagste impact'];

      // Sort the renovations based on the impact
      renovations.value.sort((a, b) => {
        const impactA = impactOrder.indexOf(a.impact);
        const impactB = impactOrder.indexOf(b.impact);

        if (impactA < impactB) {
          return -1;
        } else if (impactA > impactB) {
          return 1;
        } else {
          return 0;
        }
      });

      beforeSearch.value = renovations.value;
      renovationsLoaded.value = true;
    } else {
      router.push('/login');
    }
  } catch (error) {
    console.error(error);
    unexpected_error.value = true;
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
  renovationsLoaded.value = false;
  unexpected_error.value = false;
  renovations.value = [];
  fetchData();
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
    renovation.impact === 'Hoogste impact' ? '/highImpact.svg' : (renovation.impact === 'Middelmatige impact' ? '/mediumImpact.svg' : '/lowImpact.svg'),
    renovation.cost === 'high' ? '/highCost.svg' : (renovation.cost === 'medium' ? '/mediumCost.svg' : '/lowCost.svg'),
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
    data.budget,
    convertDate(data.startDate),
    data.amount_total,
    data.amount_done
  ];
};

const getDoneTextArray = async (renovation) => {
  let data = await getUserRenovation(userId.value, renovation._id);
  return [
    data.budget_final,
    convertDate(data.endDate),
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
  beforeSearch.value = filteredRenovations;
};

const handleSearch = (q) => {
  if (q === undefined) {
    // return all renovations, removing the previous search results
    console.log(beforeSearch.value);
    renovations.value = beforeSearch.value;
    console.log(renovations.value);
    return renovations.value;
  } else {
    return renovations.value.filter(renovation => renovation.title.toLowerCase().includes(q.toLowerCase()));
  };
};

const updateSearch = async (searchQuery) => {
  try {
    if (searchQuery === '') {
      renovations.value = handleSearch();
    } else {
      renovations.value = handleSearch(searchQuery);
    }
  } catch (error) {
    console.error(error);
    unexpected_error.value = true;
  }
};
</script>

<template>
  <section class="m-[32px] md:m-[40px]">
    <div class="mb-[32px] md:mb-[40px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px] md:gap-[40px]">
      <Searchbar class="lg:col-span-2" :placeholder="'Zoeken op naam...'" @search="updateSearch" />
      <div v-if="renovationsLoaded">
        <AdvancedFilter class="lg:col-span-1" :renovations="renovations.value" @filtered="handleFilter"
          :userBudget="budget" />
      </div>
    </div>
    <Error_state v-if="unexpected_error" />
    <div v-if="renovationsLoaded">
      <Empty_state :text="empty_text" v-if="renovations.value.length === 0" />
      <router-link v-else v-for="(renovation, i) in renovations.value" :key="i" :to="'/projects/' + renovation._id">
        <Project :name="renovation.title" :desc="renovation.description" :src="getSrcArray(renovation)"
          :activeSrc="getActiveSrcArray(renovation)" :doneSrc="getDoneSrcArray(renovation)" :label="labelArray"
          :activeLabel="activeLabelArray" :doneLabel="doneLabelArray" :text="getTextArray(renovation)"
          :activeText="getActiveTextArray(renovation)" :doneText="getDoneTextArray(renovation)"
          :stateFetcher="getStateFetcher(renovation)" />
      </router-link>
    </div>
    <div v-if="!renovationsLoaded && !unexpected_error" class="pulsing rounded-[5px] h-[196px] mb-[32px]"></div>
    <div v-if="!renovationsLoaded && !unexpected_error" class="pulsing rounded-[5px] h-[196px] mb-[32px]"></div>
    <div v-if="!renovationsLoaded && !unexpected_error" class="pulsing rounded-[5px] h-[196px] mb-[32px]"></div>
  </section>
</template>

<style scoped></style>
