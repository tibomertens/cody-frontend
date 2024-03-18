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
    <img src="/vergrootglas.svg" alt="vergrootglas" class="relative top-8 left-[14%] xl:left-[22%]">
  <input type="text" placeholder="Zoeken..." class="text-sm h-[48px] w-[80%] ml-[10%] pl-20 rounded outline-none focus:border-2 focus:border-primary-dark xl:w-[60%] xl:ml-[20%]">
</template>

<style scoped></style>
