<script setup>
import { ref, watch, computed } from "vue";

import { useRouter } from "vue-router";

const router = useRouter();

const emit = defineEmits(['input-change']);

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: "text"
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
    default: ""
  },
  dark: {
    type: Boolean,
    default: false
  },
  forget: {
    type: Boolean,
    default: false
  },
  admin: {
    type: Boolean,
    default: false
  }
});

let inputValue = ref(props.value);
let hasError = ref(props.error);

const updateInput = () => {
  emit("input-change", inputValue.value);
};

watch(() => props.error, (newVal) => {
  hasError.value = newVal;
});

watch(() => props.value, (newVal) => {
  inputValue.value = newVal;
});

const inputId = computed(() => `input-${props.label.replace(/\s+/g, '-').toLowerCase()}`);

const navigate = () => {
  if (props.forget) {
    router.push("/forgotpassword");
  }
};
</script>

<template>
  <div class="input-container mt-8">
    <div class="flex justify-between">
      <label :for="inputId" class="text-body font-bold">{{ label }}</label>
      <p @click="navigate" v-if="props.forget" class="underline text-[0.8em] cursor-pointer">Wachtwoord vergeten?</p>
    </div>
    <div class="relative pt-2">
      <input :id="inputId" :type="type"
        :class="{ 'border-2 border-secondary-red': hasError, 'border-2 border-offWhite-light': !hasError, 'border-2 border-offWhite-light': props.type === 'file' && !hasError, 'bg-offWhite-light': props.type === 'file', 'pl-[48px]': props.preFix, 'bg-offWhite-dark': props.dark }"
        class="w-[100%] p-2 pl-[24px] rounded-md border-2 border-offWhite-light focus:border-primary-dark focus:outline-none"
        v-model="inputValue" @input="updateInput" :placeholder="props.placeholder" tabindex="0" />
      <p v-if="props.preFix" class="font-bold absolute inset-y-0 left-0 pl-[24px] pt-[17.5px] pointer-events-none">{{
        props.preFix }}</p>
    </div>
  </div>
</template>

<style scoped></style>
