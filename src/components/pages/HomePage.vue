<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { isValidToken, getUser } from "../../functions/user.js";

const router = useRouter();

const token = localStorage.getItem("token");
let userData = ref({});

onMounted( async () => {
  if (isValidToken(token)) {
    userData = await getUser(token);
    if (userData.value !== null) {
      
    } else {
      router.push('/login');
    }
  } else {
    router.push("/login");
  }
});
</script>

<template>
    
</template>

<style scoped></style>
