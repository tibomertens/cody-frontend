<script setup>
import Input from "../UI/Input.vue";
import Btn from "../UI/Button-Btn.vue";
import Ghostbtn from "../UI/Ghost-btn.vue";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { isValidToken } from "../../functions/user";
import { getUser, deleteUser, checkEmailConfirmed, checkLabelUser } from "../../functions/user";
import Confirm from "../modals/Confirm.vue";

const router = useRouter();
const token = localStorage.getItem("token");
let data = ref({});
let familyName = ref("");
let email = ref("");
let showConfirm = ref(false);

onMounted(async () => {
  if (isValidToken(token)) {
    await getData();
  } else {
    console.log("No token found");
    router.push("/login");
  }
});

const getData = async () => {
  let result = await getUser(token);

  if (result) {
    let emailConfirmed = await checkEmailConfirmed(result);
    if (!emailConfirmed) {
      router.push("/login");
      return;
    }

    let hasLabel = await checkLabelUser(result);
    if (!hasLabel) {
      router.push("/determinelabelchoice");
      return;
    }

    data.value = result;
    familyName.value = data.value.username;
    email.value = data.value.email;
  } else {
    router.push("/login");
  }
};

const handlePasswordClick = () => {
  router.push("/settings/account/changepassword");
};

const handleTestClick = () => {
  router.push("/determinelabelchoice");
};

const handleDeleteClick = () => {
  showConfirm.value = true;
};

const remove = () => {
  deleteUser(token);
  localStorage.removeItem("token");
  router.push("/register");
};

const close = () => {
  showConfirm.value = false;
};

const logout = () => {
  localStorage.removeItem("token");
  router.push("/login");
};
</script>
<template>
  <div class="flex justify-center my-[32px]">
    <div class="xs:w-[400px] w-full mx-[32px]">
      <div class="flex items-center">
        <h2 class="text-subtitle font-bold">Mijn gegevens</h2>
        <a href="/settings/account/edit">
          <div>
            <img src="/edit_no_fill.svg" alt="edit icon" class="w-[32px] ml-2" />
          </div>
        </a>
        <p class="text-secondary-red underline font-bold ml-[12px] sm:hidden" @click="logout">Uitloggen</p>
      </div>
      <div class="w-full xs:w-[400px]">
        <h3 class="text-body font-bold pb-2 mt-8">Familienaam</h3>
        <input type="text"
          class="cursor-not-allowed focus:border-transparent outline-0 w-[100%] p-2 rounded-md pl-[24px]"
          v-model="familyName" readonly />
      </div>

      <div class="w-full xs:w-[400px]">
        <h3 class="text-body font-bold pb-2 mt-8">E-mail</h3>
        <input type="text"
          class="cursor-not-allowed focus:border-transparent outline-0 w-[100%] p-2 rounded-md pl-[24px]"
          v-model="email" readonly />
      </div>
      <h3 class="text-body font-bold pb-2 mt-8">Jouw EPC-label</h3>
      <Btn name="Herneem de test" @click="handleTestClick" />
      <h3 class="text-body font-bold pb-2 mt-8">Wachtwoord</h3>
      <Ghostbtn name="Wachtwoord veranderen" @click="handlePasswordClick" />
      <div class="w-full flex justify-center text-secondary-red underline mt-4">
        <a href="#" @click="handleDeleteClick">Verwijder profiel</a>
      </div>
    </div>
  </div>
  <Confirm :showConfirm="showConfirm" title="Profiel verwijderen"
    desc="Weet je zeker dat je je profiel wilt verwijderen?" @closeConfirm="close" @confirmAction="remove" />
</template>

<style scoped></style>
