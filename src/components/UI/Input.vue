<script setup>
import { ref, defineProps, watch, defineEmits } from "vue";

const props = defineProps(["label", "type", "error"]);
const { emit } = defineEmits();

let inputValue = ref("");
let hasError = ref(props.error);

const updateInput = () => {
  emit("input-change", inputValue.value);
};

watch(
  () => props.error,
  (newVal) => {
    hasError.value = newVal;
    console.log("Error:", hasError.value);
  }
);
</script>

<template>
  <div class="input-container mt-8">
    <div class="flex w-[100%] justify-between">
      <label class="text-body font-bold pb-2">{{ label }}</label>
      <a
        href="#"
        class="text-xs underline"
        :class="{ block: type === 'password', hidden: type !== 'password' }"
        >Wachtwoord vergeten?</a
      >
    </div>
    <input
      :type="type"
      :class="{ 'border-2 border-secondary-red': hasError, 'border-2': !hasError }"
      class="w-[100%] p-2 rounded-md focus:border-primary-dark focus:outline-none"
      v-model="inputValue"
      @input="updateInput"
    />
  </div>
</template>

<style scoped></style>
