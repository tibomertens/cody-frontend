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
  <div class="relative">
    <input type="text" placeholder="Zoeken..."
      class="text-sm h-[48px] w-full pl-[64px] rounded-[5px] outline-none focus:border-2 focus:border-primary-dark">
    <img src="/vergrootglas.svg" alt="search icon" class="absolute inset-y-0 left-0 pl-[24px] pt-[16px] scale-[0.9] pointer-events-none">
  </div>
</template>

<style scoped></style>
