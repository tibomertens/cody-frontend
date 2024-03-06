<script setup>
defineProps(["label","type"]);
</script>

<template>
  <div class="input-container mt-8">
    <div class="flex w-[100%] justify-between">
        <label class="text-body font-bold pb-2">{{ label }}</label>
        <a href="#" class="text-xs underline" :class="{'block': type === 'password', 'hidden': type !== 'password'}">Wachtwoord vergeten?</a>
    </div>
    <input :type="type" class="w-[100%] p-2 rounded-md border-2 focus:border-primary-dark focus:outline-none  "/>
  </div>
</template>

<style scoped>
</style>
