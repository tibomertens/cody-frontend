<script setup>
import { ref, watch, onMounted } from "vue";

const emit = defineEmits(['input-change']);
const props= defineProps({
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  error: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: ""
  },
  preFix: {
    type: String,
    default: ""
  },
  value: {
    type: String,
    default: false
  },
  dark: {
    type: Boolean,
    default: false
  },
  forget: {
    type: Boolean,
    default: false
  }
});


let inputValue = ref("");
let hasError = ref(props.error);

const updateInput = () => {
  emit("input-change", inputValue.value);
};

watch(
  () => props.error,
  (newVal) => {
    hasError.value = newVal;
  }
);

onMounted(() => {
  if (props.value !== false) {
    inputValue.value = props.value;
  }
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
    <div class="flex w-[100%] justify-between">
      <label class="text-body font-bold pb-2">{{ label }}</label>
      <a href="#" class="text-xs underline"
        :class="{ 'hidden': props.type !== 'password' || props.forget === true }">Wachtwoord vergeten?</a>
    </div>
    <div class="relative">
      <input :type="type"
        :class="{ 'border-2 border-secondary-red': hasError, 'border-2 border-offWhite-light': !hasError, 'pl-[48px]': props.preFix, 'bg-offWhite-dark': props.dark === true }"
        class="w-[100%] p-2 rounded-md focus:border-primary-dark focus:outline-none pl-[24px]" v-model="inputValue"
        @input="updateInput" :placeholder="props.placeholder" />
      <p v-if="props.preFix" class="font-bold absolute inset-y-0 left-0 pl-[24px] pt-[9.5px] pointer-events-none">{{
        props.preFix }}</p>
    </div>
  </div>
</template>

<style scoped></style>
