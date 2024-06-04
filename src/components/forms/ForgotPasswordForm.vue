<script setup>
import Input from "../UI/Input.vue";
import Btn from "../UI/Button-Btn.vue";
import { sendpasswordresetmail } from "../../functions/user";

import { ref } from "vue";

// Create refs for email and password
const updatedEmail = ref("");
const hasError = ref(false);
const error = ref(null);
const success = ref(null);

let loadingState = ref(false);

// Event handlers to update email and password
const updateEmail = (value) => {
  updatedEmail.value = value;
};

const sendMail = async () => {
  if (!updatedEmail.value) {
    hasError.value = true;
    error.value = "Gelieve alle velden in te vullen";
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(updatedEmail.value)) {
    error.value = "Ongeldig email address";
    return;
  }

  loadingState.value = true;

  let result = await sendpasswordresetmail(
    updatedEmail.value,
  );

  loadingState.value = false;

  if (result.success) {
    success.value = "Er is een email verstuurd met instructies om het wachtwoord te veranderen";
  } else {
    // Handle authentication error
    hasError.value = true;
    error.value = "Gebruiker is niet gevonden";
  }

};
</script>

<template>
  <form>
    <Input :label="'Email'" :type="'email'" @input-change="updateEmail" :error="hasError"></Input>
    <div v-if="error" class="text-secondary-red">{{ error }}</div>
    <div class="mt-8 mb-4">
      <Btn :name="'Wachtwoord veranderen'" @click="sendMail" :width="'full'" :loading="loadingState" />
    </div>
    <div v-if="success" class="">
      <p>{{ success }}</p>
      <!-- open gmail -->
      <a href="https://mail.google.com/mail/u/0/#inbox" target="_blank" class="text-primary-dark underline">Open hier je mail</a>
    </div>
  </form>
</template>

<style scoped></style>
