<script setup>
import Input from "../UI/Input.vue";
import Btn from "../UI/Button-Btn.vue";
import { updatePassword } from "../../functions/user";

// Import necessary functions from 'vue' for script setup
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Create refs for email and password
const updatedEmail = ref("");
const updatedNewPassword = ref("");
const updatedConfirmPassword = ref("");
const hasError = ref(false);
const error = ref(null);

// Event handlers to update email and password
const updateEmail = (value) => {
  updatedEmail.value = value;
};

const updateNewPassword = (value) => {
  updatedNewPassword.value = value;
};

const updateConfirmPassword = (value) => {
  updatedConfirmPassword.value = value;
};

const changePassword = async () => {
  if (
    !updatedEmail.value ||
    !updatedNewPassword.value ||
    !updatedConfirmPassword.value
  ) {
    hasError.value = true;
    error.value = "Gelieve alle velden in te vullen";
    return;
  }
  if (updatedNewPassword.value !== updatedConfirmPassword.value) {
    hasError.value = true;
    error.value = "Wachtwoorden komen niet overeen.";
    return;
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Check if the email matches the pattern
  if (!emailPattern.test(updatedEmail.value)) {
    error.value = "Invalid email address";
    return;
  }
  let result = await updatePassword(
    updatedEmail.value,
    updatedNewPassword.value
  );
  if (result.success) {
    router.push("/login");
  } else {
    // Handle authentication error
    hasError.value = true;
    error.value = "Gebruiker is niet gevonden";
  }
};
</script>

<template>
  <form>
    <Input
      :label="'Email'"
      :type="'email'"
      @input-change="updateEmail"
      :error="hasError"
    ></Input>
    <Input
      :label="'Nieuw wachtwoord'"
      :type="'password'"
      @input-change="updateNewPassword"
      :error="hasError"
      :forget="true"
    ></Input>
    <Input
      :label="'Bevestig wachtwoord'"
      :type="'password'"
      @input-change="updateConfirmPassword"
      :error="hasError"
      :forget="true"
    ></Input>
    <div v-if="error" class="text-secondary-red">{{ error }}</div>
    <div class="mt-8 mb-4">
      <Btn
        :name="'Wachtwoord veranderen'"
        @click="changePassword"
        :width="'full'"
      />
    </div>
  </form>
</template>

<style scoped></style>
