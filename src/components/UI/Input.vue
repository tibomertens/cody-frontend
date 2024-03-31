<script setup>
import { ref, defineProps, watch, defineEmits } from "vue";

const props = defineProps(["label", "type", "error", "placeholder", "preFix", "value"]);
const emit = defineEmits(['input-change']);

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
      <a href="#" class="text-xs underline"
        :class="{ block: type === 'password', hidden: type !== 'password' }">Wachtwoord vergeten?</a>
    </div>
    <div class="relative">
      <input :type="type"
        :class="{ 'border-2 border-secondary-red': hasError, 'border-2': !hasError, 'pl-[48px]': props.preFix }"
        class="w-[100%] p-2 rounded-md focus:border-primary-dark focus:outline-none pl-[24px]" v-model="inputValue"
        @input="updateInput" :placeholder="props.placeholder" />
      <p v-if="props.preFix" class="font-bold absolute inset-y-0 left-0 pl-[24px] pt-[9.5px] pointer-events-none">{{
        props.preFix }}</p>
    </div>
  </div>
</template>

<style scoped></style>
