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
  <a :class="{ 'w-full': props.width === 'full', 'w-full xs:w-[400px]': props.width !== 'full' }"
    class="h-[48px] cursor-pointer bg-primary-dark rounded-[5px] text-white font-bold text-[1.1rem] md:text-btn text-center flex items-center justify-center">
    <p class="relative bottom-[1px]">{{ props.name }}</p>
  </a>
</template>

<style scoped></style>
