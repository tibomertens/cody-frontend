<script setup>
import { defineProps, defineEmits } from 'vue';

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
  }
});

const emit = defineEmits(['itemSelected']);

const selectItem = (event) => {
  const selectedItem = event.target.value;
  emit('itemSelected', selectedItem); // Emit the selected item
}
</script>

<template>
  <!-- dropdown with the items from the array items as options -->
  <div :class="{ 'w-full': props.width === 'full', 'w-full xs:w-[415px]': props.width != 'full' }">
    <label :for="props.label" :class="{ 'font-bold': props.bold === true, 'font-normal': props.bold !== true }">{{ props.label }}</label>
    <select @change="selectItem" :id="props.label"
      :class="{ 'w-full': props.width === 'full', 'w-full xs:w-[415px]': props.width != 'full', 'border-2 border-secondary-red': props.error === true }"
      class="mt-[12px] block px-[24px] h-[48px] border-2 border-primary-dark rounded-[5px] text-primary-dark font-bold text-body focus:outline-none">
      <option value="default" selected disabled>Maak een keuze</option>
      <option v-for="item in props.items" :key="item" :value="item.name" class="text-black hover:bg-offWhite-dark">{{ item.title }}</option>
    </select>
    <p v-if="props.error" class="text-secondary-red">{{ props.errorMessage }}</p>
  </div>
</template>

<style scoped></style>
