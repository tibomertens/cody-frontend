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
  <a href="#" @click.prevent :class="{ 'w-full': props.width === 'full', 'w-[400px]': props.width !== 'full' }"
    class="inline-block h-[48px] bg-primary-dark rounded-[5px] text-white font-bold text-btn text-center">
    <p class="relative top-[7px]">{{ props.name }}</p>
  </a>
</template>

<style scoped></style>
