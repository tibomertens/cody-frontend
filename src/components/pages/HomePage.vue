<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { isValidToken, getUser } from "../../functions/user.js";

const router = useRouter();

const token = localStorage.getItem("token");
let userData = ref({});

onMounted(() => {
  if (isValidToken(token)) {
    userData = getUser(token);
    console.log(userData);
  } else {
    router.push("/login");
  }
});
</script>

<template>
    
</template>

<style scoped></style>
