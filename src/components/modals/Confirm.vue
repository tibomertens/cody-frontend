<template>
    <div v-if="showConfirm" class="fixed inset-0 z-50 flex items-center justify-center bg-offBlack bg-opacity-50 w-full" @click="handleOutsideClick">
      <div class="bg-offWhite-light p-7 rounded font-bold text-btn">
        <h2>{{ title }}</h2>
        <div class="mt-10">
          <div class="w-full">
            <Btn @click="closeConfirm" name="Annuleer" />
          </div>
          <div class="w-full mt-4">
            <Btn @click="confirmAction" name="Doorgaan" />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue';
  import Btn from '../UI/Btn.vue';
  
  const props = defineProps({
    showConfirm: Boolean,
    title: String
  });
  
  const emit = defineEmits(['closeConfirm', 'confirmAction']);
  
  const closeConfirm = () => {
    emit('closeConfirm');
  };

  const confirmAction = () => {
    closeConfirm(); // Close the confirm modal
    emit('confirmAction'); // Emit event to indicate confirm action
};

  
  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      closeConfirm();
    }
  };
  </script>