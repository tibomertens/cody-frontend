<template>
    <div @click="toggle" class="cursor-pointer bg-offWhite-light rounded-[5px] duration-300">
      <div class="flex justify-between items-center p-[24px] gap-[12px] font-bold">
        <span>{{ question }}</span>
        <img :class="{ 'rotate-180': isOpen }" class="transition-transform duration-300" src="/dropdown.svg" alt="Dropdown Icon" />
      </div>
      <transition name="slide-fade">
        <div v-if="isOpen" class="p-[24px] pt-0">
          {{ answer }}
        </div>
      </transition>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    question: String,
    answer: String
  });
  
  const isOpen = ref(false);
  
  const toggle = () => {
    isOpen.value = !isOpen.value;
  };
  </script>
  
  <style scoped>
  .slide-fade-enter-active, .slide-fade-leave-active {
    transition: all 0.1s ease;
  }
  .slide-fade-enter-from, .slide-fade-leave-to {
    max-height: 0;
    opacity: 0;
    overflow: hidden;
  }
  .slide-fade-enter-to, .slide-fade-leave-from {
    max-height: 200px; /* Adjust this value according to your content */
    opacity: 1;
  }
  </style>
  