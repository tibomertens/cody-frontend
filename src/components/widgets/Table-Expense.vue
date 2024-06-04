<script setup>
import { ref, onMounted } from 'vue';
import { getAllUserRenovations } from '../../functions/renovation';
import { getUser, isValidToken } from '../../functions/user';
import { useRouter } from 'vue-router';
import { convertDate } from "../../functions/helpers.js";
import { formatFinancialNumber } from "../../functions/helpers.js";

const columns = [
  '', // Add an empty string for the new column
  'Geschatte kost',
  'Werkelijke kost',
  'Renovatie',
  'Status',
  'Startdatum',
  'Einddatum'
];

const renovations = ref([]);
const userId = ref('');
const dataIsLoaded = ref(false);
const token = localStorage.getItem('token');
const router = useRouter();


onMounted(async () => {
  if (!isValidToken(token)) {
    router.push('/login');
  } else {
    try {
      const user = await getUser(token); // Fetch the user here
      userId.value = user._id;
      console.log(user);
      console.log(userId.value);

      renovations.value = await getAllUserRenovations(userId.value);
      dataIsLoaded.value = true;
    } catch (error) {
      console.error('Failed to fetch renovations:', error);
    }
  }
});
</script>

<template>
  <div class="flex justify-center">
    <div class="overflow-scroll m-10">
      <div>
        <div class="grid grid-cols-7 p-4 rounded w-[1136px] justify-between pl-[43px]">
          <div class="font-bold">Geschatte kost</div>
          <div class="font-bold">Werkelijke kost</div>
          <div class="col-span-2 font-bold">Renovatie</div>
          <div class="font-bold">Status</div>
          <div class="font-bold">Startdatum</div>
          <div class="font-bold">Einddatum</div>
        </div>
        <div v-for="(renovation, index) in renovations" :key="index">
          <div v-if="renovation.status !== 'Aanbevolen' && renovation.status !== 'extra'" class="flex justify-between items-center py-2 rounded w-[1118px]">
            <div class="w-[20px]">
              <div ><img src="/edit_no_fill.svg" alt="potlood" /></div>
            </div>
            <div class="grid grid-cols-7 bg-offWhite-light p-4 rounded w-[1084px] justify-between">
              <div class="col-span-1">{{ formatFinancialNumber(renovation.budget) }}</div>
              <div class="col-span-1">{{ renovation.budget_final ? formatFinancialNumber(renovation.budget_final) : '-' }}</div>
              <div class="col-span-2 text-primary-dark font-bold" style="margin-right: 24px;">{{ renovation.renovation_title }}</div>
              <div class="col-span-1"><i class="fa-solid fa-circle " :class="{'text-primary-dark':renovation.status === 'Voltooid' , 'text-secondary-green':renovation.status === 'Actief' , 'text-secondary-yellow':renovation.status === 'Gepauzeerd' }"></i> {{ renovation.status }} </div>
              <div class="col-span-1">{{ convertDate(renovation.startDate) }}</div>
              <div class="col-span-1">{{ renovation.endDate ? convertDate(renovation.endDate) : '-' }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

















<style scoped></style>
