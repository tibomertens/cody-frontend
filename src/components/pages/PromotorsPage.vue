<script setup>
import { ref, onMounted } from "vue";

import PromotorCard from "../widgets/Promotor-card.vue";
import PromotorCardPremium from "../widgets/Promotor-card-premium.vue";
import Searchbar from "../UI/Searchbar.vue";
import SearchDropdown from "../UI/Search-dropdown.vue";
import Empty_state from "../widgets/Empty_state.vue";

import { getAllPromotors, getAllLocations } from "../../functions/promotor";

const promotors = ref([]);
const locations = ref([]);
const pageTitle = ref("");

const selectedLocation = ref(null); // Keep track of the selected location

const handleSelectedLocation = (location) => {
  selectedLocation.value = location; // Update selected location
  filterPromotorsAndSearch(); // Filter promotors based on the selected location

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
  filterPromotorsAndSearch();
});

// Computed property to filter promotors based on selected location
const filteredPromotors = ref([]);

let q = ref('');

const filterPromotorsAndSearch = () => {
  if (q.value !== '') {
    const query = q.value;
    filteredPromotors.value = promotors.value.filter(promotor => {
      // Check if the promotor's name matches the search query
      const nameMatch = promotor.name.toLowerCase().includes(query.toLowerCase());
      // Check if the promotor is in the selected location or if no location is selected
      const locationMatch = !selectedLocation.value || selectedLocation.value === 'all' || promotor.location === selectedLocation.value;
      q.value = query;
      return nameMatch && locationMatch;
    });
  } else {
    if (!selectedLocation.value || selectedLocation.value === 'all') {
      filteredPromotors.value = promotors.value;
    } else {
      const topPromotors = promotors.value.filter(promotor => promotor.location === selectedLocation.value && promotor.is_top);
      const nonTopPromotors = promotors.value.filter(promotor => promotor.location === selectedLocation.value && !promotor.is_top);
      filteredPromotors.value = [...topPromotors, ...nonTopPromotors];
    }
  }
};

const search = (query) => {
  q.value = query;
  filterPromotorsAndSearch();
};

</script>

<template>
  <section class="m-[32px] md:m-[40px]">
    <div class="mb-[32px] md:mb-[40px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px] md:gap-[40px]">
      <Searchbar class="lg:col-span-2 mt-[36px]" :placeholder="'Zoeken op naam...'" @search="search" />
      <div class=" mt-[36px]">
        <SearchDropdown :items="locations" @itemSelected="handleSelectedLocation" :displayLabel="false" :width="'full'"
          @filtered="handleSelectedLocation" />
      </div>
    </div>
    <h1 class="text-body" :class="{ 'hidden': !pageTitle }"> <span class="text-body font-bold">Geselecteerde
        filter:</span> {{ pageTitle }}</h1>
    <div v-if="filteredPromotors">
      <div v-if="filteredPromotors.length !== 0">
        <ul>
          <li v-for="promotor in filteredPromotors" :key="promotor.id">
            <template v-if="!promotor.is_big">
              <PromotorCard :promotor="promotor" class="transition-shadow duration-300 hover:shadow-lg" />
            </template>
            <template v-else>
              <PromotorCardPremium :promotor="promotor" />
            </template>
          </li>
        </ul>
      </div>
      <Empty_state v-else :text="'Geen resultaten gevonden voor jouw filter'" />
    </div>
  </section>
</template>

<style scoped></style>
