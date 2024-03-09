<script setup>
import { ref, onMounted } from "vue";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  //   localStorage.clear();
  checkToken();
});

const token = localStorage.getItem("token");

console.log("Token:", token);

const checkToken = () => {
  if (!token) {
    // Redirect to the login page if the token is invalid
    router.push("/login");
    return;
  } else {
    getUser();
  }
};

const getUser = () => {
  const decoded = jwtDecode(token);
  let userId = decoded.id;
  //get user by id
    let apiEndpoint = `http://localhost:3000/api/v1/users/${userId}`;
    fetch(apiEndpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("User:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
};
</script>

<template>
    
</template>

<style scoped></style>
