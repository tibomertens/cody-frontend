<template>
    <div class="relative">
        <div class="w-full h-[48px] bg-offWhite-light rounded-[5px] border-2 border-primary-dark flex items-center justify-between"
            @click="toggleDropdown" :class="{ 'rounded-b-[0] border-b-0': isDropdownOpen }">
            <p class="text-primary-dark font-bold text-btn ml-[24px] relative bottom-[1px]">Filters</p>
            <img :class="{ 'rotate-180': isDropdownOpen }" src="/dropdownIcon.svg" alt="dropdown icon"
                class="mr-[24px]">
        </div>
        <div v-if="isDropdownOpen"
            class="absolute top-[48px] left-0 w-full bg-offWhite-light z-50 border-2 border-t-0 border-primary-dark rounded-b-[5px]">
            <div class="p-[24px] pt-0 flex flex-col gap-[16px]">
                <Dropdown :width="'full'" :label="'Klantenscore'" :bold="true" :items="addedValueArray"
                    :default="activeAddedValueFilter" @item-selected="handleAddedValue" @delete-filter="deleteFilter"/>
                <Dropdown :width="'full'" :label="'Datum'" :bold="true" :items="typeArray"
                    :default="activeTypeFilter" @item-selected="handleType" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Dropdown from '../UI/Dropdown.vue';
import { getReviewsByPromotor } from '../../functions/reviews.js';
import { useRoute } from 'vue-router';
import { defineEmits } from 'vue';

const emits = defineEmits(['filtered']);

const route = useRoute();
const reviews = ref([]);
const promotorId = ref('');

const addedValueArray = [
    { title: 'Hoog naar laag', name: 'Hoogste rating' },
    { title: 'Laag naar hoog', name: 'Laagste rating' },
];

const typeArray = [
    { title: 'Recent naar oud', name: 'Recent naar oud' },
    { title: 'Oud naar recent', name: 'Oud naar recent' },
];

const addedValue = ref(null);
const type = ref(null);
const activeAddedValueFilter = ref('Maak een keuze');
const activeTypeFilter = ref('Maak een keuze');
const isDropdownOpen = ref(false);


const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
};

const handleAddedValue = async (selectedItem) => {
    promotorId.value = route.params.id;
    reviews.value = await getReviewsByPromotor(promotorId.value);
    addedValue.value = selectedItem;
    console.log("Reviews before sorting:", reviews.value); // Add this line
    emits('filtered', reviews.value);
    if (selectedItem === 'Hoogste rating') {
        reviews.value.sort((reviewA, reviewB) => reviewB.rating - reviewA.rating);
        activeAddedValueFilter.value = 'Hoog naar laag';
        emits('filtered', reviews.value);
    } else if (selectedItem === 'Laagste rating') {
        reviews.value.sort((reviewA, reviewB) => reviewA.rating - reviewB.rating);
        activeAddedValueFilter.value = 'Laag naar hoog';
        emits('filtered', reviews.value);
    } else {
        // Reset de sortering
        activeAddedValueFilter.value = 'Maak een keuze';
    }
};



const handleType = async (selectedItem) => {
    promotorId.value = route.params.id;
    reviews.value = await getReviewsByPromotor(promotorId.value);
    type.value = selectedItem;
    console.log("Reviews before sorting:", reviews.value); // Add this line
    emits('filtered', reviews.value);
    if (selectedItem === 'Recent naar oud') {
        reviews.value.sort((reviewA, reviewB) => new Date(reviewB.date) - new Date(reviewA.date));
        activeTypeFilter.value = 'Recent naar oud';
        emits('filtered', reviews.value);
    } else if (selectedItem === 'Oud naar recent') {
        reviews.value.sort((reviewA, reviewB) => new Date(reviewA.date) - new Date(reviewB.date));
        activeTypeFilter.value = 'Oud naar recent';
        emits('filtered', reviews.value);
    } else {
        activeTypeFilter.value = 'Maak een keuze';
    }
};

const deleteFilter = () => {
    activeAddedValueFilter.value = 'Maak een keuze'; // Reset de filter naar de standaardwaarde
    console.log("Active added value filter reset to default:", activeAddedValueFilter.value);
    // Andere logica voor het resetten van de filter, indien nodig
    reviews.value = [];
}


</script>

<style scoped></style>

