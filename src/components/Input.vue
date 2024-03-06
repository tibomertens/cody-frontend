<script setup>
defineProps(["label","type"]);
</script>

<template>
  <div class="input-container mt-8">
    <div class="flex w-[100%] justify-between">
        <label class="text-body">{{ label }}</label>
        <p class="text-xs underline" :class="{'block': type === 'password', 'hidden': type !== 'password'}">Wachtwoord vergeten?</p>
    </div>
    <input :type="type" class="w-[100%] p-2 rounded-md"/>
  </div>
</template>

<style scoped>
</style>
