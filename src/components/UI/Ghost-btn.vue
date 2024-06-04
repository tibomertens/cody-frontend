<script setup>
import { defineProps, ref, watch } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  width: {
    type: [String, Number],
    required: false
  },
  loading: {
    type: String,
    required: true
  },
});
</script>

<template>
  <a :class="{ 'w-full': props.width === 'full', 'w-full xs:w-[400px]': props.width !== 'full' }" :disabled="loading"
    class="h-[48px] cursor-pointer bg-offWhite-light rounded-[5px] text-primary-dark border-2 border-primary-dark font-bold text-[1.1rem] md:text-btn text-center flex items-center justify-center hover:bg-[#E0E0E0] active:bg-[#CCCCCC] transition duration-200 ease-in-out">
    <p class="relative bottom-[1px] flex gap-2">
      {{ props.name }}
      <div v-if="loading" class="animate-spin w-[26px] h-[26px] relative top-[2px]"><img src="/loading-animation-blue.png"
          alt="loading animation"></div>
    </p>
  </a>
</template>

<style scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
  scale: 0.7;
}
</style>