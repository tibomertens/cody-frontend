<script setup>
import { ref, onMounted } from "vue";

import PromotorCard from "../widgets/Promotor-card.vue";
import PromotorCardPremium from "../widgets/Promotor-card-premium.vue";
import Searchbar from "../UI/Searchbar.vue";
import SearchDropdown from "../UI/Search-dropdown.vue";
import Empty_state from "../widgets/Empty_state.vue";

import { getAllPromotors } from "../../functions/promotor";
import { getAllLocations } from "../../functions/location";
import { getUser, isValidToken, checkEmailConfirmed, checkLabelUser } from "../../functions/user";

import { useRouter } from "vue-router";

const promotors = ref([]);
const locations = ref([]);
const pageTitle = ref("");
const empty = ref(false);

const token = localStorage.getItem("token");
let userData = ref({});
let userId = ref("");

const router = useRouter();

let dataIsLoaded = ref(false);

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
  if (!isValidToken(token)) {
    router.push("/login");
  } else {
    userData.value = await getUser(token);
    if (userData.value === null) {
      router.push("/login");
      return;
    }

    let emailConfirmed = await checkEmailConfirmed(userData.value);
    if (!emailConfirmed) {
      router.push("/login");
      return;
    }

    let hasLabel = await checkLabelUser(userData.value);
    if (!hasLabel) {
      router.push("/determinelabelchoice");
      return;
    }

    userId.value = userData.value._id;
  }

  let fetchedLocations = await getAllLocations();
  populateLocations(fetchedLocations);

  promotors.value = await getAllPromotors();
  filterPromotorsAndSearch();

  if (promotors.value != null) {
    dataIsLoaded.value = true;
  }
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
  if (filteredPromotors.value.length === 0) {
    empty.value = true;
  } else {
    empty.value = false;
  }
};

const deleteFilter = () => {
  searchTerm.value = ''; // Clear the search term
  emit('filtered', ''); // Emit an empty string to reset the filter
};

const search = (query) => {
  q.value = query;
  filterPromotorsAndSearch();
};
</script>

<template>
  <section class="m-[32px] md:m-[40px]">
    <div class="mb-[32px] md:mb-[40px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px] md:gap-[40px]">
      <Searchbar class="lg:col-span-2" :placeholder="'Zoeken op naam...'" @search="search"/>
      <div class="">
        <SearchDropdown :items="locations" @itemSelected="handleSelectedLocation" :display="false" :displayLabel="false"
          :width="'full'" @filtered="handleSelectedLocation" />
      </div>
    </div>
    <div :class="{ 'hidden': !pageTitle }" class="flex gap-[8px]">
      <h1 class="text-body"> <span class="text-body font-bold">Geselecteerde
          filter:</span> {{ pageTitle }}</h1>
      <a href="" class="text-secondary-red font-bold" @click="deleteFilter"> X</a>
    </div>
    <div>
      <div v-if="!empty">
        <ul>
          <li v-if="dataIsLoaded" v-for="promotor in filteredPromotors" :key="promotor.id">
            <div v-if="!promotor.is_big">
              <PromotorCard :promotor="promotor" class="transition-shadow duration-300 hover:shadow-xl" />
            </div>
            <div v-else>
              <PromotorCardPremium :promotor="promotor" />
            </div>
          </li>
          <div v-else>
            <div class="pulsing h-[100px] rounded-[5px] md:mx-[40px] ml-[5%] mb-[32px]"></div>
            <div class="pulsing h-[100px] rounded-[5px] md:mx-[40px] ml-[5%] mb-[32px]"></div>
            <div class="pulsing h-[100px] rounded-[5px] md:mx-[40px] ml-[5%] mb-[32px]"></div>
            <div class="pulsing h-[100px] rounded-[5px] md:mx-[40px] ml-[5%] mb-[32px]"></div>
          </div>
        </ul>
      </div>
      <Empty_state v-else :text="'Geen resultaten gevonden voor jouw filter'" />
    </div>
  </section>
</template>

<style scoped></style>
