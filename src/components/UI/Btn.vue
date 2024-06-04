<template>
  <button :class="{ 'w-full': props.width === 'full', 'w-full xs:w-[400px]': props.width !== 'full' }"
    class="h-[48px] cursor-pointer bg-primary-dark rounded-[5px] text-white font-bold text-[1.1rem] md:text-btn text-center flex items-center justify-center hover:bg-[#3390FF] active:bg-[#0056CC] transition duration-200 ease-in-out"
    :disabled="loading" @click="handleClick">
    <p class="relative bottom-[1px] flex gap-2">
      {{ props.name }}
    <div v-if="loading" class="animate-spin w-[26px] h-[26px] relative top-[2px]"><img src="/loading-animation.png"
        alt="loading animation"></div>
    </p>
  </button>
</template>

<script setup>
import { defineProps } from 'vue';

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
    type: Boolean,
    required: false
  },
});
</script>

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
