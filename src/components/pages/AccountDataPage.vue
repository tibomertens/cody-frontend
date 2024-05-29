<script setup>
import Input from "../UI/Input.vue";
import Btn from "../UI/Button-Btn.vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { isValidToken } from "../../functions/user";
import { getUser } from "../../functions/user";

const router = useRouter();
const token = localStorage.getItem("token");
let data = ref({});
let familyName = ref("");
let email = ref("");

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
</script>
<template>
    <div class="flex justify-center my-[32px]">
      <div class="w-[60%] xs:w-[400px]">
        <div class="flex items-center">
          <h2 class="text-title font-bold">Mijn gegevens</h2>
          <a href="/settings/accountgegevens/edit">
              <div><img src="/edit_no_fill.svg" alt="edit icon" class="w-[32px] ml-2" /></div>
          </a>
        </div>
        <div class="w-full xs:w-[400px]">
          <h3 class="text-body font-bold pb-2 mt-8">Familienaam</h3>
          <input
            type="text"
            class="cursor-not-allowed focus:border-transparent outline-0 w-[100%] p-2 rounded-md pl-[24px]"
            v-model="familyName"
            readonly
          />
        </div>
        
        <div class="w-full xs:w-[400px]">
          <h3 class="text-body font-bold pb-2 mt-8">E-mail</h3>
          <input
            type="text"
            class="cursor-not-allowed focus:border-transparent outline-0 w-[100%] p-2 rounded-md pl-[24px]"
            v-model="email"
            readonly
          />
        </div>
        <h3 class="text-body font-bold pb-2 mt-8">Jouw EPC-label</h3>
        <Btn name="Herneem de test" />
        <h3 class="text-body font-bold pb-2 mt-8">Wachtwoord</h3>
        <Btn name="Wachtwoord veranderen" />
        <div class="w-full flex justify-center text-secondary-red underline mt-4">
          <a href="#">Verwijder profiel</a>
        </div>
      </div>
    </div>
  </template>
  
  <style scoped></style>
  