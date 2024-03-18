<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  title: String,
  paragraph: String
});
</script>

<template>
  <div class="flex justify-center">
    <div class="w-[80%] bg-offWhite-light rounded p-[32px] mb-[32px] xl:w-[60%]">
      <h3 class="text-[1.2rem] font-bold pb-[8px]">{{ props.title }}</h3>
      <p class="text-body">{{ props.paragraph }}</p>
    </div>
  </div>
</template>

<style scoped></style>
