<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  width: {
    type: [String, Number],
    required: false
  }
});
</script>

<template>
  <img src="/vergrootglas.svg" alt="search icon" class="relative top-[35px] ml-[32px]">
  <input type="text" placeholder="Zoeken..."
    class="text-sm h-[48px] w-full pl-20 rounded outline-none focus:border-2 focus:border-primary-dark">
</template>

<style scoped></style>
