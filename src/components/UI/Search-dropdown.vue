<template>
    <div class="relative cursor-pointer">
      <div class="absolute right-0 bottom-[60px]">
            <p class="text-secondary-red underline cursor-pointer text-[0.9rem] " @click="deleteFilter">Verwijder</p>
        </div>
        <div class="w-full h-[48px] bg-offWhite-light rounded-[5px] border-2 border-primary-dark flex items-center justify-between"
            @click="toggleDropdown" :class="{ 'rounded-b-[0] border-b-0': isDropdownOpen }">
            <p class="text-primary-dark font-bold text-btn ml-[24px] relative bottom-[1px]">Gemeente</p>
            <img :class="{ 'rotate-180': isDropdownOpen }" src="/dropdownIcon.svg" alt="dropdown icon"
                class="mr-[24px]">
        </div>
        <div v-if="isDropdownOpen"
            class="absolute top-[48px] left-0 w-full bg-offWhite-light z-50 border-2 border-t-0 border-primary-dark rounded-b-[5px]">
            <div class="pt-0 flex flex-col gap-[16px] max-h-[250px] overflow-y-auto">
                <!-- Input component -->
                <input :type="inputType" v-model="searchTerm" placeholder="Zoeken..." @input="applyFilters" :class="{ 'dark': dark }" class=" border border-gray-300 rounded-md p-2 ml-[24px] mr-[24px] focus:outline-none focus:border-primary-dark mt-1" />
                <ul>
                    <li class="p-[24px] hover:bg-offWhite-dark py-2" v-for="location in filteredOptions" :key="location" @click="handleSelectedLocation">{{ location }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, defineEmits, onMounted } from 'vue';
import { getAllPromotors } from '../../functions/promotor';
import { getAllLocations } from '../../functions/location';

const emit = defineEmits(['filtered']);

const isDropdownOpen = ref(false);

const populateLocations = (data) => {
  locations.value = data.map(location => ({ title: location.name, name: location.name }));
  
  locations.value = locations.value.map(location => location.name)
};

onMounted(async () => {
  let fetchedLocations = await getAllLocations();
  populateLocations(fetchedLocations);
  promotors.value = await getAllPromotors();
 
});

const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
};

const searchTerm = ref('');
const promotors = ref([]);
const locations = ref('');

const filteredOptions = computed(() => {
    return locations.value.filter(location =>
        location.toLowerCase().includes(searchTerm.value.toLowerCase())
    );
});

const handleSelectedLocation = (event) => {
    searchTerm.value = event.target.innerText;
    toggleDropdown();
    emit('filtered', event.target.innerText);
};

const deleteFilter = () => {
    searchTerm.value = ''; // Clear the search term
    emit('filtered', ''); // Emit an empty string to reset the filter
};

</script>

<style scoped>

</style>
