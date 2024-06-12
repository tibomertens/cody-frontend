<script setup>
import Input from "../UI/Input.vue";
import Btn from "../UI/Button-Btn.vue";
import Checkbox from "../UI/Checkbox.vue";
import { registerUser } from "../../functions/user";

// Import necessary functions from 'vue' for script setup
import { ref } from "vue";

// Create refs for email and password
const updatedEmail = ref("");
const updatedPassword = ref("");
const updatedFamilyname = ref("");
const hasError = ref(false);
const error = ref(null);
const confirm = ref(false);
const confirmMessage = ref("");

const checkboxChecked = ref(false); // Add a ref for tracking checkbox state

//function to change value checkbox
const selectedCheckbox = () => {
  checkboxChecked.value = !checkboxChecked.value;
};

// Event handlers to update email and password
const updateEmail = (value) => {
  updatedEmail.value = value;
};

const updatePassword = (value) => {
  updatedPassword.value = value;
};

const updateFamilyname = (value) => {
  updatedFamilyname.value = value;
};

const register = async () => {
  if (!updatedEmail.value || !updatedPassword.value || !updatedFamilyname.value) {
    hasError.value = true;
    error.value = "Gelieve alle velden in te vullen";
    return;
  }

  let result = await registerUser(updatedEmail.value, updatedPassword.value, updatedFamilyname.value, checkboxChecked.value);

  if (result.success) {
    confirm.value = true;
    confirmMessage.value = result.message;
  } else {
    // Handle authentication error
    hasError.value = true;
    error.value = result.message;
  }
};
</script>

<template>
  <form>
    <div v-if="!confirm">
      <Input :label="'Familienaam'" @input-change="updateFamilyname" :error="hasError"></Input>
      <Input :label="'Email'" :type="'email'" @input-change="updateEmail" :error="hasError"></Input>
      <Input :label="'Wachtwoord'" :type="'password'" @input-change="updatePassword" :error="hasError"
        :forget="true"></Input>
      <Checkbox :label="'Ik ga akkoord met het gebruiken van mijn email om mij motiverende mails te sturen.'"
        @selectedItem="selectedCheckbox" class="text-xs font-medium mt-5" />
      <div v-if="error" class="text-secondary-red">{{ error }}</div>
      <div class="mt-8 mb-4">
        <Btn :name="'Registreer'" @click="register" :width="'full'" />
      </div>
    </div>
    <div v-if="confirm">
      <p>{{ confirmMessage }}</p>
      <a href="https://mail.google.com/mail/u/0/#inbox" target="_blank" class="text-primary-dark underline">Open hier je
        mail</a>
    </div>
  </form>
</template>

<style scoped></style>