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
  <div :class="{ 'w-full': props.width === 'full', 'w-[300px]': props.width === undefined }">
    <label :for="props.label" class="font-normal">{{ props.label }}</label>
    <select @change="selectItem" :id="props.label"
      :class="{ 'w-full': props.width === 'full', 'w-[300px]': props.width === undefined }"
      class="mt-[12px] block px-[32px] h-[48px] border-2 border-primary-dark rounded-[5px] text-primary-dark font-bold text-body focus:outline-none">
      <option value="default" selected disabled>Maak een keuze</option>
      <option v-for="item in props.items" :key="item" class="text-black hover:bg-offWhite-dark">{{ item }}</option>
    </select>
  </div>
</template>

<style scoped></style>
