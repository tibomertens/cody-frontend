<script setup>
import { ref } from 'vue';

const props = defineProps({
  title: String,
  paragraph: String,
});
const emit = defineEmits(['select'])

const emitSelect = () => {
  emit('select', props.title);
  isSelected.value = !isSelected.value;
}

let isSelected = ref(false);

</script>

<template>
  <div class="flex justify-center" @click="emitSelect">
    <div class="btn w-[80%] bg-offWhite-light rounded p-[32px] mb-[32px] xl:w-[60%] flex" :class="{ 'border-2 border-primary-dark': isSelected }">
      <div>
        <h3 class="text-[1.2rem] font-bold pb-[8px]">{{ props.title }}</h3>
        <p class="text-body">{{ props.paragraph }}</p>
      </div>
      <div class="self-center hidden xl:block">
        <div class="bg-offWhite-dark w-[20px] h-[20px] rounded-full m-[48px]" :class="{ 'bg-primary-dark': isSelected }"></div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
