<script setup>
import { ref } from 'vue'

const props = defineProps({
  placeholder: {
    type: String,
    default: 'Zoeken...'
  }
});

const emit = defineEmits(['search'])

const q = ref('');

const search = () => {
  emit('search', q.value)
}
</script>

<template>
  <div class="searchbar relative">
    <input type="text" :placeholder="props.placeholder" aria-label="Search" v-model="q" @input="search"
      class="text-sm h-[48px] w-full pl-[64px] rounded-[5px] outline-none focus:border-2 focus:border-primary-dark">
    <img src="/vergrootglas.svg" alt="search icon"
      class="searchbar-icon absolute inset-y-0 left-0 pl-[24px] pt-[16px] scale-[0.9] pointer-events-none">
  </div>
</template>

<style scoped></style>
