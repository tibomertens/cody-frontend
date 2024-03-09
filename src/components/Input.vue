<script setup>
import { ref } from 'vue';

defineProps(["label","type"]);
let InputValue = ref('');
//define the emit function
const emit = defineEmits(['input-change']);

const updateInput = () => {
    emit('input-change', InputValue.value);
  };

</script>

<template>
  <div class="input-container mt-8">
    <div class="flex w-[100%] justify-between">
        <label class="text-body font-bold pb-2">{{ label }}</label>
        <a href="#" class="text-xs underline" :class="{'block': type === 'password', 'hidden': type !== 'password'}">Wachtwoord vergeten?</a>
    </div>
    <input :type="type" class="w-[100%] p-2 rounded-md border-2 focus:border-primary-dark focus:outline-none" v-model='InputValue' @input="updateInput"/>
  </div>
</template>

<style scoped>
</style>
