<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true
  },
  isChecked: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['selectedItem']);
</script>

<template>
  <!-- Checkbox -->
  <div class="flex gap-[6px] items-center">
    <input :id="props.label" type="checkbox"
      class="mr-[8px] rounded-[5px] w-[20px] h-[20px] border-2 border-primary-dark outline-none appearance-none bg-offWhite-light checked:bg-primary-dark"
      @change="emit('selectedItem', props.label)" v-model="props.isChecked" />
    <label class="relative bottom-[1px]" :for="props.label">{{ props.label }}</label>
  </div>
</template>

<style scoped></style>
