<script setup>
import Project from '../widgets/Project.vue';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import { isValidToken, getUser } from '../../functions/user.js';
import { getRenovations } from '../../functions/renovation.js';

const router = useRouter();

const token = localStorage.getItem('token');
let userData = ref({});
let renovations = ref({});
const screenWidth = ref(window.innerWidth);

onMounted(async () => {
  if (isValidToken(token)) {
    const userResponse = await getUser(token);
    const renovationResponse = await getRenovations();
    renovations = renovationResponse.data;
    userData = userResponse.data;
    console.log(renovations);
  } else {
    router.push('/login');
  }

  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});

const handleResize = () => {
  screenWidth.value = window.innerWidth;
};

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
  <section class="m-[40px]">
    <div v-for="(renovation, i) in renovations" :key="i">
      <!-- <p></p> -->
      <Project :name="renovation.title" :desc="truncateDescription(renovation.description)" :src="getSrcArray(renovation)" :label="labelArray"
        :text="getTextArray(renovation)" />
    </div>
  </section>
</template>

<style scoped></style>