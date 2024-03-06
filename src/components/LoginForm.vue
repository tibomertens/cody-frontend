<script setup>
import Input from "../components/Input.vue";

// Import necessary functions from 'vue' for script setup
import { ref } from 'vue';

// Create refs for email and password
const updatedEmail = ref('');
const updatedPassword = ref('');

// Event handlers to update email and password
const updateEmail = (value) => {
  updatedEmail.value = value;
};

const updatePassword = (value) => {
  updatedPassword.value = value;
};
const login = () => {
    console.log('Email:', updatedEmail.value);
    console.log('Password:', updatedPassword.value);
    // Add your login logic here
  };
</script>

<template>
  <form>
    <Input :label="'Email'" :type="'text'" @input-change="updateEmail"></Input>
    <Input :label="'Password'" :type="'password'" @input-change="updatePassword"></Input>
    <a href="#" class="text-body flex w-full justify-center text-offWhite-light bg-primary-dark rounded-md p-2 mt-8 mb-4 font-bold" @click="login" >Login</a>
    <div class="flex items-center justify-between">
      <div class="flex-grow h-px bg-black m-2"></div>
      <span class="mx-2 text-sm font-bold">Of</span>
      <div class="flex-grow h-px bg-black m-2"></div>
    </div>
    <div class="flex w-full justify-center gap-4 border-2 border-primary-dark rounded-md p-2 mb-4 mt-4">
        <img src="/google-icon.svg" alt="google icon">
        <a href="#" class="text-body font-bold">Registreer met Google</a>
    </div>
    <div class="flex w-full justify-center gap-4 border-2 border-primary-dark rounded-md p-2 mb-4">
        <img src="/fb-icon.svg" alt="fb icon">
        <a href="#" class="text-body font-bold">Registreer met Facebook</a>
    </div>
  </form>
</template>

<style scoped></style>
