<script setup>
import Input from "../components/Input.vue";
</script>

<template>
  <form>
    <Input :label="'Email'" :type="'text'"></Input>
    <Input :label="'Password'" :type="'password'"></Input>
    <a href="#" class="text-body flex w-full justify-center text-offWhite-light bg-primary-dark rounded-md p-2 mt-8 mb-4">Login</a>
    <div class="flex items-center justify-between">
      <div class="flex-grow h-px bg-black m-2"></div>
      <span class="mx-2 text-sm">Of</span>
      <div class="flex-grow h-px bg-black m-2"></div>
    </div>
    <div class="flex w-full justify-center gap-4 border-2 border-primary-dark rounded-md p-2 mb-4 mt-4">
        <img src="/google-icon.svg" alt="google icon">
        <a href="#" class="text-body">Registreer met Google</a>
    </div>
    <div class="flex w-full justify-center gap-4 border-2 border-primary-dark rounded-md p-2 mb-4">
        <img src="/fb-icon.svg" alt="fb icon">
        <a href="#" class="text-body">Registreer met Facebook</a>
    </div>
  </form>
</template>

<style scoped></style>
