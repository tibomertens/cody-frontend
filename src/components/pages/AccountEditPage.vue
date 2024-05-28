<script setup>
import Input from "../UI/Input.vue";
import Btn from "../UI/Button-Btn.vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { ref, watch } from "vue";
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
  console.log(result);
  if (result) {
    data.value = result;
    familyName.value = data.value.username;
    email.value = data.value.email;
  }
};

// Watch the familyName ref and log its value when it changes
watch(familyName, (newVal) => {
  console.log("familyName changed to:", newVal);
});
</script>
<template>
    <div class="flex justify-center my-[10%]">
      <div class="w-[60%] xs:w-[400px]">
        <div class="flex items-center">
          <h2 class="text-title font-bold">Mijn gegevens</h2>
        </div>
        <div class="w-full xs:w-[400px]">
          <h3 class="text-body font-bold pb-2 mt-8">Familienaam</h3>
          <input
            type="text"
            class="border-2 border-offWhite-light focus:border-primary-dark focus:outline-none w-[100%] p-2 rounded-md pl-[24px]"
            v-model="familyName"
          />
        </div>
        
        <div class="w-full xs:w-[400px]">
          <h3 class="text-body font-bold pb-2 mt-8">E-mail</h3>
          <input
            type="text"
            class="border-2 border-offWhite-light focus:border-primary-dark focus:outline-none w-[100%] p-2 rounded-md pl-[24px]"
            v-model="email"
          />
        </div>
        <Btn class="mt-8" name="Gegevens opslaan" />
      </div>
    </div>
  </template>
  
  <style scoped></style>
  