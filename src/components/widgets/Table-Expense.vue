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
  <div class="overflow-scroll m-10">
    <div>
      <div class="flex p-4 rounded w-[1136px] justify-between pl-[73px]">
        <div class="w-[147px] font-bold">Geschatte kost</div>
        <div class="w-[147px] font-bold">Werkelijke kost</div>
        <div class="w-[315px] font-bold">Renovatie</div>
        <div class="w-[147px] font-bold">Status</div>
        <div class="w-[147px] font-bold">Startdatum</div>
        <div class="w-[147px] font-bold">Einddatum</div>
      </div>
      <div v-for="(renovation, index) in renovations" :key="index">
        <div v-if="renovation.status !== 'Aanbevolen'" class="flex justify-between items-center py-2 rounded w-[1138px]">
          <div class="w-[57px]">
            <div class="w-[24px]"><img src="/edit_no_fill.svg" alt="potlood" /></div>
          </div>
          <div class="flex bg-offWhite-light p-4 rounded w-[1084px] justify-between">
            <div class="w-[147px]">{{ formatFinancialNumber(renovation.budget) }}</div>
            <div class="w-[147px]">{{ renovation.budget_final ? formatFinancialNumber(renovation.budget_final) : '-' }}
            </div>
            <div class="w-[315px] text-primary-dark font-bold">{{ renovation.renovation_title }}</div>
            <div class="w-[147px]"><i class="fa-solid fa-circle " :class="{'text-primary-dark':renovation.status === 'Voltooid' , 'text-secondary-green':renovation.status === 'Actief' , 'text-secondary-yellow':renovation.status === 'Gepauzeerd' }"></i> {{ renovation.status }} </div>
            <div class="w-[147px]">{{ convertDate(renovation.startDate) }}</div>
            <div class="w-[147px]">{{ renovation.endDate ? convertDate(renovation.endDate) : '-' }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<style scoped></style>
