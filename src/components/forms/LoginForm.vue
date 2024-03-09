<script setup>
import Input from "../UI/Input.vue";
import Btn from "../UI/Btn.vue";

// Import necessary functions from 'vue' for script setup
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Create refs for email and password
const updatedEmail = ref("");
const updatedPassword = ref("");
const hasError = ref(false);
const error = ref(null);

// Event handlers to update email and password
const updateEmail = (value) => {
  updatedEmail.value = value;
};

const updatePassword = (value) => {
  updatedPassword.value = value;
};
const login = async () => {
  console.log("Email:", updatedEmail.value);
  console.log("Password:", updatedPassword.value);
  // Add your login logic here
  let apiEndpoint = "http://localhost:3000/api/v1/users/login";

  try {
    // Make a request to your API to check the credentials
    const response = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: updatedEmail.value,
        password: updatedPassword.value,
      }),
    });
    // Assuming the API returns a JSON object with a 'success' property
    const result = await response.json();

    if (result.status === "success") {
      // Handle successful login, e.g., show a success message or redirect to another screen
      // Save the JWT token in the local storage
      localStorage.setItem("token", result.token);
      console.log("Token:", result.token);
      // Redirect to the orders page
      router.push("/");
    } else {
      // Handle authentication error
      hasError.value = true;
      error.value = "Invalid email or password";
    }
  } catch (e) {
    console.error("Error during login:", e);
    // Handle other errors
    hasError.value = true;
    error.value = "An error occurred during login";
  }
};
</script>

<template>
  <form>
    <Input :label="'Email'" :type="'text'" @input-change="updateEmail" :error="hasError"></Input>
    <Input :label="'Password'" :type="'password'" @input-change="updatePassword" :error="hasError"></Input>
    <div v-if="error" class="text-secondary-red">{{ error }}</div>
    <div class="mt-8 mb-4">
      <Btn :name="'Login'" @click="login" :width="'full'" />
    </div>
    <div class="flex items-center justify-between">
      <div class="flex-grow h-px bg-black m-2"></div>
      <span class="mx-2 text-sm font-bold">Of</span>
      <div class="flex-grow h-px bg-black m-2"></div>
    </div>
    <div class="flex w-full justify-center gap-4 border-2 border-primary-dark rounded-md p-2 mb-4 mt-4">
      <img src="/google-icon.svg" alt="google icon" />
      <a href="#" class="text-body font-bold">Registreer met Google</a>
    </div>
    <div class="flex w-full justify-center gap-4 border-2 border-primary-dark rounded-md p-2 mb-4">
      <img src="/fb-icon.svg" alt="fb icon" />
      <a href="#" class="text-body font-bold">Registreer met Facebook</a>
    </div>
  </form>
</template>

<style scoped></style>
