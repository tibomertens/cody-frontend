<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { checkToken, getUser } from "../../functions/user.js";

const router = useRouter();

const token = localStorage.getItem("token");

let loggedIn = ref(false);
let userData = ref({});

onMounted(() => {
  loggedIn = checkToken(token, router);

  if (loggedIn) {
    userData = getUser(token);
    console.log(userData);
  }
});
</script>

<template>
    
</template>

<style scoped></style>
