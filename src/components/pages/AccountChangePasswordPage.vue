<script setup>
import Input from "../UI/Input.vue";
import Btn from "../UI/Button-Btn.vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { isValidToken, getUser, updateUser } from "../../functions/user";

const router = useRouter();
const token = localStorage.getItem("token");
let oldPassword = ref("");
let newPassword = ref("");
let confirmPassword = ref("");
let hasError = ref(false);
let errorMessage = ref("");

onMounted(async () => {
  if (!isValidToken(token)) {
    router.push("/login");
  }
});

const updateOldPassword = (value) => {
  oldPassword.value = value;
};

const updateNewPassword = (value) => {
  newPassword.value = value;
};

const updateConfirmPassword = (value) => {
  confirmPassword.value = value;
};

const handleClick = async () => {
  // Check if all fields are filled
  if (!oldPassword.value || !newPassword.value || !confirmPassword.value) {
    hasError.value = true;
    errorMessage.value = "Vul alle velden in";
    return;
  }

  // Check if new password and confirm password match
  if (newPassword.value !== confirmPassword.value) {
    hasError.value = true;
    errorMessage.value = "Nieuw wachtwoord en bevestig wachtwoord komen niet overeen.";
    return;
  }

  // Prepare the body for the update request
  let body = {
    old_password: oldPassword.value,
    password: newPassword.value, 
  };

  // Send the update request to the backend
  let result;
  try {
    result = await updateUser(token, body);

  } catch (error) {
    console.error(error);
    hasError.value = true;
    errorMessage.value = "Failed to update password.";
    return;
  }

  // Check the result of the update request
  if (result.status === "success") {
    router.push("/account");
  } else {
    hasError.value = true;
    errorMessage.value = result.message || "Failed to update password.";
  }
};

</script>

<template>
    <div class="flex justify-center my-[10%]">
      <div class="w-[60%] xs:w-[400px]">
        <div class="flex items-center">
          <h2 class="text-title font-bold">Wachtwoord veranderen</h2>
        </div>
        <div class="w-full xs:w-[400px]">
          <Input label="Oud wachtwoord" type="password" @input-change="updateOldPassword" :error="hasError" :value="oldPassword" :forget="true"/>
        </div>
        <div class="w-full xs:w-[400px]">
          <Input label="Nieuw wachtwoord" type="password" @input-change="updateNewPassword" :error="hasError" :value="newPassword" :forget="true"/>
        </div>
        <div class="w-full xs:w-[400px]">
          <Input label="Bevestig wachtwoord" type="password" @input-change="updateConfirmPassword" :error="hasError" :value="confirmPassword" :forget="true"/>
        </div>
        <div v-if="hasError" class="text-secondary-red mt-2">
          {{ errorMessage }}
        </div>
        <Btn class="mt-8" name="Wachtwoord veranderen" @click="handleClick" />
      </div>
    </div>
  </template>
  
  <style scoped></style>
  