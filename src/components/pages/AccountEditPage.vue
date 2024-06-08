<script setup>
import Input from "../UI/Input.vue";
import Btn from "../UI/Button-Btn.vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { isValidToken } from "../../functions/user";
import { getUser, updateUser } from "../../functions/user";

const router = useRouter();
const token = localStorage.getItem("token");
let data = ref({});
let familyName = ref("");
let email = ref("");
let hasError = ref(false);
let errorMessage = ref("");

onMounted(async () => {
  if (isValidToken(token)) {
    await getData();
  } else {
    router.push("/login");
  }
});

const getData = async () => {
  let result = await getUser(token);
  if (result) {
    data.value = result;
    familyName.value = data.value.username;
    email.value = data.value.email;
  }
};

const updateEmail = (value) => {
  email.value = value;
};

const updateFamilyName = (value) => {
  familyName.value = value;
};

const isValidEmail = (email) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

const handleClick = async () => {
  const username = familyName.value;
  const userEmail = email.value;

  // Check if username and email are not empty
  if (!username || !userEmail) {
    hasError.value = true;
    errorMessage.value = "Vul alle velden in";
    return;
  }

  // Check if email is valid
  if (!isValidEmail(userEmail)) {
    hasError.value = true;
    errorMessage.value = "Vul een correct emailadres in.";
    return;
  }

  let body = {
    username: familyName.value,
    email: email.value
  };

  let result;
  try {
    result = await updateUser(token, body);

    if (result) {
      if (result.emailUpdated) {
        router.push("/login");
      } else {
        router.push("/account");
      }
    }
  } catch (error) {
    console.error(error);
    hasError.value = true;
    errorMessage.value = "Failed to update user data.";
    return;
  }
};
</script>

<template>
  <div class="flex justify-center my-[10%]">
    <div class="w-[60%] xs:w-[400px]">
      <div class="flex items-center">
        <h2 class="text-title font-bold">Mijn gegevens</h2>
      </div>
      <div class="w-full xs:w-[400px]">
        <Input label="Familienaam" @input-change="updateFamilyName" :error="hasError" :value="familyName" />
      </div>
      <div class="w-full xs:w-[400px]">
        <Input label="E-mail" @input-change="updateEmail" :error="hasError" :value="email" />
      </div>
      <div v-if="hasError" class="text-secondary-red mt-2">
        {{ errorMessage }}
      </div>
      <Btn class="mt-8" name="Gegevens opslaan" @click="handleClick" />
    </div>
  </div>
</template>

<style scoped></style>
