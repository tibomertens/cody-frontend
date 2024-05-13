<script setup>
import Input from "../UI/Input.vue";
import Btn from "../UI/Button-Btn.vue";
import { registerUser } from "../../functions/user";

// Import necessary functions from 'vue' for script setup
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Create refs for email and password
const updatedEmail = ref("");
const updatedPassword = ref("");
const updatedFamilyname = ref("");
const hasError = ref(false);
const error = ref(null);

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

    if(!updatedEmail.value || !updatedPassword.value || !updatedFamilyname.value) {
      hasError.value = true;
      error.value = "Gelieve alle velden in te vullen";
      return;
    }
  let result = await registerUser(updatedEmail.value, updatedPassword.value, updatedFamilyname.value);
  console.log(result);

    if (result.success) {
      // Handle successful login, e.g., show a success message or redirect to another screen
      // Save the JWT token in the local storage
      localStorage.setItem("token", result.data.token);
      // Redirect to the orders page
      router.push("/determinelabelchoice");
    } else {
      // Handle authentication error
      hasError.value = true;
      error.value = "Er liep iets fout bij het registreren";
    }
  
};
</script>

<template>
  <form>
    <Input :label="'Familienaam'" @input-change="updateFamilyname" :error="hasError"></Input>
    <Input :label="'Email'" :type="'email'" @input-change="updateEmail" :error="hasError"></Input>
    <Input :label="'Wachtwoord'" :type="'password'" @input-change="updatePassword" :error="hasError"></Input>
    <div v-if="error" class="text-secondary-red">{{ error }}</div>
    <div class="mt-8 mb-4">
      <Btn :name="'Registreer'" @click="register" :width="'full'" />
    </div>
  </form>
</template>

<style scoped></style>
