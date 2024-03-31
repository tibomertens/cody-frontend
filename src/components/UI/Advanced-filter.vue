<template>
    <div class="relative">
        <div class="w-full h-[48px] bg-offWhite-light rounded-[5px] border-2 border-primary-dark flex items-center justify-between"
            @click="toggleDropdown" :class="{ 'rounded-b-[0] border-b-0': isDropdownOpen }">
            <p class="text-primary-dark font-bold text-btn ml-[24px] relative bottom-[1px]">Filters</p>
            <img :class="{ 'rotate-180': isDropdownOpen }" src="/public/dropdownIcon.svg" alt="dropdown icon"
                class="mr-[24px]">
        </div>
        <div v-if="isDropdownOpen"
            class="absolute top-[48px] left-0 w-full bg-offWhite-light z-50 border-2 border-t-0 border-primary-dark rounded-b-[5px]">
            <div class="p-[24px] pt-0 flex flex-col gap-[16px]">
                <Input :label="'Budget:'" :placeholder="'5000'" :pre-fix="'€'" class="mt-1"
                    @input-change="updateBudget" />
                <Dropdown :width="'full'" :label="'Meerwaarde voor label:'" :bold="true" :items="addedValueArray"
                    @item-selected="handleAddedValue" />
                <Dropdown :width="'full'" :label="'Type renovatie:'" :bold="true" :items="typeArray"
                    @item-selected="handleType" />
                <Btn :name="'Filters toepassen'" :width="'full'" class="mt-[12px] text-[1rem]" @click="applyFilters" />
                <div class="flex justify-center">
                    <p class="text-secondary-red underline text-[0.9em]">Wis filters</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';
import Input from '../UI/Input.vue';
import Dropdown from '../UI/Dropdown.vue';
import Btn from '../UI/Btn.vue';

const props = defineProps({
  renovations: Array,
});

const emit = defineEmits(['filtered']);

let addedValue = ref('');
let type = ref('');
let budget = ref('');
let originalRenovations = ref(props.renovations);
let filteredRenovations = ref([]);

const handleAddedValue = (selectedItem) => {
  addedValue.value = selectedItem;
}

const handleType = (selectedItem) => {
  type.value = selectedItem;
}

const updateBudget = (value) => {
  budget.value = value;
};

const applyFilters = () => {
  filteredRenovations.value = [...originalRenovations.value]; // Reset filtered array
  console.log(filteredRenovations.value)

  // Apply budget filter
  if (budget.value) {
    const budgetValue = parseFloat(budget.value);
    filteredRenovations.value = filteredRenovations.value.filter(
      renovation => renovation.highest_cost <= budgetValue
    );
  }

  // Apply type filter
  if (type.value) {
    filteredRenovations.value = filteredRenovations.value.filter(
      renovation => renovation.type === type.value
    );
  }

  // Sort filteredRenovations based on addedValue.value
  if (addedValue.value === 'Hoogste impact') {
    filteredRenovations.value.sort((a, b) => {
      if (a.impact === 'Hoogste impact' && b.impact !== 'Hoogste impact') {
        return -1;
      } else if (a.impact !== 'Hoogste impact' && b.impact === 'Hoogste impact') {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (addedValue.value === 'Laagste impact') {
    filteredRenovations.value.sort((a, b) => {
      if (a.impact === 'Laagste impact' && b.impact !== 'Laagste impact') {
        return -1;
      } else if (a.impact !== 'Laagste impact' && b.impact === 'Laagste impact') {
        return 1;
      } else {
        return 0;
      }
    });
  }

  console.log(filteredRenovations.value)
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
</script>

<style scoped></style>