<script setup>
import { ref, onMounted} from "vue";

import PromotorCard from "../widgets/Promotor-card.vue";
import PromotorCardPremium from "../widgets/Promotor-card-premium.vue";
import Searchbar from "../UI/Searchbar.vue";
import SearchDropdown from "../UI/Search-dropdown.vue";

import { getAllPromotors, getAllLocations } from "../../functions/promotor";

const promotors = ref([]);
const locations = ref([]);
const pageTitle = ref("");

const selectedLocation = ref(null); // Keep track of the selected location

const handleSelectedLocation = (location) => {
  selectedLocation.value = location; // Update selected location
  filterPromotors(); // Filter promotors based on the selected location
  
  // Update page title based on selected location
  if (location && location !== 'all') {
    pageTitle.value = `${location}`;
  } 
  else {
    pageTitle.value = "";
  }
};


const populateLocations = (data) => {
  locations.value = data.map(location => ({ title: location.name, name: location.name }));
};

onMounted(async () => {
  let fetchedLocations = await getAllLocations();
  populateLocations(fetchedLocations);
  promotors.value = await getAllPromotors();
  filterPromotors();
});

// Computed property to filter promotors based on selected location
const filteredPromotors = ref([]);

const filterPromotors = () => {
  if (!selectedLocation.value || selectedLocation.value === 'all') {
    filteredPromotors.value = promotors.value;
  } else {
    const topPromotors = promotors.value.filter(promotor => promotor.location === selectedLocation.value && promotor.is_top);
    const nonTopPromotors = promotors.value.filter(promotor => promotor.location === selectedLocation.value && !promotor.is_top);
    filteredPromotors.value = [...topPromotors, ...nonTopPromotors];
  }
};

</script>

<template>
  <section class="m-[32px] md:m-[40px]">
    <div class="mb-[32px] md:mb-[40px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px] md:gap-[40px]">
      <Searchbar class="lg:col-span-2 mt-[36px]" />
      <div class=" mt-[36px]">
        <SearchDropdown :items="locations" @itemSelected="handleSelectedLocation"
          :displayLabel="false" :width="'full'" @filtered="handleSelectedLocation" />
      </div>
    </div>
    <h1 class="text-body" :class="{ 'hidden': !pageTitle }"> <span class="text-body font-bold">Geselecteerde filter:</span> {{ pageTitle }}</h1>
    <div>
      <ul>
        <li v-for="promotor in filteredPromotors" :key="promotor.id"
          class="sm:flex sm:flex-wrap lg:justify-between bg-offWhite-light my-[32px] py-[12px] px-[32px] rounded-md">
          <template v-if="!promotor.is_big">
            <PromotorCard :promotor="promotor" />
          </template>
          <template v-else>
            <PromotorCardPremium :promotor="promotor" />
          </template>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped></style>
