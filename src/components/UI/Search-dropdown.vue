<template>
    <div class="relative cursor-pointer menu-container">
        <div class="absolute right-0 bottom-[60px]">
            <p class="text-secondary-red underline cursor-pointer text-[0.9rem]"
                :class="{ 'hidden': props.display === false }" @click="deleteFilter">Verwijder</p>
        </div>
        <div class="w-full h-[48px] bg-offWhite-light rounded-[5px] border-2 border-primary-dark flex items-center justify-between"
            @click="toggleDropdown" :class="{ 'rounded-b-[0] border-b-0': isDropdownOpen }">
            <p class="text-primary-dark font-bold text-btn ml-[24px] relative bottom-[1px]">Gemeente</p>
            <img :class="{ 'rotate-180': isDropdownOpen }" src="/dropdownIcon.svg" alt="dropdown icon"
                class="mr-[24px]">
        </div>
        <div v-if="isDropdownOpen"
            class="absolute top-[48px] left-0 w-full bg-offWhite-light z-50 border-2 border-t-0 border-primary-dark rounded-b-[5px] pb-2">
            <div class="pt-0 flex flex-col max-h-[250px]">
                <input :type="inputType" v-model="searchTerm" placeholder="Zoeken..." @input="applyFilters"
                    :class="{ 'dark': dark }"
                    class="border border-gray-300 rounded-md p-2 mx-[24px] mb-[8px] focus:outline-none focus:border-primary-dark mt-1" />
                <ul class="overflow-y-auto">
                    <li class="p-[24px] hover:bg-offWhite-dark py-2" v-for="location in filteredOptions" :key="location"
                        @click="handleSelectedLocation">{{ location }}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, defineEmits, onMounted, onBeforeUnmount } from 'vue';
import { getAllPromotors } from '../../functions/promotor';
import { getAllLocations } from '../../functions/location';

const emit = defineEmits(['filtered']);

const props = defineProps({
    display: {
        type: Boolean,
        required: false,
        default: true
    },
});

const isDropdownOpen = ref(false);

const populateLocations = (data) => {
    locations.value = data.map(location => ({ title: location.name, name: location.name }));

    locations.value = locations.value.map(location => location.name)
};

function handleClickOutside(event) {
    if (isDropdownOpen.value && !event.target.closest('.menu-container')) {
        isDropdownOpen.value = false;
    }
}

onMounted(async () => {
    let fetchedLocations = await getAllLocations();
    populateLocations(fetchedLocations);
    promotors.value = await getAllPromotors();
    document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
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

<style scoped></style>
