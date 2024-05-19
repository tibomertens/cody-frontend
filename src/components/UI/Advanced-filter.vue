<template>
    <div class="adv-filter relative z-1">
        <div class="w-full h-[48px] bg-offWhite-light rounded-[5px] border-2 border-primary-dark flex items-center justify-between"
            @click="toggleDropdown" :class="{ 'rounded-b-[0] border-b-0': isDropdownOpen }">
            <p class="adv-filter-text text-primary-dark font-bold text-btn ml-[24px] relative bottom-[1px] z-1">Filters
            </p>
            <img :class="{ 'rotate-180': isDropdownOpen }" src="/dropdownIcon.svg" alt="dropdown icon"
                class="mr-[24px]">
        </div>
        <div v-if="isDropdownOpen"
            class="absolute top-[48px] left-0 w-full bg-offWhite-light z-50 border-2 border-t-0 border-primary-dark rounded-b-[5px]">
            <div class="p-[24px] pt-0 flex flex-col gap-[16px]">
                <Input :label="'Budget:'" :placeholder="props.userBudget" :pre-fix="'€'" class="mt-1"
                    @input-change="updateBudget" :value="activeBudgetFilter" :dark="true" />
                <Dropdown :width="'full'" :label="'Meerwaarde voor label:'" :bold="true" :items="addedValueArray"
                    :default="activeAddedValueFilter" @item-selected="handleAddedValue" />
                <Dropdown :width="'full'" :label="'Type renovatie:'" :bold="true" :items="typeArray"
                    :default="activeTypeFilterToShow" @item-selected="handleType" />
                <Btn :name="'Filters toepassen'" :width="'full'" class="mt-[12px] text-[1rem]" @click="applyFilters" />
                <div class="flex justify-center">
                    <p class="text-secondary-red underline text-[0.9em] cursor-pointer" @click="deleteFilters">Wis alle
                        filters</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import Input from '../UI/Input.vue';
import Dropdown from '../UI/Dropdown.vue';
import Btn from '../UI/Btn.vue';

const props = defineProps({
    renovations: Array,
    userBudget: String,
});

const emit = defineEmits(['filtered']);

let addedValue = ref('');
let type = ref('');
let budget = ref('');
let originalRenovations = props.renovations;
let filteredRenovations = ref([]);
let activeAddedValueFilter = ref('Maak een keuze');
let activeTypeFilterToShow = ref('Maak een keuze');
let activeBudgetFilter = ref(false);
let activeTypeFilter = ref('Maak een keuze');

const handleAddedValue = (selectedItem) => {
    addedValue.value = selectedItem;
    console.log(selectedItem)
    if (selectedItem === 'Hoogste impact') {
        activeAddedValueFilter.value = 'Hoog';
    } else if (selectedItem === 'Laagste impact') {
        activeAddedValueFilter.value = 'Laag';
    } else {
        activeAddedValueFilter.value = 'Maak een keuze';
    }
}

const handleType = (selectedItem) => {
    type.value = selectedItem;

    if (selectedItem === 'windows') {
        activeTypeFilter.value = 'Vensters';
        activeTypeFilterToShow.value = 'Vensters';
    } else if (selectedItem === 'isolation') {
        activeTypeFilter.value = 'Isolation';
        activeTypeFilterToShow.value = 'Isolatie';
    } else if (selectedItem === 'heating') {
        activeTypeFilter.value = 'Verwarming';
        activeTypeFilterToShow.value = 'Verwarming';
    } else if (selectedItem === 'ventilation') {
        activeTypeFilter.value = 'Ventilation';
        activeTypeFilterToShow.value = 'Ventilatie';
    } else if (selectedItem === 'sun-energy') {
        activeTypeFilter.value = 'Zonne-energie';
        activeTypeFilterToShow.value = 'Zonne-energie';
    } else if (selectedItem === 'water') {
        activeTypeFilter.value = 'Sanitair hot water';
        activeTypeFilterToShow.value = 'Water';
    } else {
        activeTypeFilter.value = 'Maak een keuze';
        activeTypeFilterToShow.value = 'Maak een keuze';
    }
}

const updateBudget = (value) => {
    budget.value = value;
    activeBudgetFilter.value = value;
};

const applyFilters = () => {
    filteredRenovations.value = [...originalRenovations]; // Reset filtered array

    // Apply budget filter
    if (budget.value) {
        // activeBudgetFilter.value = budget.value;
        const budgetValue = parseFloat(budget.value);
        filteredRenovations.value = filteredRenovations.value.filter(
            renovation => renovation.highest_cost <= budgetValue
        );
    } else if (budget.value === '') {
        activeBudgetFilter.value = '';
    }

    // Apply type filter
    if (activeTypeFilter.value) {
        // if activetypefilter is 'Maak een keuze', then filter on all types
        if (activeTypeFilter.value === 'Maak een keuze') {
            filteredRenovations.value = filteredRenovations.value.filter(
                renovation => renovation.type === 'Vensters' ||
                    renovation.type === 'Isolation' ||
                    renovation.type === 'Verwarming' ||
                    renovation.type === 'Ventilation' ||
                    renovation.type === 'Zonne-energie' ||
                    renovation.type === 'Sanitair hot water'
            );
        } else {
            filteredRenovations.value = filteredRenovations.value.filter(
                renovation => renovation.type === activeTypeFilter.value
            );
        }
    }

    // Sort filteredRenovations based on addedValue.value
    if (addedValue.value) {
        filteredRenovations.value.sort((a, b) => {
            const impactOrder = {
                'Hoogste impact': 1,
                'Middelmatige impact': 2,
                'Laagste impact': 3
            };

            if (addedValue.value === 'Hoogste impact') {
                return impactOrder[a.impact] - impactOrder[b.impact];
            } else if (addedValue.value === 'Laagste impact') {
                return impactOrder[b.impact] - impactOrder[a.impact];
            }
        });
    }

    emit('filtered', filteredRenovations.value);

    toggleDropdown();
};

const deleteFilters = () => {
    addedValue.value = '';
    type.value = '';
    budget.value = '';
    activeAddedValueFilter.value = 'Maak een keuze';
    activeTypeFilter.value = 'Maak een keuze';
    activeBudgetFilter.value = false;
    filteredRenovations.value = [...originalRenovations.value];
    emit('filtered', filteredRenovations.value);
};

const addedValueArray = [
    { title: 'Hoog', name: 'Hoogste impact' },
    { title: 'Laag', name: 'Laagste impact' },
];

const typeArray = [
    { title: 'Isolatie', name: 'isolation' },
    { title: 'Vensters', name: 'windows' },
    { title: 'Verwarming', name: 'heating' },
    { title: 'Ventilatie', name: 'ventilation' },
    { title: 'Zonne-energie', name: 'sun-energy' },
    { title: 'Water', name: 'water' },
];

const isDropdownOpen = ref(false);

const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
};

// watch to see if the route changes, if so update the originalRenovations, empty the filtered renovations  and reset the filters
watch(() => props.renovations, (newValue) => {
    originalRenovations.value = newValue;
    // addedValue.value = '';
    // type.value = '';
    // budget.value = '';
    // activeAddedValueFilter.value = 'Maak een keuze';
    // activeTypeFilter.value = 'Maak een keuze';
    // activeBudgetFilter.value = false;
});
</script>

<style scoped></style>