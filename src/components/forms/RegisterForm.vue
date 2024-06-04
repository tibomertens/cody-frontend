<script setup>
import Input from "../UI/Input.vue";
import Btn from "../UI/Button-Btn.vue";
import Checkbox from "../UI/Checkbox.vue";
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

const checkboxChecked = ref(false); // Add a ref for tracking checkbox state

let loadingState = ref(false);

//function to change value checkbox
const selectedCheckbox = () => {
  checkboxChecked.value = !checkboxChecked.value;
  console.log(checkboxChecked.value);
};

const checkCheckbox = () => {
  console.log(checkboxChecked.value);
  if (checkboxChecked.value === false) {
    // If checkbox is not checked, set error state and return
    hasError.value = true;
    error.value = "Accepteer de voorwaarden om verder te gaan";
    return false;
  }
  // If checkbox is checked, reset error state and return true
  hasError.value = false;
  error.value = null;
  return true;
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
  if (!checkCheckbox()) {
    return;
  }

  loadingState.value = true;
  let result = await registerUser(updatedEmail.value, updatedPassword.value, updatedFamilyname.value);
  loadingState.value = false;

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
    <Input :label="'Wachtwoord'" :type="'password'" @input-change="updatePassword" :error="hasError"
      :forget="true"></Input>
    <Checkbox :label="'Ik ga akkoord met het gebruiken van mijn email om mij motiverende mails te sturen.'"
      @selectedItem="selectedCheckbox" class="text-xs font-medium mt-5" />
    <div v-if="error" class="text-secondary-red">{{ error }}</div>
    <div class="mt-8 mb-4">
      <Btn :name="'Registreer'" @click="register" :width="'full'" :loading="loadingState" />
    </div>
  </form>
</template>

<style scoped></style>
