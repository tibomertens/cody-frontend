<script setup>
defineProps(["label","type"]);
</script>

<template>
  <div class="input-container">
    <label>{{ label }}</label>
    <p :class="{'block': type === 'password', 'hidden': type !== 'password'}">Wachtwoord vergeten?</p>
    <input :type="type"/>
  </div>
</template>

<style scoped>
</style>
