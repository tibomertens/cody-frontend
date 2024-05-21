<script setup>
import { ref, watch, onMounted } from "vue";

const props = defineProps(["label", "type", "error", "placeholder", "preFix", "value", "dark", "height"]);
const emit = defineEmits(['input-change']);

let inputValue = ref("");
let hasError = ref(props.error);
let heightClass = ref(""); // Add a reference for the height class

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

onMounted(() => {
  if (props.value !== false) {
    inputValue.value = props.value;
  }
  
  // Update height class based on the prop value
  heightClass.value = props.height;
});

watch(
  () => props.value,
  (newVal) => {
    if (newVal !== false) {
      inputValue.value = newVal;
    } else {
      inputValue.value = "";
    }
  }
);
</script>

<template>
  <div class="input-container mt-8">
    <div class="flex w-full justify-between">
      <label class="text-body font-bold pb-2">{{ label }}</label>
      <a href="#" class="text-xs underline"
        :class="{ block: type === 'password', hidden: type !== 'password' }">Wachtwoord vergeten?</a>
    </div>
    <div class="relative">
      <input :type="type"
        :class="[
          hasError ? 'border-2 border-secondary-red' : 'border-2 border-offWhite-light',
          props.preFix ? 'pl-12' : 'pl-6',
          props.dark ? 'bg-offWhite-dark' : '',
          heightClass // Apply height class dynamically
        ]"
        class="w-full p-2 rounded-md focus:border-primary-dark focus:outline-none"
        v-model="inputValue" @input="updateInput" :placeholder="props.placeholder" />
      <p v-if="props.preFix" class="font-bold absolute inset-y-0 left-0 pl-6 pt-2.5 pointer-events-none">{{ props.preFix }}</p>
    </div>
  </div>
</template>


<style scoped></style>
