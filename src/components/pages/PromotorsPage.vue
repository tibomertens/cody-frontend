<script setup>
import { ref, onMounted } from "vue";
import PromotorCard from "../widgets/Promotor-card.vue";
import PromotorCardPremium from "../widgets/Promotor-card-premium.vue";
import Dropdown from "../UI/Dropdown.vue";

const promotors = ref([]);
const locations = ref([
  { title: "Boortmeerbeek", name: "Boortmeerbeek" },
  { title: "Bertem", name: "Bertem" }
]);

const selectedLocation = ref(null); // Keep track of the selected location

const handleSelectedLocation = (location) => {
  selectedLocation.value = location; // Update selected location

  // Filter the promotors based on the selected location
  filterPromotors();
};

const getAllPromotors = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/v1/promotors");
    promotors.value = (await response.json()).data;
    console.log(promotors.value);
  } catch (error) {
    console.error(error);
  }
};

onMounted( async() => {
  await getAllPromotors();
  filterPromotors();
});

// Computed property to filter promotors based on selected location
const filteredPromotors = ref([]);

const filterPromotors = () => {
  if (!selectedLocation.value) {
    filteredPromotors.value = promotors.value;
  } else {
    const topPromotors = promotors.value.filter(promotor => promotor.location === selectedLocation.value && promotor.is_top);
    const nonTopPromotors = promotors.value.filter(promotor => promotor.location === selectedLocation.value && !promotor.is_top);
    filteredPromotors.value = [...topPromotors, ...nonTopPromotors];
  }
};

</script>

<template>
  <div class="flex justify-end my-[32px] mx-[40px]"> 
    <Dropdown :items="locations" @itemSelected="handleSelectedLocation" />
  </div>
  <div>
    <ul>
      <li v-for="promotor in filteredPromotors" :key="promotor.id" class="sm:flex sm:flex-wrap lg:justify-between bg-offWhite-light my-[32px] mx-[40px] py-[12px] px-[32px] rounded-md">
        <template v-if="!promotor.is_big">
          <PromotorCard :promotor="promotor"/>
        </template>
        <template v-else>
          <PromotorCardPremium :promotor="promotor"/>
        </template>
      </li> 
    </ul>
  </div>
</template>

<style scoped>
</style>
