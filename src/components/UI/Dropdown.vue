<script setup>
import { watch } from 'vue';

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  width: {
    type: [String, Number],
    required: false
  },
  label: {
    type: String,
    required: true
  },
  bold: {
    type: Boolean,
    required: false
  },
  error: {
    type: Boolean,
    required: false
  },
  errorMessage: {
    type: String,
    required: false
  },
  default: {
    type: String,
    required: false,
    default: 'Maak een keuze'
  }
});

const emit = defineEmits(['itemSelected', 'alias']);

const selectItem = (event) => {
  const selectedItem = event.target.value;
  emit('itemSelected', selectedItem); // Emit the selected item
}

const deleteFilter = (event) => {
   // Reset the selected option to the default option
  const dropdown = document.getElementById(props.label);
  dropdown.selectedIndex = 0;
  emit('itemSelected', ''); // Emit the default option 
}

watch(() => props.default, (newValue, oldValue) => {
  props.default = newValue;
});
</script>

<template>
  <!-- dropdown with the items from the array items as options -->
  <div :class="{ 'w-full': props.width === 'full', 'w-full xs:w-[415px]': props.width != 'full' }">
    <div class="flex justify-between">
      <label :for="props.label" :class="{ 'font-bold': props.bold === true, 'font-normal': props.bold !== true }">{{
    props.label }}</label>
      <p class="text-secondary-red underline cursor-pointer text-[0.9rem]" @click="deleteFilter">Verwijder</p>
    </div>
    <select @change="selectItem" :id="props.label"
      :class="{ 'w-full': props.width === 'full', 'w-full xs:w-[415px]': props.width != 'full', 'border-2 border-secondary-red': props.error === true }"
      class="mt-[12px] block px-[24px] h-[48px] border-2 border-primary-dark rounded-[5px] text-primary-dark font-bold text-body focus:outline-none">
      <option value="default" selected disabled>{{ props.default }}</option>
      <option v-for="item in props.items" :key="item" :value="item.name" class="text-black hover:bg-offWhite-dark">{{
    item.title }}</option>
    </select>
    <p v-if="props.error" class="text-secondary-red">{{ props.errorMessage }}</p>
  </div>
</template>

<style scoped></style>
