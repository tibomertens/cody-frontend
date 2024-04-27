<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { isValidToken, getUser } from "../../functions/user.js";

import Project from "../widgets/Project.vue";

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

const activeLabelArray = [
  'Budget',
  'Startdatum'
];

const getActiveSrcArray = () => {
  // Logic for generating srcArray based on renovation data
  return [
    '/budgetBlue.svg',
    '/calendar.svg'
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

const getStateFetcher = (renovation) => async () => {
  let data = await getUserRenovation(userId.value, renovation._id);
  return data.status;
};

const getTextArray = (renovation) => {
  // Logic for generating textArray based on renovation data
  return [
    renovation.impact,
  ];
};
</script>

<template>
  <div class="m-[32px] md:m-[40px]">
    <section>LABEL + BUDGET</section>
    <section>KALENDER</section>
    <section v-if="renovationsLoaded">
      <h2 class="text-subtitle font-bold pb-[20px]">Actieve projecten</h2>
      <div v-if="renovationsLoaded">
        <router-link v-for="(renovation, i) in activeRenovations" :key="i" :to="'/projects/' + renovation._id">
          <Project :name="renovation.title" :desc="renovation.description" :activeSrc="getActiveSrcArray(renovation)"
            :activeLabel="activeLabelArray" :activeText="getActiveTextArray(renovation)"
            :stateFetcher="getStateFetcher(renovation)" :text="getTextArray(renovation)" />
        </router-link>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
