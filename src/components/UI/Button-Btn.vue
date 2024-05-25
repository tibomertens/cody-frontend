<script setup>
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
  <button @click.prevent :class="{ 'w-full': props.width === 'full', 'w-full xs:w-[400px]': props.width !== 'full' }"
    class="h-[48px] cursor-pointer bg-primary-dark rounded-[5px] text-white font-bold text-[1.1rem] md:text-btn text-center flex items-center justify-center">
    <p class="relative bottom-[1px]">{{ props.name }}</p>
  </button>
</template>

<style scoped></style>
