<script setup>
import Input from "../components/Input.vue";
</script>

<template>
  <form>
    <Input :label="'Email'" :type="'text'"></Input>
    <Input :label="'Password'" :type="'password'"></Input>
    <a href="#">Login</a>
    <div class="flex items-center justify-between">
      <div class="flex-grow h-px bg-black m-2"></div>
      <span class="mx-2">Of</span>
      <div class="flex-grow h-px bg-black m-2"></div>
    </div>
    <a href="#">Google</a>
    <a href="#">Facebook</a>
  </form>
</template>

<style scoped></style>
