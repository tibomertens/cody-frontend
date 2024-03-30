<script setup>
import Project from '../widgets/Project.vue';
import Searchbar from '../UI/Searchbar.vue';
import AdvancedFilter from '../UI/Advanced-filter.vue';

import { ref, reactive, onMounted, onBeforeUnmount, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import { isValidToken, getUser } from '../../functions/user.js';
import { getRenovations, getRecommendedRenovations, getActiveRenovations, getSavedRenovations, getCompletedRenovations } from '../../functions/renovation.js';

const route = useRoute();
const router = useRouter();

const token = localStorage.getItem('token');

let userData = reactive({});
let renovations = reactive([]);

const screenWidth = ref(window.innerWidth);

const fetchData = async () => {
  if (isValidToken(token)) {
    userData.value = await getUser(token);
    const userId = userData.value._id;
    if (route.path === '/projects/recommended') {
      renovations.value = await getRecommendedRenovations(userId);
    } else if (route.path === '/projects/active') {
      renovations.value = await getActiveRenovations(userId);
    } else if (route.path === '/projects/completed') {
      renovations.value = await getCompletedRenovations(userId);
    } else if (route.path === '/projects/saved') {
      renovations.value = await getSavedRenovations(userId);
    } else {
      renovations.value = await getRenovations();
    }
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

const getSrcArray = (renovation) => {
  // Logic for generating srcArray based on renovation data
  return [
    renovation.impact === 'Hoogste impact' ? '/highImpact.svg' : '/lowImpact.svg',
    renovation.cost === 'high' ? '/highCost.svg' : '/lowCost.svg',
    '/budgetBlue.svg'
  ];
};

const getTextArray = (renovation) => {
  // Logic for generating textArray based on renovation data
  return [
    renovation.impact,
    renovation.estimated_cost,
    '€2.000'
  ];
};

const truncateDescription = (description) => {
  const maxLength = screenWidth.value < 768 ? 100 : 200; // Adjust the max length based on screen width
  if (description.length > maxLength) {
    return description.slice(0, maxLength) + '...';
  } else {
    return description;
  }
};
</script>

<template>
  <section class="m-[32px] md:m-[40px]">
    <div class="mb-[32px] md:mb-[40px] grid grid-cols-1 md:grid-cols-3 gap-[32px] md:gap-[40px]">
      <Searchbar class="md:col-span-2"/>
      <AdvancedFilter class="md:col-span-1" />
    </div>
    <div v-for="(renovation, i) in renovations.value" :key="i">
      <Project :name="renovation.title" :desc="truncateDescription(renovation.description)"
        :src="getSrcArray(renovation)" :label="labelArray" :text="getTextArray(renovation)" />
    </div>
  </section>
</template>

<style scoped></style>